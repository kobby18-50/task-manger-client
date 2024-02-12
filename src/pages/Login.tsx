import { Button, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/url";
import CustomSpinner from "../components/CustomSpinner";

import { toast, ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";

import useTokenStore from "../store/tokenStore";



const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const {token, setToken} = useTokenStore()

    const handleLogin = (event : React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        event.preventDefault()

        const data = {
            email, 
            password
        }

       axios.post(`${BASE_URL}/auth/login`, data)
       .then(res => {
        console.log(res.data.token)
        setToken(res.data.token)
        toast.success('Login Successful', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false
            })
            setLoading(false)
        setTimeout(() => {
            navigate('/dashboard')
        },2000)
       })
       .catch(err => {
        toast.error(err.response.data.msg, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false
            })
        setLoading(false)
       })

    }

    
    console.log(token)
    return ( 
        <form onSubmit={handleLogin} className="m-32 border p-10 rounded-lg shadow-md">
            <div className="my-10">
                <Label>Email</Label>
                <TextInput type="email" required value={email} onChange={event => setEmail(event.target.value)}/>
            </div>
            <div className="my-10">
                <Label>Password</Label>
                <TextInput type="password" required value={password} onChange={event => setPassword(event.target.value)}/>
            </div>

            
            {loading ? <CustomSpinner/> : <Button type="submit" className="mb-5">Login</Button>}


            <small>Don't have an account yet? <a href="/register" className="underline">Register here</a> </small>

            <ToastContainer/>

        </form>
     );
}
 
export default Login;