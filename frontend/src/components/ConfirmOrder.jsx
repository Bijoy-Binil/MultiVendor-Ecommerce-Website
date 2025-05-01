import React, { useContext, useEffect } from "react";
import { UserContext } from "../../src/Context";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const userContext = useContext(UserContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!userContext.login) {
      navigate("/customer/login");
    }
  }, [userContext, navigate]);

  return (
    <div>
      <p className="flex justify-center text-3xl text-green-500 font-bold">
        Your Order is Confirmed
      </p>
    </div>
  );
};

export default ConfirmOrder;
