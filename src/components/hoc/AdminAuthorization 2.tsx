import React from "react";
import user from "../../state/user";
import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";

const RoleAuthorization = ({ children, role }) => {
  const userData = useRecoilValue(user);
  return userData.role === role ? (
    <>{children}</>
  ) : (
    <Navigate replace to={".."} />
  );
};

export default RoleAuthorization;
