import { useNavigate } from "react-router-dom";

const DropMenu = () => {
    const navigate = useNavigate();

    const handleSignout = () => {
        localStorage.clear();
        navigate('/signin');
    };

    return (
        <div className="absolute right-[-10px] sm:right-[-30px] w-48 sm:w-60 bg-white border border-gray-300 rounded-lg shadow-lg z-10 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-4 py-2 text-sm text-gray-900 dark:text-white">
                <div className="font-medium">{localStorage.getItem('name') || ""}</div>
                <div className="text-gray-600 dark:text-gray-400 truncate">{localStorage.getItem('email') || ""}</div>
            </div>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                    <a href="/my-blogs" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                        My Blogs
                    </a>
                </li>
                <li>
                    <a href="/my-settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                        Settings
                    </a>
                </li>
                <li>
                    <button
                        onClick={handleSignout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        Sign out
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default DropMenu;
