import { BsGithub } from 'react-icons/bs'
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-black mt-auto"> {/* Removed absolute positioning for better alignment */}
            <div className="text-sm text-gray-200 flex justify-center items-center py-3 gap-2">
                <a href="https://github.com/GauravSinghdev/Medium-Clone" target='_blank'>
                    <BsGithub className='w-6 h-6 me-2'/>
                </a>
                <p>Copyright © 2024</p> 
                <p className='font-semibold text-[#cfa25a]'>@codewithkara</p> {/* Corrected font class */}
                <p>All rights reserved.</p>

                

                <a href="https://twitter.com/codewithkara"
                target='_blank'>
                    <FaXTwitter className='w-6 h-6 ms-2'/>
                </a>

                
            </div>
    </footer>
  )
}

export default Footer