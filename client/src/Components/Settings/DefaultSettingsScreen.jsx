import { FaGear } from "react-icons/fa6";

function DefaultSettingsScreen() {
  return (
    <div className="flex-1 relative h-full flex items-center justify-center flex-col gap-3">
      <FaGear className="text-gray-700 text-7xl" />
      <h1 className="text-3xl font-regular">Settings</h1>
    </div>
  );
}

export default DefaultSettingsScreen;
