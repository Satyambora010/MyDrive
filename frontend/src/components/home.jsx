import { useNavigate } from "react-router-dom";
import Register from "./register";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen w-screen flex">
            <div className = "flex w-full">
                <div className="flex flex-col gap-10 items-center justify-center w-1/2">
                    <div className="flex gap-10 items-center justify-center">
                        <h1 className="text-8xl font-bold font-sans text-center text-blue-400">My Drive</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-40 text-blue-400 animate-bounce">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                        </svg>
                    </div>

                    <div className="flex gap-10 items-center justify-center">
                        <button onClick={() => navigate("/login")} className="bg-blue-400 w-40 text-white px-4 py-2 rounded-md">Login</button>
                    </div>
                </div>
                <div className="flex items-center justify-center w-1/2 h-full">
                    <Register />
                </div>
            </div>

        </div>
    )
}

export default Home;