import BlogCard from '../components/BlogCard'
import Appbar from '../components/Appbar'
import useBlogs from '../hooks'
import BlogSkeleton from '../components/BlogSkeleton';

const Blogs = () => {

    const {loading, blogs} = useBlogs();
    console.log(typeof(blogs));
    // const userName = localStorage.getItem('name');
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
    <div>
        <Appbar/>
        <div className='flex flex-col items-center'>
            {/* <div className='text-5xl font-bold font-[cursive] my-1 text-left underline underline-offset-4'>
                Stories
            </div> */}
            <div className='flex flex-col gap-3 my-2'>
                {
                    blogs.slice().reverse().map(blog => <BlogCard
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
                
            </div>
        </div>
    </div>
    
    
  )
}

export default Blogs