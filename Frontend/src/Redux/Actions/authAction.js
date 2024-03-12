// authActions.js
export const login = (userData) => {
    return {
      type: 'LOGIN',
      payload: userData,
    };
  };
  