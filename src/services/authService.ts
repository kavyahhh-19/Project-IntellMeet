import api from "./api";

export const loginUser = async (data: any) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const signupUser = async (data: any) => {
  const response = await api.post("/auth/signup", data);
  return response.data;
};