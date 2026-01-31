import React from 'react'

function SenderMessage({message="Hii, Rohan",time="3:40 PM",seen=false}) {
    return (
        <div className="p-2 bg-emerald-700 max-w-[70%] rounded-l-md rounded-br-md text-white self-end flex items-end gap-2">
            <p className="text-sm">
                {message}
            </p>
            <span className="text-gray-300 text-[10px]">{time && !isNaN(new Date(time))
                ? new Date(time).toLocaleString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                })
                : 'Last Seen, Today : 10:30 PM'}</span>
            <i className={`bi bi-check2-all text-[11px] ${seen === false ?'text-gray-300':'text-blue-400'}`}></i>
        </div>
    )
}

export default SenderMessage
