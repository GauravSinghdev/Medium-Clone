import Auth from '../components/Auth'
import Quote from '../components/Quote'

const Signin = () => {
  return (
        <div className='grid grid-cols-1 lg:grid-cols-2 bg-gray-100'>
            <div>
                <Auth type="signin"/>
            </div>

            <div className='hidden lg:block'>
                <Quote/>
            </div>
        </div>
  )
}

export default Signin