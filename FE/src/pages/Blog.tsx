import { useParams } from "react-router-dom";
import FullBlog from "../components/FullBlog";
import { useBlog } from "../hooks";
import Appbar from "../components/Appbar";
import { Spinner } from "../components/Spinner";
import { useEffect } from "react";

const Blog = () => {
  const {id} = useParams();
  const { loading, blog } = useBlog({
    id: id || ""
  });

  const bTitle = blog?.title || "Title..."

  useEffect(() => {
    document.title = ` ${bTitle} - MediClone`
  })

  if(loading || !blog){
    return <div>
      <Appbar/>
      <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center mb-20">
          <Spinner />
        </div>
      </div>
    </div>
  }
  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  )
}

export default Blog