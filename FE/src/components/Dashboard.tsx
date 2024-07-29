import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

// Placeholder function for deleting the user account
const deleteUserAccount = async () => {
  try {
    const token = localStorage.getItem("token");
    // Replace this with your actual API call or mutation
    await axios.delete(`${BACKEND_URL}/user/delete`, {
      headers: {
          Authorization: token,
      },
  });
    console.log('Deleting user account');
    // Example: await fetch('/api/delete-account', { method: 'DELETE' });
  } catch (error) {
    console.error('Failed to delete the account:', error);
  }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [bio, setBio] = useState<string>(''); // State for bio text

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const b = e.target.value;
    console.log(b.trim());
    console.log(b.length)
    setBio(b); // Update bio state
  };

  const handleDeleteAccount = async () => {
    console.log("Hey")
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteUserAccount();
        alert('Account deleted successfully!');
        setTimeout(() => {   
          localStorage.clear();      
          navigate('/signin');
        },1000);
        
        // Optionally, redirect the user or handle post-deletion logic
      } catch (error) {
        console.error('Failed to delete the account:', error);
      }
    }
  };

  const handleBio = async () => {
    try {
      console.log("hey")
      const token = localStorage.getItem("token");
      // Replace this with your actual API call or mutation
      const response = await axios.put(`${BACKEND_URL}/user/edit-bio`, {bio}, {
        headers: {
            Authorization: token,
        },
    });
      setBio(response.data.User.bio);
      console.log(response.data);
      console.log('Bio added user account');
      alert("Bio updated successfully!");
      showBio();
    } catch (error) {
      console.error('Failed to edit bio', error);
    }
  }

  const showBio = async () => {
    try{
      console.log("hey")
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKEND_URL}/user/user-details`,{
        headers: {
          Authorization: token,
        }
      });
      console.log(response.data.User)
      setBio(response.data.User.bio);
      console.log('Got Bio from BE');
    } catch (error) {
      console.error('Failed to get bio', error);
    }
  }

  useEffect(()=>{
    showBio();
  },[])

  return (
    <div className="mx-4 max-w-screen-2xl mt-20 sm:mx-8 xl:mx-auto">
      <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
        <div className="col-span-8 overflow-hidden rounded-xl bg-white px-4 py-6 sm:bg-gray-50 sm:px-8 sm:shadow">
          <div className="pt-4">
            <h1 className="py-2 text-2xl font-semibold">Account Settings</h1>
          </div>
          <hr className="my-4" />
          <div className="py-2 text-xl font-semibold">Email Address</div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-600">
              Your email address is <strong>{localStorage.getItem('email')}</strong>
            </p>
            
          </div>
          {
              !true && 
              <p className='text-red-600 text-sm'>Email already present</p>
            }
          <hr className="my-4" />
          <div className="py-2 text-xl font-semibold">Add Bio</div>
          <textarea
            value={bio}
            onChange={handleBioChange}
            placeholder="Write a short bio about yourself..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
          />
          <button
            onClick={handleBio}
            className="mt-2 inline-flex text-sm font-semibold text-blue-600 underline decoration-2"
          >
            Save Bio
          </button>
          <hr className="my-4" />
          <div className="mb-10">
            <p className="py-2 text-xl font-semibold">Delete Account</p>
            <div className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Proceed with Caution
            </div>
            <p className="mt-2 text-gray-700">
              Make sure you have taken a backup of your account in case you ever need to get access to your data. We will completely wipe your data. There is no way to access your account after this action.
            </p>
            <button
              onClick={handleDeleteAccount}
              className="ml-auto text-sm font-semibold text-rose-600 underline decoration-2"
            >
              Continue with Deletion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


/* <button
              onClick={() => {/* Handle email change */
            //   className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2"
            // >
            //   Change
            // </button> */}