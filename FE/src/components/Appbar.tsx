import { Link } from 'react-router-dom'
import { Avatar } from './BlogCard'

const Appbar = () => {
  return (
    <div className='border-b flex justify-between px-10 py-2 items-center'>
        <div className='text-3xl font-bold font-[serif] cursor-pointer'>
            <Link to="/blogs">Medium</Link>
        </div>

        <div>
            <Link to="/publish" type="button" className="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-xl text-sm px-5 py-2.5 me-10">Add Blog +</Link>
        
            <Avatar size= "big" name="Gaurav Singh"/>
        </div>
    </div>
  )
}

export default Appbar