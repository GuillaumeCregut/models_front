import React from 'react'
import useAuth from '../../hooks/useAuth';

const AdminPage = (props) => {
    const {auth}=useAuth();
    return (
        <div>
            Admin
        </div>
    )
}

export default AdminPage
