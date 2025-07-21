import { USER_SERVER_KEY } from "@/Keys";
import axios from "axios";
import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface propChildren {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: propChildren) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<null | boolean>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.post(USER_SERVER_KEY + "auth", {});
        console.log("✅ Authenticated:", res.data);
        setAuth(true);
      } catch (err) {
        console.error("❌ Authentication failed:", err);
        setAuth(false);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  if (auth === null) return <div>Loading...</div>; // waiting for auth
  return <>{auth ? children : <h1>You are screwed</h1>}</>;
};

export default ProtectedRoute;
