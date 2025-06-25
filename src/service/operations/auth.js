import { apiConnector } from "../apicontector"
import {endPoints} from "../apis"

const {LOGIN,SIGNUP} = endPoints

export const login_fn = async(email,password)=>{
    try {
        const res = await apiConnector("POST",LOGIN,{email,password})
        return res;
    } catch (error) {
        console.error("Error in loginApi ,",error)
    }
}
export const signin_fn = async(name,email,password,confirmPassword)=>{
    try {
        const res = await apiConnector("POST",SIGNUP,{
            name,
            email,
            password,
            confirmPassword
        })
        return res
    } catch (error) {
            console.error("Error in loginApi ,",error)
    }
}