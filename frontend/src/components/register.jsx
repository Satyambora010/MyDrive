import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./userContext";

const Register = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/api/auth/register", { username, email, password },{
            withCredentials: true
        })
            .then((res) => {
                console.log(res);
                setUser(res.data.user);
                navigate("/dashboard");
            })
            .catch((err) => {
                alert("Error registering");
            })
    }

    return (
        <div className="flex items-center justify-center w-3/4 h-1/2">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 border-2 border-blue-400 rounded-md h-full w-full items-center justify-center">
                <h1 className="text-2xl font-bold text-blue-400">Create an account</h1>
                <input onChange={(e) => setUsername(e.target.value)} className="border-2 border-blue-400 rounded-md p-4 w-3/4" type="text" placeholder="Name" />
                <input onChange={(e) => setEmail(e.target.value)} className="border-2 border-blue-400 rounded-md p-4 w-3/4" type="email" placeholder="Email" />
                <input onChange={(e) => setPassword(e.target.value)} className="border-2 border-blue-400 rounded-md p-4 w-3/4" type="password" placeholder="Password" />
                <button className="bg-blue-400 text-white px-4 py-2 rounded-md w-3/4" type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default Register;