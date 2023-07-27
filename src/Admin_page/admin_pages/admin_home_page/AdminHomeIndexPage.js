import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const AdminHomeIndexPage = () => {
    const { user } = useSelector((state) => state?.user)
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) navigate(-1, { replace: true })
    }, [user])


    return (
        <div>
            <Outlet />
        </div>
    )
}

export default AdminHomeIndexPage