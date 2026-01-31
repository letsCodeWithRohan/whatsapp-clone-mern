import CallUserTab from "./CallUserTab";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";

function CallSideBar() {
    const [search, setSearch] = useState('');
    return (
        <div className="w-[25%] h-full items-center p-3 justify-between gap-3 border-base-300 border-r-2 flex flex-col">
            <div className="flex items-center w-full justify-between">
                <h2 className="text-lg font-semibold">Calls</h2>
                <div className="flex items-center gap-2">
                    <div className="h-[2em] w-[2em] rounded-sm hover:bg-base-200 flex items-center justify-center">
                        <i className="bi bi-telephone-plus text-md cursor-pointer"></i>
                    </div>
                </div>
            </div>
            <div className="rounded-md flex items-center border-b-2 border-emerald-600 gap-2 bg-base-200 w-full py-2 px-3">
                <IoSearch className="opacity-50 text-md" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search or start a new call"
                    className="placeholder:text-sm text-sm outline-none flex-1 border-0" />
            </div>
            {/* If viewed status then */}
            <p className="text-sm text-gray-300 w-full">Recent</p>
            <div className="flex flex-col gap-2 flex-1 w-full overflow-y-auto">
                {/* Status list items would go here */}
                <CallUserTab />
                <CallUserTab />
            </div>
        </div>
    )
}

export default CallSideBar
