import { create } from "zustand";
// import axiosInstance from '../lib/axios'
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((get, set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ username, email, password, confirmPassword }) => {
    console.log(username, email, password);
    set({ loading: true });

    if (password != confirmPassword) {
      set({ loading: false });
      return toast.error("passwords donot match");
    }
    try {
      const res = await axiosInstance.post("/auth/signup", {
        username,
        email,
        password,
      });
      // set({ user: res.data, loading: false });
      console.log(res);
    } catch (error) {
      set({ loading: false });
      console.log("hello i am error", error);
      toast.error(error.response.data.error || "An error occurred");
    }
  },
}));
