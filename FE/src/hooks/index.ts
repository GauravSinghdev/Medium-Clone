import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"


export interface Blogs{
    "content" : string;
    "title" : string;
    "id" : number;
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

    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blogs[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/blog/bulk`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            })
    },[])

  return {
    loading,
    blogs
  }
}

export default useBlogs