import axios from "axios"
import Appbar from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

const Publish = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
  return (
    <div>
        <Appbar/>

        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900">Your Topic</label>
                <input onChange={e => setTitle(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full p-2.5 outline-none" placeholder="Title"/>

               <TextEditor onChange={(e) => {
                setDescription(e.target.value)
               }}/>

               <div className="text-right">
                    <button 
                        onClick={ async () => {
                            const response = await axios.post(`${BACKEND_URL}/blog`,{
                                title,
                                content: description
                            },{
                                headers: {
                                    Authorization: localStorage.getItem('token')
                                }
                            });
                            navigate(`/blog/${response.data.id}`);
                        }}
                        type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Publish post
                    </button>    
                </div>
            </div>
        </div>

        

    </div>
    
  )
}

function TextEditor({onChange}: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return (
        
        <div className="mt-2">
            <div className="w-full mb-4 border">
                
                    <div className="flex items-center justify-between">
                        <div className=" bg-white rounded-b-lg w-full">                            
                            <textarea onChange={onChange} id="editor" rows={8} className="block w-full p-2 text-sm text-gray-800 bg-white focus:outline-none" placeholder="Write an article..." required />
                        </div>
                    </div>
            </div>
        </div>

    )
}

export default Publish