import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isGuest, setIsGuest] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("access");
        const guest = localStorage.getItem("guest");

        if (guest === "true") {
            setIsGuest(true);
            setLoading(false);
            return;
        }

        if (token) {

            api.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${token}`;

            api.get("/accounts/profile/")
                .then((response) => {

                    setUser(response.data);

                })
                .catch(() => {

                    localStorage.removeItem("access");

                    delete api.defaults.headers.common.Authorization;

                })
                .finally(() => {

                    setLoading(false);

                });

        } else {

            setLoading(false);

        }

    }, []);

    const login = (userData, token) => {

        localStorage.removeItem("guest");

        setIsGuest(false);

        localStorage.setItem("access", token);

        api.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${token}`;

        setUser(userData);

    };

    const guestLogin = () => {

        localStorage.setItem(
            "guest",
            "true"
        );

        setIsGuest(true);

        setUser(null);

    };

    const logout = () => {

        localStorage.removeItem("access");

        localStorage.removeItem("guest");
        
        delete api.defaults.headers.common.Authorization;

        setUser(null);

        setIsGuest(false);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                isGuest,
                login,
                guestLogin,
                logout,
                loading,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}