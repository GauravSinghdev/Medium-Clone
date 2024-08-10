import axios from "axios";
import Appbar from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";

const Publish = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [spin, setSpin] = useState(false);
    const [error, setError] = useState(false);
    const [description, setDescription] = useState("");
    const titleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            navigate("/signin");
            return;
        }
        if (titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, []);

    return (
        <div>
            <Appbar />
            <div className="flex justify-center w-full pt-8 px-5">
                <div className="max-w-screen-lg w-full">
                    <input
                        ref={titleInputRef}
                        onChange={e => setTitle(e.target.value)}
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-3xl rounded block w-full p-2.5 outline-none border-none border-l-2 focus:bg-slate-200 text-transform: capitalize"
                        placeholder="Title"
                        autoFocus
                    />
                    <TextEditor onChange={(e) => {
                        setDescription(e.target.value);
                    }} />
                    <div className="flex justify-between">
                        <div>
                           {error && <p className="text-red-600 text-lg">Title and Stories are required!</p>}
                        </div>
                        <button
                            onClick={async () => {
                                const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
                                setSpin(true);
                                await delay(1000);
                                if(!title || !description)
                                {
                                    setError(true);
                                    setSpin(false);
                                    return;
                                }
                                const response = await axios.post(`${BACKEND_URL}/blog`, {
                                    title,
                                    content: description
                                }, {
                                    headers: {
                                        Authorization: localStorage.getItem('token')
                                    }
                                });
                                setError(false);
                                navigate(`/blog/${response.data.id}`);
                            }}
                            type="submit"
                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-5">
                            <div className='grid grid-cols-5 gap-1'>
                                <div className="col-span-3">
                                    Publish
                                </div>
                                <div className="col-span-2">
                                    { spin && <Spinner size={"small"}/>}
                                </div>
                            </div>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="mt-2">
            <div className="w-full mb-4">
                <div className="flex items-center justify-between">
                    <div className="bg-white rounded-b-lg w-full">
                        <textarea
                            onChange={onChange}
                            id="editor"
                            rows={8}
                            className="block w-full p-2 text-xl text-gray-800 bg-white focus:outline-none border-none outline-none focus:bg-slate-200 resize-none"
                            placeholder="Tell your story..."
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Publish;
