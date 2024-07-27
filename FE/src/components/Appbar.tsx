import { Link } from 'react-router-dom';
import { Avatar } from './BlogCard';

const Appbar = () => {
  let fName = localStorage.getItem("name");
  return (
    <div className='border-b flex justify-between px-4 sm:px-6 md:px-10 lg:px-20 py-2 items-center'>
      <div className='text-2xl sm:text-3xl font-bold font-[serif] cursor-pointer'>
        <Link to="/blogs">Medium</Link>
      </div>

      <div className='flex items-center'>
        <Link
          to="/publish"
          type="button"
          className="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-xl text-sm px-3 sm:px-5 py-2 me-2 sm:me-5"
        >
          Add Blog +
        </Link>

        <Avatar size="big" name={fName || "Anonymous"} />
      </div>
    </div>
  );
}

export default Appbar;
