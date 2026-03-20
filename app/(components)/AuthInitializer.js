"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../reduxStore/slices/authSlice";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch]);

  return null;
}