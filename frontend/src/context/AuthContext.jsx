import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("access");

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

        localStorage.setItem("access", token);

        api.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${token}`;

        setUser(userData);

    };

    const logout = () => {

        localStorage.removeItem("access");

        delete api.defaults.headers.common.Authorization;

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
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