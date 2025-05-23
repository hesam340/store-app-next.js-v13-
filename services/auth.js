import api from "@/configs/api";

const signup = async (data) => {
  try {
    const res = await api.post("/auth/register", {
      username: data.username,
      password: data.password,
    });
    return { res };
  } catch (error) {
    return { error };
  }
};

const signin = async (data) => {
  try {
    const res = await api.post("/auth/login", {
      username: data.username,
      password: data.password,
    });
    return { res };
  } catch (error) {
    return { error };
  }
};

export { signup, signin };
