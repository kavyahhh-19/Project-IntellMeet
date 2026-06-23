import api from "./api";

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });

  const { token, user } = res.data;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return user;
};

export const signupUser = async (data: any) => {
  const res = await api.post("/auth/signup", data);

  const { token, user } = res.data;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return user;
};