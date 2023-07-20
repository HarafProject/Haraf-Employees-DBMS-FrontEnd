import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";



const AdminIndexPage = () => {
    const { code } = useSelector((state) => state?.admin)
    const navigate = useNavigate()
    useEffect(() => {
        console.log(code)
       if(!code) navigate(-1,{replace:true})
    }, [code])


    return (
        <div>
             <Outlet />
        </div>
    )
}

export default AdminIndexPage