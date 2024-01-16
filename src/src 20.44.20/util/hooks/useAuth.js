import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import userAtom from "../../state/user";
import { jwtExpirationMessage } from "../../components/constant";


export function UseAuthentication() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [__, setUser] = useRecoilState(userAtom);

    const authenticate = async () => {
        setLoading(true);
        const getToken = localStorage.getItem("token");

        if (!getToken) {
            navigate("/auth/signin");
        }

        try {
            const request = await axios.post(
                "http://localhost:3001/auth/verify-token",
                {
                    token: getToken,
                }
            );

            setUser({
                ...request.data.user,
                authToken: getToken,
                loggedIn: true,
            });

            setLoading(false);
            navigate("/");
        } catch (error) {
            if (error.response?.data.message === jwtExpirationMessage) {
                setLoading(false);
                navigate("/session-end");
            } else {
                setLoading(false);
                navigate("login");
            }
        }
    };

    return { authenticate, loading };
}
