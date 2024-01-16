const UserSignUp = {
  username: "required|string",
  email: "required|string",
  password: "required|string",
};

const UserLogin = {
  username: "required|string",
  email: "required|string",
  password: "required|string",
};

const UserPasswordReset = {
  email: "required|string",
  old_password: "required|string",
  new_password: "required|string",
};

module.exports = {
  UserSignUp,
  UserLogin,
  UserPasswordReset,
};
