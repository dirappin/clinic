import React from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import user from "../../state/user";


const useEntryCheckerRole = () => {
  const navigate = useNavigate();
  const userData = useRecoilValue(user)

  const verifyRole = () => {
    if (userData.role === 'entry-checker') {
      navigate('/surveillance')
    }
  }
  return { verifyRole }
};

export default useEntryCheckerRole;
