import useraAtom from "../../state/user";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const Authorization = ({ children }) => {
    const userData = useRecoilValue(useraAtom);

    return (
        <>
            {userData.loggedIn ? <>{children}</> : <Navigate to={"/login"} />}
        </>
    );
};

export default Authorization;
