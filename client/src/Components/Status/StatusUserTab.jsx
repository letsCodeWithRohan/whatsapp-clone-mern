import React from 'react'

function StatusUserTab({user="Chaudhari Rohan",time="Today, 12:30 PM"}) {
    return (
        <div className="hover:bg-base-200 p-2 rounded-md flex items-center gap-3 cursor-pointer">
            <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring-2 ring-offset-2">
                    <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-1 justify-center overflow-hidden">
                <h3 className="text-sm font-semibold text-ellipsis text-nowrap">{user}</h3>
                <p className="text-xs text-gray-500 text-ellipsis text-nowrap">{time}</p>
            </div>
        </div>
    )
}

export default StatusUserTab
