 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updateUser } from "../redux/reducers/user";
import { http, host } from "../utils/httpServices.js";

export const useSwitchTheme = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const switchedTheme = {
    light: "dark",
    dark: "light",
  };

  return async () => {
    const userData = user.userData;
    try {
      const updatedThemeData = {
        _id: userData._id,
        theme: switchedTheme[userData.theme],
      };
      const res = await http.put(`${host}/user/updateUser`,updatedThemeData, user.token);
      toast.success("Theme Switched!");
      dispatch(updateUser(res.data.user));
    } catch (error) {
      toast.error(error.response.data.message || error.message);
      if (error.response.status === 402) {
        dispatch({ type: "RESET_STORE" });
        navigate("/login", { state: { showModel: true } });
      }
    }
  };
};
