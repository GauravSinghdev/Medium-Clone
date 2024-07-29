import { useEffect, useState } from "react";
import { Blogs } from "../hooks";
import Appbar from "./Appbar";
import { Avatar } from "./BlogCard";

import { CgShapeZigzag } from "react-icons/cg";

const FullBlog = ({ blog }: { blog: Blogs }) => {

  const [bio, setBio] = useState<String>("");
  useEffect(() => {
    setBio(blog.author.bio)
  },[])

  // Convert and format the blog creation date
  const formattedDate = new Date(blog.createdDate).toLocaleDateString("en-US", {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true // Use 'false' for 24-hour time
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 gap-6 px-4 sm:px-6 md:px-10 py-12 w-full max-w-screen-lg overflow-y-auto">
          <div className="col-span-12 lg:col-span-4 order-1 lg:order-2 mb-6 lg:mb-0">
            <div className="text-slate-800 text-xl border-b">Author</div>
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
          <div className="col-span-12 lg:col-span-8 order-2 lg:order-1">
            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
              {blog.title}
            </div>
            <div className="pt-4 text-justify">{blog.content}</div>
            <div className="text-slate-900 m-10 text-right flex justify-end items-center gap-1">
              <CgShapeZigzag />
              {formattedDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
