import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";  
import { useContext } from "react";

const PrivateRoute = () => {

  const {isLogged  } = useContext(AuthContext);

  return  isLogged ? <Outlet /> : <Navigate to="/login  " />;
};

export default PrivateRoute;