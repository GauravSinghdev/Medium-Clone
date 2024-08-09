import { useState, useEffect, useRef } from 'react';
import { Avatar } from './BlogCard';
import { PiNotePencil } from "react-icons/pi";
import DropMenu from './DropMenu';
const Appbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Create a ref for the dropdown menu

  const fName = localStorage.getItem("name");

  useEffect(() => {
    // @ts-ignore
    const handleClickOutside = (event) => {
      // Ensure menuRef.current is not null and event.target is valid 
      // @ts-ignore
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Close the menu if the click is outside
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className='border-b flex justify-between px-4 sm:px-6 md:px-10 lg:px-20 py-1 items-center'>
      <div className='text-2xl sm:text-3xl font-bold font-[serif] cursor-pointer'>
        <a href="/blogs" className='font-cascadia'>MediClone</a>
      </div>

      <div className='flex items-center'>
        <a
          href="/publish"
          className="font-medium rounded-xl text-md text-slate-600 hover:text-slate-900 px-3 sm:px-5 py-1 me-2 sm:me-5 flex gap-1 sm:gap-2"
        >
          <PiNotePencil className='w-6 h-6' />
          Write
        </a>

        <div className="relative" ref={menuRef}>
          <button onClick={() => setIsMenuOpen(prev => !prev)}>
            <Avatar size="big" name={fName || "Anonymous"} />
          </button>
          <div
            className={`absolute mt-2 right-0 bg-white border-gray-300 rounded-lg shadow-lg z-20 dark:bg-gray-800 dark:border-gray-700 ${
              isMenuOpen ? 'block' : 'hidden'
            }`}
          >
            <DropMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
