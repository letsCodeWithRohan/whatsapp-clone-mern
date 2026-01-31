
function Timestamp({date="One Day"}) {
    return (
        <div className="w-full flex items-center justify-center">
            <span className="bg-base-300 py-1 px-2 text-xs rounded">{date}</span>
        </div>
    )
}

export default Timestamp
