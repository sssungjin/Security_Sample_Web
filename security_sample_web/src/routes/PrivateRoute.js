import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children, roles }) => {
  const currentUser = AuthService.getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      try {
        const decodedToken = jwtDecode(currentUser.token);
        if (roles && !roles.includes(decodedToken.role)) {
          alert(
            `Access Denied: Your role is ${
              decodedToken.role
            }. Required role(s): ${roles.join(", ")}`
          );
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Token decoding error:", error);
        AuthService.logout();
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [currentUser, roles, navigate]);

  if (!currentUser) {
    return null;
  }

  return children;
};

export default PrivateRoute;
