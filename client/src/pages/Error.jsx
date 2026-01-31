import { NavLink } from 'react-router-dom'

function Error() {
  return (
    <div className="flex items-center flex-col gap-3 justify-center h-screen bg-base-100">
      <h1 className='text-3xl font-semibold'>404 - Page not found</h1>
      <p>The page you are looking for is not founded</p>
      <p className='text-xs text-gray-500'>Please check the URL or return to the homepage.</p>
      <NavLink to="/" className="btn btn-success mt-4">
        Go to Homepage
      </NavLink>  
    </div>
  )
}

export default Error
