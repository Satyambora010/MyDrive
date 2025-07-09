import axios from "axios";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        axios.get("http://localhost:3001/api/auth/getUser", {
            withCredentials: true,
        })
        .then((res) => {
            setUser(res.data.user);
        })
        .catch(() => {
            setUser(null); 
        })
        .finally(() => {
            setLoading(false); 
        });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;