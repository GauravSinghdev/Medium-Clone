import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom";

export interface Blogs{
    "content" : string;
    "title" : string;
    "id" : number;
    "createdDate" : string,
    "author" : {
        "name" : string;
    }
}

export const useBlog = ({id} : {id : string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blogs>();


    useEffect(() => {
        axios.get(`${BACKEND_URL}/blog/${id}`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false);
            })
    },[id])

  return {
    loading,
    blog
  } 
}

const useBlogs = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate('/signin'); // Navigate to signin page if token is not present
                return;
            }

            try {
                const response = await axios.get(`${BACKEND_URL}/blog/bulk`, {
                    headers: {
                        Authorization: token,
                    },
                });
                setBlogs(response.data.blogs);
                setLoading(false);
            } catch (e) {
                console.error(e);
                setError("Failed to fetch blogs");
                setLoading(false);
                navigate('/signin'); // Navigate to signin page if there's an error
            }
        };

        fetchBlogs();
    }, [navigate]);

    return {
        loading,
        blogs,
        error
    };
};

export default useBlogs;
