import { Button, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/url";
import CustomSpinner from "../components/CustomSpinner";

import { toast, ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";



const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleLogin = (event : React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        event.preventDefault()

        const data = {
            name,
            email, 
            password
        }

       axios.post(`${BASE_URL}/auth/register`, data)
       .then(res => {
        console.log(res)
        toast.success('Account Successful Created', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false
            })
            setLoading(false)
        setTimeout(() => {
            navigate('/')
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
    return ( 
        <form onSubmit={handleLogin} className="m-32 border p-10 rounded-lg shadow-md">
            <div className="my-10">
                <Label>Name</Label>
                <TextInput type="text" required value={name} onChange={event => setName(event.target.value)}/>
            </div>
            <div className="my-10">
                <Label>Email</Label>
                <TextInput type="email" required value={email} onChange={event => setEmail(event.target.value)}/>
            </div>
            <div className="my-10">
                <Label>Password</Label>
                <TextInput type="password" required value={password} onChange={event => setPassword(event.target.value)}/>
            </div>

            
            {loading ? <CustomSpinner/> : <Button type="submit" className="mb-5">Register</Button>}


            <small>Already have an account <a href="/" className="underline">Login instead</a> </small>

            <ToastContainer/>

        </form>
     );
}
 
export default Register;