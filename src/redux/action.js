
export const setUser = (user) => ({
  type: "SET_USER",
  payload: { user },
});

export const setToken = (token) => ({
  type: "SET_TOKEN",
  payload: { token },
});

export const updateUser = (updatedUser) => ({
  type: "UPDATE_USER",
  payload: { updatedUser },
});

// export const resetStore = () => ({
//     type : "RESET_STORE"
// })