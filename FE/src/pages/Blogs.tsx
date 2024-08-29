import BlogCard from '../components/BlogCard'
import Appbar from '../components/Appbar'
import useBlogs from '../hooks'
import BlogSkeleton from '../components/BlogSkeleton';
import { useEffect } from 'react';

const Blogs = () => {

    const {loading, blogs} = useBlogs();
    console.log(typeof(blogs));

    useEffect(() => {
        document.title = "Blogs - MediClone"
    })

    if(loading) {
        return (
            <div className="bg-gray-100 min-h-screen">
                <Appbar /> 
                <div className="flex justify-center">
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
        );
    }
    
    return (
        <div className="bg-gray-100 min-h-screen">
            <Appbar />
            <div className="flex flex-col items-center">
                <div className="flex flex-col gap-3 my-2">
                    {blogs.slice().reverse().map(blog => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            authorName={blog.author.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={new Date(blog.createdDate).toLocaleString('en-IN', {
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            })} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Blogs;
