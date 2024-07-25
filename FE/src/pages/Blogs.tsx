import React from 'react'
import BlogCard from '../components/BlogCard'
import Appbar from '../components/Appbar'

const Blogs = () => {
  return (
    <div>
        <Appbar/>
        <div className='flex justify-center'>
            <div className='max-w-xl'>
                <BlogCard
                    authorName={"Harkirat Singh"}
                    title={"How an ugly single page website makes $5000 a month without affiliated marketting"}
                    content={"content of the blog is How an ugly single page website makes $5000 a month without affiliated marketting"}
                    publishedDate={"25th July 2024"}
                    />

                <BlogCard
                    authorName={"Harkirat Singh"}
                    title={"How an ugly single page website makes $5000 a month without affiliated marketting"}
                    content={"content of the blog is How an ugly single page website makes $5000 a month without affiliated marketting"}
                    publishedDate={"25th July 2024"}
                    />

                <BlogCard
                    authorName={"Harkirat Singh"}
                    title={"How an ugly single page website makes $5000 a month without affiliated marketting"}
                    content={"content of the blog is How an ugly single page website makes $5000 a month without affiliated marketting"}
                    publishedDate={"25th July 2024"}
                    />
            </div>
        </div>
    </div>
    
    
  )
}

export default Blogs