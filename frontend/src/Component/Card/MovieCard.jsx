import React from "react";
import { BsStarFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { MdHeight } from "react-icons/md";
import { Link } from "react-router-dom";

function MovieCard(props) {
  const { img, name, rate, release, hight } = props;
  return (
    <>
      <Link
        to={`/movie/playpage/${name}`}
        className={`block relative w-full group movieLink`}
        style={{
          height: `${hight}px`,
          background: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="h-full w-full overflow-hidden">
          {/* <img className="w-full" src={img} alt={name} /> */}
        </div>
        <div className="my-linear absolute w-full h-full top-0 left-0 flex flex-col justify-end p-3 text-sm">
          <span className="mt-2 block font-bold text-lg leading-5">{name}</span>
          <span className="mt-1 flex items-center text-white gap-1">
            <span className="text-xl text-orange-400">
              <BsStarFill />
            </span>
            <span className="font-bold">{rate}/10</span>
          </span>
          <span className="mt-1 block">{release}</span>
          <div className="cursor-pointer px-3 py-2 mt-3 flex gap-3 items-center w-full bg-slate-600 rounded-md text-white justify-center">
            <span>
              <FaPlay />
            </span>{" "}
            Watch Now
          </div>
        </div>
      </Link>
    </>
  );
}

export default MovieCard;
