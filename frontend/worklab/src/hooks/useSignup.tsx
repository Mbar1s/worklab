import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export default function useSignup() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/signup`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      //save the user to the local storage
      localStorage.setItem("user", JSON.stringify(json));
    }
    //update the authContext
    dispatch({ type: "LOGIN", payload: json });

    setIsLoading(false);
  };
  return { signup, isLoading, error };
}
