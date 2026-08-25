import React, { useEffect, useState, useCallback } from "react";
import registerContext from "./registerContext";

const getInitialState = () => {
    const currentUser = sessionStorage.getItem("currentUser");
    if (!currentUser) return null;
    
    try {
        return JSON.parse(currentUser);
    } catch (error) {
        console.error("Failed to parse currentUser from sessionStorage:", error);
        sessionStorage.removeItem("currentUser"); // Clean up corrupted data
        return null;
    }
};

const RegisterContextProvider = ({ children }) => {
    const [user, setUser] = useState(getInitialState);

    // Sync user state to sessionStorage whenever it changes
    useEffect(() => {
        if (user) {
            sessionStorage.setItem("currentUser", JSON.stringify(user));
        } else {
            sessionStorage.removeItem("currentUser");
        }
    }, [user]);

    // Login function
    const login = useCallback((userData) => {
        setUser(userData);
    }, []);

    // Logout function
    const logout = useCallback(() => {
        setUser(null);
    }, []);

    

    return (
        <registerContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </registerContext.Provider>
    );
};

export default RegisterContextProvider;