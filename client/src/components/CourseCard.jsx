import React from "react";

const CourseCard = ({
  imageURL,
  title,
  price,
  description,
  creator,
  buttonHandler = "",
  isBought,
}) => {
  return (
    <div className="border-2 border-black/10 rounded-md w-72 h-72 flex flex-col justify-end overflow-hidden">
      <div className="h-full w-full border-b-2 bg-slate-200 border-black/10 flex justify-center items-center">
        <img src="/thumbnail.svg" alt="thumbnail" className="h-36 w-full" />
      </div>
      <div className="p-2">
        <div className="flex justify-between">
          <p className="text-base font-medium w-3/4 truncate">{title}</p>
          <p className="text-base">{price}</p>
        </div>
        <p className="text-sm text-black/70 truncate">{description}</p>
        <p className="text-sm text-black/70 truncate">{creator}</p>
      </div>
      {buttonHandler && (
        <button
          className="bg-primary hover:bg-primary-dark text-white p-2 text-center"
          onClick={() => buttonHandler()}
        >
          {isBought ? "Edit" : "Purchase"}
        </button>
      )}
    </div>
  );
};
export default CourseCard;
