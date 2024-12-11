import axiosInstance from "../config/axiosInstance";
// import { useState, useEffect } from "react";

const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/login", { email, password });

    // Save to localStorage
    localStorage.setItem("token", response.data.data.token);
    localStorage.setItem("email", JSON.stringify(response.data.data.email));
    localStorage.setItem("name", JSON.stringify(response.data.data.name));
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

export { loginUser, registerUser };

// export default { loginUser, registerUser };
