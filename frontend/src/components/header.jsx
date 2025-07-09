import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className= "flex justify-between items-center w-screen h-16 bg-blue-400">
                <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 ml-4">
                    <h1 className="text-2xl font-bold font-sans text-white">MyDrive</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                    </svg>
                </button>
                <div className="flex items-center gap-2 mr-4">
                    <button onClick={() => navigate("/uploadFile")} className="mr-4 bg-white text-blue-400 px-4 py-2 rounded-md">Upload File</button>
                    <button onClick={() => {
                        axios.post(API_ENDPOINTS.LOGOUT, {}, {
                            withCredentials: true
                        })
                        .then((res) => {
                            navigate("/");
                        })
                        .catch((err) => {
                            alert("Error logging out");
                        });
                    }} className="mr-4 bg-white text-blue-400 px-4 py-2 rounded-md">Logout</button>
                </div>
            </div>
    );
};

export default Header;