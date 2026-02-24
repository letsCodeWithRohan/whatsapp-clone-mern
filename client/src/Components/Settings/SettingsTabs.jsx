
function SettingsTabs({main,description,icon}) {

  return (
    <div className="hover:bg-base-200 md:p-2 p-2 rounded-md flex items-center gap-3 cursor-pointer bg-base-100">
        {icon}
      <div className="md:flex hidden flex-col gap-0.5">
        <span className="text-md font-semibold">{main}</span>
        <span className="text-sm font-regular text-gray-400">{description}</span>
      </div>
    </div>
  );
}

export default SettingsTabs;
