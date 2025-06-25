import { apiConnector } from '../apicontector'
import {tasks} from '../apis'

const {ADD_TODO,SHOW_TODO , DELETE_TODO , UPDATE_TASK, CHANGE_STATUS }  = tasks

export const addTodoFn = async(title,description)=>{
try {
    const res = await apiConnector("POST" ,ADD_TODO , {
        title : title,
        description : description
    })
    return res;

} catch (error) {
    console.error("Error in Adding Todo ,",error)
}
}

export const showALLTodoFn = async()=>{
try {   
    
    const res = await apiConnector("GET" ,SHOW_TODO )
    return res;

} catch (error) {
    console.error("Error in showing error ,",error)
}
}


export const deleteTodoFn = async(id)=>{
try {
    const res = await apiConnector("DELETE" ,DELETE_TODO,{
        taskId : id
    } )
    return res;

} catch (error) {
    console.error("Error in error deleteTodo ,",error)
}
}


export const UpdateTodoFn = async()=>{
try {
    const res = await apiConnector("PUT" ,UPDATE_TASK )
    return res;

} catch (error) {
    console.error("Error in error UpdateTodo ,",error)
}
}
export const changeStatusTodoFn = async(id , status)=>{
try {
    const res = await apiConnector("PUT" ,CHANGE_STATUS,{
        taskId : id,
        status : status
    } )
    return res;

} catch (error) {
    console.error("Error in error changeStatusTodo ,",error)
}
}