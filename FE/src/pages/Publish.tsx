import axios from "axios";
import Appbar from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Publish = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const titleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
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
                    <div className="text-right">
                        <button
                            onClick={async () => {
                                const response = await axios.post(`${BACKEND_URL}/blog`, {
                                    title,
                                    content: description
                                }, {
                                    headers: {
                                        Authorization: localStorage.getItem('token')
                                    }
                                });
                                navigate(`/blog/${response.data.id}`);
                            }}
                            type="submit"
                            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                        >
                            Publish
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
                            className="block w-full p-2 text-xl text-gray-800 bg-white focus:outline-none border-none outline-none focus:bg-slate-200"
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
