import axiosInstance from "../config/axiosInstance";

const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const registerUser = async (name, phone, email, password, confirmPassword) => {
  try {
    if (password !== confirmPassword) {
      throw new Error("Password and confirm password do not match.");
    }

    console.log(name, phone, email, password, confirmPassword);
    const response = await axiosInstance.post("/register", {
      name,
      phone,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { loginUser, registerUser };

// export default { loginUser, registerUser };
