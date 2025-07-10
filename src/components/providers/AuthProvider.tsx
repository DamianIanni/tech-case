/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { createContext, useContext, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@/types/user/index";

import {
  loginWithCredentials,
  getCurrentUser,
  userDoesLogout,
} from "@/lib/api/auth/user";

type AuthContextType = {
  user: User | null | undefined;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoginPending: boolean;
  isErrorLogin: boolean;
  isSuccessLogin: boolean;
  isSuccessLogout: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
    retry: false,
  });

  const {
    mutateAsync: loginMutate,
    isError: isErrorLogin,
    isSuccess: isSuccessLogin,
    error: errorLogin,
    isPending: isLoginPending,
  } = useMutation({
    mutationFn: loginWithCredentials,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["me"] }),
  });

  const login = async (credentials: {
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      await loginMutate(credentials);
      console.log("wdym");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const {
    mutateAsync: logoutMutate,
    isError: isErrorLogout,
    isSuccess: isSuccessLogout,
    error: errorLogout,
  } = useMutation({
    mutationFn: userDoesLogout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["me"] }),
  });

  const logout = async () => {
    console.log("logout");

    await logoutMutate();
  };

  if (isLoading) return null; // loading state while fetching user data

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoginPending,
        isErrorLogin,
        isSuccessLogin,
        isSuccessLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
