import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import userAtom from "../../state/user";
import { jwtExpirationMessage } from "../../components/constant";
import { backendBaseUrl } from "../../constant";


export function UseAuthentication() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [__, setUser] = useRecoilState(userAtom);

    const authenticate = async () => {
        setLoading(true);
        const getToken = localStorage.getItem("token");

        if (!getToken) {
            setLoading(false);
            navigate("/login");
        } else {
            try {
                const request = await axios.post(
                    backendBaseUrl + "auth/verify-token",
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
            } catch (error) {
                setLoading(false);
                if (error.response?.data.message === jwtExpirationMessage) {
                    setLoading(false);
                    navigate("/session-end");
                } else {
                    setLoading(false);
                    navigate("/login");
                }
            }
        }

    };

    return { authenticate, loading };
}
