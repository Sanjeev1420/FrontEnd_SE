import { combineReducers } from "redux";
import userReducer from './reducers/user.jsx';

const appReducer = combineReducers({
    user: userReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET_STORE') {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;
