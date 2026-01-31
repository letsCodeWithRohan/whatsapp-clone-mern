import { FaWhatsapp } from 'react-icons/fa'
import { IoLockClosedOutline } from 'react-icons/io5'

function DefaultStatusScreen() {
  return (
    <div className="flex-1 relative h-full flex items-center justify-center flex-col gap-3">
      <FaWhatsapp className="text-gray-700 text-7xl" />
      <h3 className="text-lg font-semibold">Whatsapp Clone for Web</h3>
      <p className="text-gray-400 text-xs leading-4.5 text-center">Click on a contact to view their status updates</p>
      <p className="absolute bottom-[8%] flex items-center justify-center gap-2 text-sm text-gray-400 left-0 w-full text-center">
        <IoLockClosedOutline />
        Status updates are end-to-end encrypted
      </p>
    </div>
  )
}

export default DefaultStatusScreen
