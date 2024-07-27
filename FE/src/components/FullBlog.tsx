import { Blogs } from "../hooks";
import Appbar from "./Appbar";
import { Avatar } from "./BlogCard";

const FullBlog = ({ blog }: { blog: Blogs }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 gap-10 px-4 sm:px-6 md:px-10 pt-12 w-full max-w-screen-xl">
          <div className="col-span-12 lg:col-span-4 order-1 lg:order-2">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex w-full pt-4">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar size={"big"} name={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Random phrase regarding this Anonymous Author art.
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8 order-2 lg:order-1">
            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
              {blog.title}
            </div>
            <div className="text-slate-500 pt-2">Posted on 2nd Aug, 2024</div>
            <div className="pt-4">{blog.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
