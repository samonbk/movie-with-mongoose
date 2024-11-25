import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div className="error">
        <Link
          className="block absolute top-2/3 left-1/2 translate-y-1/2 -translate-x-1/2 bg-slate-500 rounded-md md:w-[120px] w-[100px] text-center py-1"
          to={"/"}
        >
          Back Home
        </Link>
      </div>
    </>
  );
};

export default Error;
