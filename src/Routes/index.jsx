import { Route, Routes } from "react-router";
import { Home } from "../pages/home";



export function Router(){
    return(
       <Routes>
            <Route path="/" element={<Home/>}/>
       </Routes> 
       
    )
}