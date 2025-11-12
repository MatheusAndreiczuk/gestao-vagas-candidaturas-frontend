import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'
import React from "react";

type Props = {
  children: ReactNode;
};

function PrivateRoute({children}: Props){
    const token = localStorage.getItem('token')
    if(token){
      return children
    } else {
      return <Navigate to='/' replace />
    }
}

export default PrivateRoute