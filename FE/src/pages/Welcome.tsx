import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Welcome = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-slate-200 flex justify-center items-center flex-grow">
        <div className="flex flex-col gap-2 text-center">
          <div className="text-3xl font-bold">
            "Welcome to the clone of Medium App"
          </div>
          <div className="flex justify-center">
            <Link to="/signin" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Get Started
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Welcome;