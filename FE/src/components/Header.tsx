import { BsGithub } from 'react-icons/bs';
import { FaXTwitter } from 'react-icons/fa6';

const Header = () => {
  return (
    <footer className="w-full bg-slate-700">
      <div className="text-sm text-gray-200 flex sm:flex-row justify-center items-center py-3">
        <a href="https://github.com/GauravSinghdev/Medium-Clone" target="_blank" rel="noopener noreferrer">
          <BsGithub className="w-6 h-6 me-2" />
        </a>
        <p className="font-semibold text-[#ebab45] text-center sm:text-left">@codewithkara</p>
        <p className="text-center sm:text-left hidden">All rights reserved.</p>
        <a href="https://twitter.com/codewithkara" target="_blank" rel="noopener noreferrer">
          <FaXTwitter className="w-6 h-6 ms-2" />
        </a>
      </div>
    </footer>
  );
};

export default Header;
