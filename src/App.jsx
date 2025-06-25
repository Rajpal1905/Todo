import { Route, Routes } from "react-router-dom"
import { NavBar } from "./components/NavBar"
import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { CreateTodoPage } from "./pages/CreateTodoPage"
import { MyTodoList } from "./pages/MyTodoList"
import PrivateRoute from "./utils/PrivateRoutes"


function App() {

  return (
   <div>
      <NavBar/>
      <Routes>
        <Route path="/" element = {<HomePage/>}/>
        <Route element = {<PrivateRoute/>}>
        <Route path="/create-todo" element = {<CreateTodoPage/>}/>

        <Route path="/mytodo" element = {<MyTodoList/>}/>
        </Route>  
     
        <Route path="/login" element = {<LoginPage/>}/>
        <Route path="/register" element = {<RegisterPage/>}/>
      </Routes>

   </div>
  )
}

export default App
