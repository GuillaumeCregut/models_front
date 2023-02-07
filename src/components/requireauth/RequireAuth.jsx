import React from 'react'
import useAuth from '../../hooks/useAuth'
import {Navigate, Outlet,useLocation} from 'react-router-dom';
const RequireAuth = ({allowedRoles}) => {
    const {auth}=useAuth();
    const location=useLocation();
    return (
        <div>
            auth?.user
            ?<Outlet />
            :<Navigate to='/' state={{from:location}} replace />
        </div>
    )
}

export default RequireAuth
