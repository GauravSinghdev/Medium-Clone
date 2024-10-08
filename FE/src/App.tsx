import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import Welcome from './pages/Welcome'
import Publish from './pages/Publish'
import NotFoundPage from './components/NotFoundPage'
import MyBlogs from './pages/MyBlogs'
import Setting from './pages/Setting'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/my-settings" element={<Setting />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App