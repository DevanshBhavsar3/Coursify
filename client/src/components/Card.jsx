import React from "react";

const Card = ({ imageURL, title, creator }) => {
  return (
    <div className="border-2 border-black/10 rounded-md w-72 h-72 flex flex-col justify-end overflow-hidden">
      <div className="h-full w-full border-b-2 border-black/10 flex justify-center items-center">
        <img src={imageURL} className="h-52" />
      </div>
      <div className="p-2">
        <p className="text-base font-medium ">{title}</p>
        <p className="text-sm text-black/70">{creator}</p>
      </div>
    </div>
  );
};
export default Card;
