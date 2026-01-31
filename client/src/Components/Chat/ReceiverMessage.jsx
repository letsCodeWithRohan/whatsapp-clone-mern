import React from 'react'

function ReceiverMessage({ message = "Hello", time = "12:00 PM" }) {
    return (
        <div className="p-2 bg-base-200 max-w-[70%] rounded-r-md rounded-bl-md text-white self-start flex items-end gap-2">
            <p className="text-sm">
                {message}
            </p>
            <span className="text-gray-300 text-[10px]">{time && !isNaN(new Date(time))
                ? new Date(time).toLocaleString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                })
                : 'Last Seen, Today : 10:30 PM'}</span>
        </div>
    )
}

export default ReceiverMessage
