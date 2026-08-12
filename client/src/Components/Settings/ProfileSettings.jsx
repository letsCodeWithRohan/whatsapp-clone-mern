import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineContentCopy } from "react-icons/md";
import { UserContext } from "../../context/UserContext.js";
import { IoMdCheckmark } from "react-icons/io";
import toast from "react-hot-toast";
import axios from "axios";

function ProfileSettings() {
  const { user, setUser } = React.useContext(UserContext);
  let [name, setName] = React.useState(user?.fullname || "");
  let [bio, setBio] = React.useState(
    user?.bio || "Hey there! I am using Whatsapp Clone.",
  );
  let [profilePicture, setProfilePicture] = React.useState(
    user?.profilePicture || "",
  );
  let [previewImage, setPreviewImage] = React.useState("");

  let handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(user?.email);
      toast.success("copied to clipboard");
    } catch (error) {
      console.log(error);
    }
  };

  let handleFullnameUpdate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/update-fullname",
        { fullname: name },
        {
          withCredentials: true,
        },
      );

      const data = await response?.data;

      if (response?.status === 200) {
        toast.success(data?.message);
        setUser(response?.data?.user); // Update the user context with the new fullname
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("[Update Fullname Error]: ", error);
      toast.error("Failed to update fullname");
    }
  };

  let handleBioUpdate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/update-bio",
        { bio },
        {
          withCredentials: true,
        },
      );

      const data = await response?.data;

      if (response?.status === 200) {
        toast.success(data?.message);
        setUser(response?.data?.user); // Update the user context with the new bio
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("[Update Bio Error]: ", error);
      toast.error("Failed to update bio");
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setProfilePicture(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
    }
};

  const handleProfilePictureUpdate = async () => {

    if (!profilePicture) {
        toast.error("Please select an image first");
        return;
    }

    try {

        const formData = new FormData();

        formData.append(
            "profilePicture",
            profilePicture
        );

        const response = await axios.post(
            "http://localhost:3000/api/user/update-profile-picture",
            formData,
            {
                withCredentials: true
            }
        );

        if (response.status === 200) {

            toast.success(
                response.data.message ||
                "Profile picture updated!"
            );

            setUser(response.data.user);

            // Optional: clear temporary preview
            setPreviewImage("");

        }

    } catch (error) {

        console.error(
            "[Update Profile Picture Error]:",
            error
        );

        toast.error(
            error.response?.data?.message ||
            "Failed to update profile picture"
        );
    }
};

  return (
    <div className="flex-1 relative h-full flex items-start flex-col gap-3 p-5">

      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box flex flex-col items-center justify-center gap-3">
          <h3 className="font-bold text-lg">Profile Picture Preview</h3>
          <img
            src={previewImage || user?.profilePicture}
            alt="Profile Preview"
            className="w-[300px] h-[300px] object-cover rounded-full"
          />
          <p className="text-sm text-gray-500">
            Press ESC key or click on ✕ button to close
          </p>
          {previewImage &&
            <button className="btn btn-success btn-outline" onClick={handleProfilePictureUpdate}>
            Confirm Picture
          </button>
          }
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </dialog>

      <h1 className="text-2xl font-regular">Profile Settings</h1>
      <p className="text-md text-gray-300">Manage your profile information</p>
      <div className="divider"></div>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex gap-5 w-full">
          <div class="tooltip" data-tip="Click to preview">
            <img
              src={previewImage || user?.profilePicture}
              alt="Profile Picture"
              className="w-30 h-30 rounded-full"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            />
          </div>
          <div className="flex flex-col justify-center gap-2">
            <div className="flex gap-2 items-center">
              <input
                type="file"
                onChange={(e) => handleProfilePictureChange(e)}
                name="profilePicture"
                accept="image/*"
                id="profilePicture"
                hidden
              />
              <label htmlFor="profilePicture" className="btn btn-success">
                Change Profile Picture
              </label>
              <button className="btn btn-error btn-outline">
                Remove Profile Picture
              </button>
            </div>
            <p className="text-sm text-gray-500">
              We support JPG, PNG and GIF files.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <p className="text-sm font-medium">Bio</p>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Enter your bio"
              className="input input-ghost w-full focus:outline-0 focus:border-b-emerald-400"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            {bio.trim() !== user?.bio && (
              <div className="flex items-center justify-center w-[50px] h-[50px] hover:bg-base-200 group rounded-md">
                <IoMdCheckmark
                  onClick={handleBioUpdate}
                  className="text-gray-500 group-hover:text-white"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p className="text-sm font-medium">Name</p>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-ghost w-full focus:outline-0 focus:border-b-emerald-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {name.trim() !== user?.fullname && (
              <div
                onClick={handleFullnameUpdate}
                className="flex items-center justify-center w-[50px] h-[50px] hover:bg-base-200 group rounded-md"
              >
                <IoMdCheckmark className="text-gray-500 group-hover:text-white" />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <p className="text-sm font-medium">Email</p>
          <div className="flex gap-5">
            <HiOutlineMail className="text-xl text-gray-500" />
            <span className="text-sm text-gray-500 flex-1">
              {user?.email || "example@example.com"}
            </span>
            <MdOutlineContentCopy
              className="text-xl text-gray-500 cursor-pointer hover:text-emerald-400"
              onClick={handleCopy}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
