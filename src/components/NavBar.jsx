import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/create-todo", label: "Create Todo" },
  { path: "/mytodo", label: "My Todos" },
  { path: "/login", label: "Signin" },
  { path: "/register", label: "SignUp" },
];

export const NavBar = () => {
  const { logout, isLogged } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();  
    navigate("/login");  
  };

  return (
    <div className="flex p-6 gap-x-10 justify-center items-center">
      {navItems.map((item, index) => {
        if (item.label === "Signin" || item.label === "SignUp") {
          return !isLogged ? (
            <NavLink key={index} to={item.path}>
              <button>{item.label}</button>
            </NavLink>
          ) : null;
        }
        return (
          <NavLink key={index} to={item.path}>
            <button>{item.label}</button>
          </NavLink>
        );
      })}
      {isLogged && (
        <button onClick={handleLogout}>Logout</button> 
      )}
    </div>
  );
};
