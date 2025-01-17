import React from "react";

// Icons
import { RiDoubleQuotesL } from "react-icons/ri";

const Profile = ({ imageURL, name, role, company, review }) => {
  return (
    <div className="w-72 h-52 flex flex-col justify-between border-2 border-black/10 rounded-md p-3 line">
      <div>
        <RiDoubleQuotesL />
        <p className="text-black line-clamp-3">{review}</p>
      </div>
      <div className="flex justify-start items-center gap-2 mt-7">
        <img
          src={imageURL}
          className="border-2 border-black rounded-full w-10 h-10"
        />
        <div>
          <p className="text-black/70 text-sm">{name}</p>
          <p className="text-black/50 text-xs">{role},</p>
          <p className="text-black/50 text-xs">{company}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
