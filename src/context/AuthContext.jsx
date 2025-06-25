import { createContext, useEffect, useState } from "react";
import { login_fn, signin_fn } from "../service/operations/auth";

const AuthContext = createContext(null)


const AuthProvider = ({children})=>{
    const [user , setUser] = useState(null)
    const[isLogged , setIsLogged] = useState(false)

useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
        console.log(storedUser , "qwertyuiop")
        setUser(JSON.parse(storedUser)); 
        setIsLogged(true);
    }
}, []);


    const login = async(email,password,navigate)=>{
        try { 
            const res = await login_fn(email,password)
            console.log(res.data.user , "hjhjhjhjh")
            if(res){
                setUser(res.data.user)
                localStorage.setItem('user',JSON.stringify(res.data.user))
                setIsLogged(true)
                navigate('/create-todo')
            }
        } catch (error) {
            console.error("Error logging in:", error);
          }
    }
    const signin = async(name,email,password,confirmPassword)=>{
        const res = await signin_fn(name,email,password,confirmPassword);
        if(res){
            setUser(res.data.user)
            localStorage.setItem("user",JSON.stringify(res.data.user))
            setIsLogged(true);

        }
    }
    const logout = async(navigate)=>{
        localStorage.clear();
        setUser(null)
        setIsLogged(false)
    }
    return(
        <AuthContext.Provider value={{user,isLogged,signin,login,logout}}>
            {children}
        </AuthContext.Provider>
    ) 
}
export{AuthContext,AuthProvider}