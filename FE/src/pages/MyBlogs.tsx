import BlogCard from '../components/BlogCard'
import Appbar from '../components/Appbar'
import useBlogs from '../hooks'
import BlogSkeleton from '../components/BlogSkeleton';
import { useEffect } from 'react';

const MyBlogs = () => {

    const {loading, blogs} = useBlogs();
    console.log(typeof(blogs));
    console.log(blogs);
    const userName = localStorage.getItem('name');

    useEffect(() => {
        document.title = "My Blogs - MediClone"
    })
    

    const newBlogs = blogs.filter((ele) => ele.author.name === userName)

    // blogs.map((ele) => {
    //     if(ele.author.name === userName)
    //     {
    //         ele.author.name = 'Me'
    //     } 
    // })

    if(loading) {
        return <div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div>
                {/* <div className='text-5xl font-bold font-[cursive] my-5 underline underline-offset-4 text-center'>
                Your Stories
            </div> */}
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }
    
  return (
    <div className='bg-gray-100 min-h-screen'>
        <Appbar/>
        <div className='flex flex-col justify-center items-center'>
        {/* <div className='text-5xl font-semibold font-[cursive] my-5 underline underline-offset-4'>
                Your Stories
            </div> */}
            { newBlogs.length > 0 ?
            <div className='flex flex-col gap-3 my-2'>
                {
                    newBlogs.slice().reverse().map(blog => <BlogCard
                        id={blog.id}
                        authorName={blog.author.name || "Anonymous"}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={new Date(blog.createdDate).toLocaleString('en-IN', {
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true // Use 'false' for 24-hour time
                          })}
                    />)
                }
                
            </div> :
            <div className="flex justify-center items-center">
            <div className="text-center mt-40">
                <div className="text-4xl font-bold text-gray-700">
                    No Stories Yet
                </div>
                <div className="mt-4 text-xl text-gray-500">
                    Click <a href='/publish' className="font-semibold text-blue-600 hover:underline hover:underline-offset-2">Here</a> to start writing your stories.
                </div>
            </div>
        </div>
        
        }
        </div>
    </div>
    
    
  )
}

export default MyBlogs