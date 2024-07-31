import { FaTimes } from 'react-icons/fa';
const Modal = ({isOpen,onClose,children}) => {
    if(!isOpen)return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded shadow-lg">
            <button className='float-right' onClick={onClose}>
            <FaTimes className="text-gray-500 hover:text-gray-800" />
            </button>
            {children}
        </div>
    </div>
  )
}

export default Modal