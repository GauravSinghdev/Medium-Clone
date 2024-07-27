import { Avatar } from './BlogCard';
import { PiNotePencil } from "react-icons/pi";


const Appbar = () => {
  let fName = localStorage.getItem("name");
  return (
    <div className='border-b flex justify-between px-4 sm:px-6 md:px-10 lg:px-20 py-2 items-center'>
      <div className='text-2xl sm:text-3xl font-bold font-[serif] cursor-pointer'>
        <a href="/blogs">Medium</a>
      </div>

      <div className='flex items-center'>
        <a
          href="/publish"
          type="button"
          className="text-back font-medium rounded-xl text-md text-slate-600 hover:text-slate-900 px-3 sm:px-5 py-2 me-2 sm:me-5 flex gap-1 sm:gap-2"
        >
          <PiNotePencil className='w-6 h-6' />
          Write

        </a>

        <Avatar size="big" name={fName || "Anonymous"} />
      </div>
    </div>
  );
}

export default Appbar;
