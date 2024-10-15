import { FaPaperPlane} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="flex items-center fixed bottom-5 left-10 w-full ">
      <input 
        type="text" 
        placeholder="Enter Your Message Here" 
        className="p-4 text-[18px] outline-none shadow-md shadow-slate-400 w-[80%]" 
      />
      <button>
        <FaPaperPlane type="submit" className="text-4xl ml-4 cursor-pointer hover:text-blue-700 transition"/>
      </button>
    </footer>
  )
}

export default Footer