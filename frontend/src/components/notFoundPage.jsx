import NotFound from '../assets/notfound.png'
const NotFoundPage = () => {
  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center overflow-hidden'>
        <img src={NotFound} alt="Not Found Page" className='w-full  h-full  object-cover'/>
    </div>
  )
}

export default NotFoundPage