/* eslint-disable react/prop-types */
import { Divider } from "@mui/material";
import "./Megamenu.css"
import { GoDash } from "react-icons/go";
import { links } from "../../constant";
import { Link } from "react-router-dom";

const Megamenu = ({title ,icon}) => {
  return (
    <div className="dropdown ">
      <button className="dropbtn">
        <p className="uppercase font-semibold">{title}</p>
        <span className="icon-1"> {icon}</span>
        <span className="hidden icon-2">
          <GoDash />
        </span>
      </button>
      <div className="dropdown-content">
        <div className="header h-12 bg-transparent pt-4 bg-blue-100"></div>
        <div className="h-[23rem] flex justify-around ">
          {/* section-1 */}
          <div className="w-[20rem]  h-full flex flex-col gap-6 p-2  items-start justify-start ">
            <h1 className=" font-extrabold text-4xl  w-full">
              Fitness Equipment Built to Perfection
            </h1>
            <p className="font-medium capitalize">
              Adding fuel to every fitness fanatics passion with the best
              equipment in India.
            </p>
            <Link to="/product">
              <div className="p-2 bg-slate-900 px-2 shadow-md py-2 text-white text-xl">
                Shop All Fitness Products
              </div>
            </Link>
          </div>
          {/* section-1 end */}
          <Divider orientation="vertical" variant="middle" flexItem />
          {/* section-2 */}
          <div className="w-[25rem]">
            <ul className="overflow-y-scroll max-h-[20rem] no-scrollbar">
              {links.map((item) => (
                <Link
                  to={`/product-category${item.route}`}
                  key={item.Head}
                  className="p-2  duration-300 underline-offset-8 flex flex-col  gap-1"
                >
                  {/* <GoDash className="text-indigo-500 font-bold" /> */}
                  <li className="">
                    {item.name}
                  </li>
                  {/* {item.submenu &&
                    item.sublink.map((sublink) => (
                      <ul
                        className=" flex flex-col gap-2 justify-start  font-medium hover:underline-none items-start"
                        key={sublink.label}
                      >
                        <Link to={sublink.route} className="flex">
                          <GoDash />
                          <li
                            className="hover:underline-none hover:font-bold hover:pl-2 duration-300"
                            key={sublink.key}
                          >
                            {sublink.label}
                          </li>
                        </Link>
                      </ul>
                    ))} */}
                </Link>
              ))}
            </ul>
          </div>
          {/* section-2 end */}

          <div className=" flex flex-col w-[35rem] pr-2  items-start gap-2 justify-start  ">
            <h1 className="">FEATURED</h1>
            <div className=" flex items-start h-full gap-2">
              <div className="flex flex-col gap-2 overflow-hidden">
                <img
                  src="https://kfsfitness.com/wp-content/uploads/2022/03/blog11.jpg"
                  alt=""
                  className="hover:scale-105 duration-300"
                />
                <span className="font-thin tracking-wider">
                  Competition Kit Bell
                </span>
              </div>
              <div className="flex flex-col gap-2 overflow-hidden ">
                <img
                  src="https://kfsfitness.com/wp-content/uploads/2022/03/blog15.jpg"
                  alt=""
                  className="hover:scale-105 duration-300"
                />
                <span className="font-thin tracking-widest">
                  {"'8'"}
                  {"'8'"} LIFTING PLATFORM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Megamenu