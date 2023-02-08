import React from 'react'
import useAuth from '../../hooks/useAuth';

const AdminPage = (props) => {
    const {auth}=useAuth();
    console.log('admin',auth);
    return (
        <div>
            Admin
        </div>
    )
}

export default AdminPage
