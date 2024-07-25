import React, { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SignupInput } from '@codewithkara/medium-common'
import axios from 'axios';
import { BACKEND_URL } from '../config';

const Auth = ({type}: {type: "signup" | "signin"}) => {

    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: "",

    });

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/user/${type=== 'signin' ? "signin" : "signup"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        }catch(e){

        }
        
    }
  return (
    <div className='h-screen flex justify-center flex-col'>

        <div className='flex justify-center'>
            <div>
                <div className='px-10'>
                    <div className='text-3xl font-extrabold'>
                        {type !== 'signin' ? "Create an account" : "Enter an account"}
                    </div>

                    <div className='text-slate-400'>
                        {type === 'signin' ? "Don't have an account?" : 'Already have an account?'}

                        <Link className='pl-2 underline' to={type === 'signin' ? "/signup" : "/signin"}>
                            {type === 'signin' ? "Signup" : "Signin"}
                        </Link>
                    </div>
                </div>

                <div className='mt-10 flex flex-col gap-2'>
                    {
                        type === 'signup' ? <LabelledInput label="Name" placeholder='Gaurav Singh...' onChange={(e) => {
                            setPostInputs(prev => ({
                                ...prev, 
                                name:e.target.value
                            }))
                        }} /> : null
                    }
                    
                    <LabelledInput label="Email" placeholder='gauravkalakoti19@gmail.com' onChange={(e) => {
                        setPostInputs(prev => ({
                            ...prev, 
                            username:e.target.value
                        }))
                    }} />

                    <LabelledInput label="Password" type={'password'} placeholder='pass123' onChange={(e) => {
                        setPostInputs(prev => ({
                            ...prev, 
                            password:e.target.value
                        }))
                    }} />

                    <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-5 w-full">{type === 'signup' ? 'Sign up' : 'Sign in'}</button>

                </div>
            </div>            
        </div> 

    </div>
  )
}

interface LabelledInputType{
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type? : string;
}

function LabelledInput({label, placeholder, onChange, type} : LabelledInputType){
    return (
        <div>
            <div>
                <label className="block m-1 text-sm text-black font-semibold">{label}</label>
                <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-[cursive]" placeholder={placeholder} required />
            </div>
        </div>
    )
}

export default Auth