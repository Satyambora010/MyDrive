import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";
import UserContext from "./userContext";

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(API_ENDPOINTS.LOGIN, { email, password },{
            withCredentials: true
        })
            .then((res) => {
                setUser(res.data.user);
                navigate("/dashboard");
            })
            .catch((err) => {
                alert("Error logging in");
            })
    }

    return (
        <>
        <button onClick={() => navigate("/")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-15 text-blue-400 px-4 py-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
        </button>

        <div className="w-screen h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 border-2 border-blue-400 rounded-md h-1/2 w-1/2 items-center justify-center p-10">
                <h1 className="text-2xl font-bold text-blue-400">Login</h1>
                <input onChange={(e) => setEmail(e.target.value)} className="border-2 border-blue-400 rounded-md p-4 w-3/4" type="email" placeholder="Email" />
                <input onChange={(e) => setPassword(e.target.value)} className="border-2 border-blue-400 rounded-md p-4 w-3/4" type="password" placeholder="Password" />
                <button className="bg-blue-400 text-white px-4 py-2 rounded-md w-3/4" type="submit">Login</button>
            </form>
        </div>
        </>
    )
}

export default Login;