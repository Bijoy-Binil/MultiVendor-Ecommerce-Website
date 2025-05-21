import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth';

const CustomerLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Use the logout function from auth utility
        logout();
        navigate('/customer/login');
    }, [navigate]);

    return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-xl">Logging out...</p>
        </div>
    );
}

export default CustomerLogout;