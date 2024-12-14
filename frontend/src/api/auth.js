import axiosInstance from "../config/axiosInstance";
// import { useState, useEffect } from "react";

const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/login", { email, password });

    console.log(response.data.data);

    return response.data.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "An error occurred";
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

const logoutUser = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Token not found | warn");
      // throw new Error("Token not found | throw");
      return;
    }

    const response = axiosInstance.post("/logout", { token });

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");

    console.log("Logout Success:" + response.data);
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
  }
};

const forgotPassword = async (email) => {
  try {
    const response = await axiosInstance.post(
      "/forgot-password",
      { email },
      {
        headers: { Authorization: null },
      }
    );
    console.log("auth -> forgotPassword -> response:" + response.data);
    return response.data;
  } catch (error) {
    throw error.response.data || "An error occurred";
  }
};

export { loginUser, registerUser, logoutUser, forgotPassword };

// export default { loginUser, registerUser };
