import { BsGithub } from 'react-icons/bs';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="w-full bg-black mt-auto">
      <div className="text-sm text-gray-200 flex flex-col sm:flex-row justify-center items-center py-3 gap-2 sm:gap-4">
        <a href="https://github.com/GauravSinghdev/Medium-Clone" target="_blank" rel="noopener noreferrer">
          <BsGithub className="w-6 h-6 me-2" />
        </a>
        <p className="text-center sm:text-left">Copyright © 2024</p>
        <p className="font-semibold text-[#cfa25a] text-center sm:text-left">@codewithkara</p>
        <p className="text-center sm:text-left">All rights reserved.</p>
        <a href="https://twitter.com/codewithkara" target="_blank" rel="noopener noreferrer">
          <FaXTwitter className="w-6 h-6 ms-2" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
