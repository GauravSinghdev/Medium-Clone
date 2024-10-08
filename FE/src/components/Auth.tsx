import { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SignupInput } from '@codewithkara/medium-common'
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Spinner } from './Spinner';

const Auth = ({type}: {type: "signup" | "signin"}) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    if(token)
    {
        navigate("/blogs");
        return;
    }
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: "",

    });

    const [spin, setSpin] = useState(false);
    const [error, setError] = useState(false);

    const sendRequest = async () => {
        try{
            setSpin(true);
            const response = await axios.post(`${BACKEND_URL}/user/${type=== 'signin' ? "signin" : "signup"}`, postInputs);
            const jwt = response.data.jwt;
            const name = response.data.user
            localStorage.setItem("token", jwt);
            localStorage.setItem("name", name.name);
            localStorage.setItem("email", postInputs.username || "");
            navigate("/blogs");
        }catch(e){
            setSpin(false);
            setError(true);
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
                        type === 'signup' ? <LabelledInput label="Name" type={'Username'} placeholder='ABC Singh  .  .  .' onChange={(e) => {
                            setPostInputs(prev => ({
                                ...prev, 
                                name:e.target.value
                            }))
                        }} /> : null
                    }
                    
                    <LabelledInput label="Email" placeholder='abcSingh2020@gmail.com' onChange={(e) => {
                        setPostInputs(prev => ({
                            ...prev, 
                            username:e.target.value
                        }))
                    }} />

                    <LabelledInput label="Password" type={'password'} placeholder='abcpass123' onChange={(e) => {
                        setPostInputs(prev => ({
                            ...prev, 
                            password:e.target.value
                        }))
                    }} />

                    
                    <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-5 w-full">
                        <div className='grid grid-cols-5 gap-1'>
                            <div className='col-span-3 text-right me-1.5'>
                            {type === 'signup' ? 'Sign up' : 'Sign in'}

                            </div>
                            <div className='col-span-2'>
                                { spin && <Spinner size={"small"}/>}
                            </div>
                        </div>
                        
                        
                    
                    </button>

                </div>
            </div>            
        </div> 
        {
            error &&
            <div className='text-red-600 text-center' >
                Error occurred! Please try again with some different credentials.
            </div>

        }

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
                <input onChange={onChange} type={type || "text"} id="first_name" className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${type === 'Username' ? 'text-transform: capitalize': ''}`} placeholder={placeholder} required />
            </div>
        </div>
    )
}

export default Auth