import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}

const BlogCard = ({ id, authorName, title, content, publishedDate } : BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
            <div className='border-b border-slate-200 p-4 pb-4 w-screen max-w-screen-md cursor-pointer'>
              <div className='flex'>
                  <div className='flex justify-center flex-col'>
                      <Avatar size={'small'} name={authorName}/>
                  </div>
                  <div className='font-extralight pl-2 flex justify-center flex-col'>
                      {authorName}
                  </div>
                  <div className='flex justify-center flex-col pl-2'>
                      <Circle/>
                  </div>
                  <div className='pl-2 font-thin text-slate-500 flex justify-center flex-col'>
                      {publishedDate}
                  </div>
                  
              </div>
        <div className='text-xl font-semibold'>
            {title}
        </div>
        <div className='text-md font-thin'>
            {content.slice(0,100) + "..."}
        </div>
        <div className='text-slate-400 text-sm font-thin pt-4'>
            {`${Math.ceil(content.length/100)} min read`}
        </div>
    </div>
    </Link>

  )
}

export function Circle(){
    return <div className='h-1 w-1 rounded-full bg-slate-500'>
    </div>
}

export function Avatar({ name, size = "small" }: { name: string, size: "small" | "big" }) {
    let nName = name[0]; // Default to the first character of the name
  
    if (name.split(" ").length > 1) {
      const newName = name.split(" ");
      nName = newName[0][0] + newName[1][0]; // Get initials from the first and second words
    }
  
    return (
      <div className={`relative inline-flex items-center justify-center ${size === 'small' ? "w-7 h-7" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className={`${size === "small" ? "text-xs": "text-md"} text-gray-600 dark:text-gray-200`}>
          {nName}
        </span>
      </div>
    );
  }
export default BlogCard