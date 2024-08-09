import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}

const BlogCard = ({ id, authorName, title, content, publishedDate } : BlogCardProps) => {
  
  let newAuthorName;
  let dateString = publishedDate.replace('am', 'AM').replace('pm', 'PM');
  console.log(`name is ${authorName}`)
  // if(authorName == localStorage.getItem('name'))
  // {
  //   newAuthorName = "Me";
  // }
  return (
    <Link to={`/blog/${id}`}>
            <div className='border-b border-slate-200 sm:p-4 py-4 p-2 w-screen max-w-screen-md cursor-pointer'>
              <div className='flex'>
                  <div className='flex justify-center flex-col'>
                      <Avatar size={'small'} name={authorName}/>
                  </div>
                  <div className='font-extralight pl-2 flex justify-center flex-col '>
                      {newAuthorName || authorName}
                  </div>
                  <div className='flex justify-center flex-col pl-2'>
                      <Circle/>
                  </div>
                  <div className='pl-2 font-thin text-slate-500 flex justify-center flex-col text-sm font-cascadia'>
                  {`${Math.ceil(content.length/100)} min read`}

                  </div>
                  
              </div>
        <div className='text-xl font-semibold mt-2'>
            {title}
        </div>
        <div className='text-md font-thin'>
            {content.slice(0,100) + "..."}
        </div>
        <div className='text-slate-500 text-sm font-bold pt-4 font-cascadia'>
        {dateString}

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
    if (name.trim().split(" ").length > 1) {
      const newName = name.split(" ");
      nName = newName[0][0] + newName[1][0]; // Get initials from the first and second words
    }
    console.log(nName);
    return (
      <div className={`relative inline-flex items-center justify-center ${size === 'small' ? "w-8 h-8" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className={`${size === "small" ? "text-xs": "text-md"} text-gray-600 dark:text-gray-200`}>
          {nName ? nName : "LoL"}
        </span>
      </div>
    );
  }
export default BlogCard