import React from "react";
import img from "../assets/Img/about-image.webp";
import { FaFacebook, FaTelegram, FaYoutube } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import image1 from "../assets/Img/skateboard.png";
import image2 from "../assets/Img/watching-tv.png";
import image3 from "../assets/Img/happy-watching.png";
import logo from "../assets/Img/logo.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <div className="max-w-[1220px] m-auto grid px-2">
        <section className="md:grid grid-cols-12 gap-8 md:mt-20 mt-10 flex flex-col-reverse">
          <div className="col-span-7 flex justify-center flex-col">
            <span>ABOUT US</span>
            <p className="mt-2 text-4xl font-medium max-w-[450px]">
              <span className="text-orange-400 font-medium">Moviesforkh</span>,
              launched in 2024, is a free movie streaming site developed by{" "}
              <span className="text-orange-400 font-medium">Samon</span>.
            </p>
            <p className="mt-6">
              The platform offers a vast collection of films across various
              genres, ensuring that movie enthusiasts can easily access and
              enjoy their favorite content without any cost. Designed with user
              experience in mind, Moviesforkh provides a seamless and enjoyable
              viewing experience, making it the go-to destination for free
              online streaming.
            </p>
            <Link
              to={"/"}
              className="bg-orange-400 rounded-md flex w-36 h-11 items-center justify-center mt-4 text-white"
            >
              Start Now
            </Link>
          </div>
          <div className="col-span-5 flex items-center md:px-0 px-14">
            <img src={img} alt="main-image" />
          </div>
        </section>
        <section className="mt-16 grid md:grid-cols-3 gap-6 grid-cols-1">
          <div className="">
            <div className="max-h-180px overflow-hidden">
              <div className="flex justify-center w-full">
                <img src={image1} alt="watching-tv" />
              </div>
              <h2 className="mt-4 text-2xl">It’s about time.</h2>
              <p className="mt-3">
                Time is our most precious, non-renewable resource. By helping
                people to handle the weekly tasks and to-dos, we are giving them
                the time and headspace to be their greatest selves.
              </p>
            </div>
          </div>
          <div className="">
            <div className="max-h-180px overflow-hidden">
              <div className="flex justify-center w-full">
                <img src={image2} alt="watching-tv" />
              </div>
              <h2 className="mt-4 text-2xl">It’s about film.</h2>
              <p className="mt-3">
                Time is our most precious, non-renewable resource. By helping
                people to handle the weekly tasks and to-dos, we are giving them
                the time and headspace to be their greatest selves.
              </p>
            </div>
          </div>
          <div className="">
            <div className="max-h-180px overflow-hidden">
              <div className="flex justify-center w-full">
                <img src={image3} alt="watching-tv" />
              </div>
              <h2 className="mt-4 text-2xl">It’s about ahppinese.</h2>
              <p className="mt-3">
                Time is our most precious, non-renewable resource. By helping
                people to handle the weekly tasks and to-dos, we are giving them
                the time and headspace to be their greatest selves.
              </p>
            </div>
          </div>
        </section>
        <section className="flex justify-center mt-16">
          <div className="md:max-w-64 max-w-[70%]">
            <img src={logo} alt="logo" />
          </div>
        </section>
        <section className=" flex justify-center">
          <div className="mt-16 flex flex-col items-center">
            <span>CONTACT & FOLLOW US</span>
            <div className="flex gap-2 text-3xl mt-4">
              <span className="hover:text-orange-400 transition">
                <FaFacebook />
              </span>
              <span className="hover:text-orange-400 transition">
                <FaTelegram />
              </span>
              <span className="hover:text-orange-400 transition">
                <FiInstagram />
              </span>
              <span className="w-8 h-8 border-2 rounded-full text-2xl flex justify-center items-center hover:text-orange-400 transition hover:border-orange-400">
                <FaYoutube />
              </span>
            </div>
            <div className="mt-4">
              <span>Email: samonee7777@gmail.com</span>
            </div>
            <div className="mt-3">
              <span>Phone: +85511339845</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
