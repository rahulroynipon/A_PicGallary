import React from "react";
import DownLoadIMG from "../assets/download-minimalistic-svgrepo-com.svg"; // Adjust the import path
import { useState, useCallback, useEffect } from "react";
import useData from "../hook/useData";

function Photo(props) {
  const AllData = useData(props.searchData);

  const downloadImage = (dLink) => {
    const link = document.createElement("a");
    link.href = dLink;
    link.download = "image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const titleClickHandler = (info) => {
    props.setSearchData(info);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <h1 className="mt-20 md:mx-6 py-3 col-span-2 md:col-span-3 font-semibold text-4xl px-5 mb-5 text-gray-700 capitalize">
        {props.searchData} Photos
      </h1>
      <section
        className="mx-5 md:mx-12 mb-10 grid grid-cols-2 md:grid-cols-3
       grid-flow-dense gap-5 transition-all duration-300"
      >
        {AllData.length !== 0 ? (
          AllData.map((item, index) => (
            <section key={index} className="relative group rounded">
              <img
                className="object-cover rounded h-full w-full"
                loading="lazy"
                src={item.webformatURL}
                alt=""
              />

              <div className="backdrop-blur rounded opacity-0 group-hover:opacity-40 bg-gray-950 absolute inset-0 transition-all duration-500"></div>

              <div>
                <h1
                  onClick={() => {
                    titleClickHandler(item.tags.split(",")[0]);
                  }}
                  className="absolute cursor-pointer top-2 md:top-4  left-5 text-xl opacity-0 group-hover:opacity-100 text-white transition-all duration-500"
                >
                  {item.tags.split(",")[0]}
                </h1>

                <button
                  onClick={() => {
                    downloadImage(item.previewURL);
                  }}
                  className="absolute z-30 bottom-2 right-2 px-2 py-1 bg-slate-300 opacity-0 group-hover:opacity-100 group-hover:bg-white md:bottom-4 md:right-4 rounded-full md:px-3 md:py-2 md:rounded md:bg-stone-300 md:hover:bg-white transition-all duration-500"
                >
                  <img
                    className="h-4 md:h-6 md:block"
                    src={DownLoadIMG}
                    alt="Download"
                  />
                </button>
              </div>
            </section>
          ))
        ) : (
          <div className="text-4xl font-semibold text-center text-gray-700 absolute top-[40%] left-[15%] md:left-[40%]">
            No photo found
          </div>
        )}
      </section>
    </>
  );
}

export default Photo;
