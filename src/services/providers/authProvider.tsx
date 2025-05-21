// import  secureLocalStorage from "react-secure-storage"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import sec from "react-secure-storage";
import AuthContext from "../context/auth";
import { ApiResponse, Lead, LeadRegistration, LeadWithToken } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL + "/leads";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lead, setLead] = useState<Lead | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    () => (sec.getItem("aspk") as string) || null
  );

  const [loading, setLoading] = useState<boolean>(true);

  const handleAuthSuccess = (data: LeadWithToken) => {
    sec.setItem("aspk", data.accessToken);
    Cookies.set("refreshToken", data.refreshToken, {
      secure: true,
      sameSite: "Strict",
    });

    setAccessToken(data.accessToken);
    setLead(data);
  };

  const fetchUser = async () => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    try {
      const aspk = accessToken;
      console.log("aspk", aspk);
      const res = await axios.get<ApiResponse<Lead>>(`${BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${aspk}`,
        },
      });
      const { data } = res.data;
      setLead(data);
    } catch {
      setLead(null);
      setAccessToken(null);
      sec.removeItem("aspk");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      if (!accessToken) {
        setLoading(false);
        return;
      }
      await fetchUser();
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const createLead = async (
    registerData?: LeadRegistration
  ): Promise<{ error: Error | null; data: Lead | null }> => {
    setLoading(true);
    try {
      const res = await axios.post<ApiResponse<LeadWithToken>>(
        `${BASE_URL}/create`,
        {
          ...registerData,
        }
      );

      const { error, data, message } = res.data;
      console.log("message", message);

      if (error) {
        return { error: new Error(message), data: null };
      }
      handleAuthSuccess(data);
      setMessage(message);

      return { error: null, data: lead };
    } catch (e) {
      let message;
      if (axios.isAxiosError(e)) {
        message = e.response?.data?.message;
      }
      //   toast.error(`${message}` || "Login failed");
      setMessage(message);

      return { error: new Error(message || "Registration failed"), data: null };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        lead,
        message,
        loading,
        accessToken,
        createLead,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
