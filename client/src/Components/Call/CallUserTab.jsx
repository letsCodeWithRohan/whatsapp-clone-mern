import { VscCallIncoming,VscCallOutgoing } from "react-icons/vsc";

function CallUserTab() {
    return (
        <div className="hover:bg-base-200 p-2 rounded-md flex items-center gap-3 cursor-pointer">
            <div className="avatar">
                <div className="w-12 rounded-full">
                    <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-1 justify-center overflow-hidden">
                <h3 className="text-sm font-semibold text-ellipsis text-nowrap">Rohan Chaudhari</h3>
                <p className="text-xs flex items-center gap-2 text-gray-500">
                    <VscCallOutgoing/>
                    Incoming
                    </p>
            </div>
            <div className="flex flex-col items-end gap-1">
                <span className="text-[12px] font-semibold text-gray-600">10:30 AM</span>
            </div>
        </div>
    )
}

export default CallUserTab
