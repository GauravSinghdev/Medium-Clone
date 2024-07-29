import { useEffect, useState } from "react";
import { Blogs } from "../hooks";
import Appbar from "./Appbar";
import { Avatar } from "./BlogCard";
import { MdDeleteOutline } from "react-icons/md";
import { BACKEND_URL, hidden_Admin } from "../config";
import { CgShapeZigzag } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FullBlog = ({ blog }: { blog: Blogs }) => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  const [bio, setBio] = useState<string>("");

  useEffect(() => {
    if (localStorage.getItem('name') === hidden_Admin) {
      setAdmin(true);
    }
    setBio(blog.author.bio);
  }, [blog.author.bio]);

  const deleteABlog = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BACKEND_URL}/blog/delete-blog/${blog.id}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log('Deleting blog');
    } catch (error) {
      console.error('Failed to delete the blog:', error);
    }
  };

  const handleBlogDel = async () => {
    if (window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      try {
        await deleteABlog();
        alert('Blog deleted successfully!');
        setTimeout(() => {
          navigate('/blogs');
        }, 1000);
      } catch (error) {
        console.error('Failed to delete the blog:', error);
      }
    }
  };

  // Convert and format the blog creation date
  const formattedDate = new Date(blog.createdDate).toLocaleDateString("en-US", {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true // Use 'false' for 24-hour time
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 gap-6 px-4 sm:px-6 md:px-10 py-12 w-full max-w-screen-lg">
          <div className="col-span-12 lg:col-span-4 order-1 lg:order-2 mb-6 lg:mb-0">
            <div className="text-slate-800 text-xl border-b pb-2">Author</div>
            <div className="flex w-full pt-4">
              <div className="pr-4 mb-12 flex flex-col justify-center">
                <Avatar size="big" name={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  {bio}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8 order-2 lg:order-1 relative">
            {admin && (
              <button
                onClick={handleBlogDel}
                className="absolute right-4 lg:right-12 lg:top-2 p-2 text-gray-700 hover:text-red-600 bg-white rounded-full shadow-md border border-red-200"
              >
                <MdDeleteOutline className="w-8 h-8" />
              </button>
            )}
            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800">
              {blog.title}
            </div>
            <div className="pt-4 text-justify text-gray-700">{blog.content}</div>
            <div className="text-slate-900 mt-10 text-right flex justify-end items-center gap-1">
              <CgShapeZigzag className="text-lg text-gray-400" />
              {formattedDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
