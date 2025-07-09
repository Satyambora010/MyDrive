import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import UserContext from "./userContext";

const Dashboard = () => {
    const { user, loading, setUser } = useContext(UserContext);
    const [files, setFiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [loading, user]);

    useEffect(() => {
        if (user) {
        axios.get(`http://localhost:3001/api/files/get-files/${user._id}`, {
            withCredentials: true
        })
        .then((res) => {
            setFiles(res.data);
        })
        .catch((err) => {
                alert("Error getting files");
            });
        }
    }, [user]);

    const handleSearch = () => {
        axios.get(`http://localhost:3001/api/files/search-files/${user._id}`, {
            params: {
                query: searchQuery
            },
            withCredentials: true
        })
        .then((res) => {
            setFiles(res.data.map((file) => file.file));
        }).catch((err) => {
            alert("Error searching files");
        });
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/api/files/delete-file/${id}`, {
            withCredentials: true
        })
        .then((res) => {
            setFiles(files.filter((file) => file._id !== id));
        }).catch((err) => {
            alert("Error deleting file");
        });
    }

    const handleView = (url, id) => {
        axios.put(`http://localhost:3001/api/files/increment-view-count/${id}`, {}, {
            withCredentials: true
        })
        .then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
            alert("Failed to view file");
        });
        window.open(url, "_blank");
    }

    if (!user) {
        return null; 
    }

    if (loading) {
        return <p>Loading...</p>; 
    }
    console.log(files);

    return (
        <div>
            <Header />
            <div className="flex mt-16 ml-4 mr-4 w-screen">
                <h2 className="text-2xl font-bold text-blue-400">Welcome, {user.username} !!</h2>
            </div>
            <div className="flex gap-4 mt-16 ml-4 mr-4">
                <input type="text" 
                        placeholder=" Search files" 
                        className="w-2/3 h-10 p-4 border-2 border-blue-400 rounded-md focus:outline-none focus:border-blue-400" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch} className="w-1/6 h-10 bg-blue-400 text-white rounded-md">Search</button>
            </div>
            <div className="flex flex-col mt-16 ml-4 mr-4 w-screen h-screen gap-4">
                {files.length === 0 && (
                    <div className="flex justify-center w-full h-screen">
                        <h2 className="text-2xl font-bold text-blue-200">You don't have files yet</h2>
                    </div>
                )}
                {files.map((file) => (
                    <div key={file._id} className="flex flex-col justify-between w-4/5 h-16 bg-gray-100 rounded-md p-4">
                        <div className="flex justify-between w-full">
                            <h2 className="text-lg font-bold text-blue-400">{file.filename}</h2>
                            <div className="flex gap-4">
                                <button onClick={() => handleView(file.url, file._id)} className="text-sm text-blue-400">View</button>
                                <button onClick={() => handleDelete(file._id)} className="text-sm text-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
