import LOGO from "/src/assets/picture.png";
import { useState } from "react";

function Logo() {
  return (
    <>
      <section className="flex items-center justify-center gap-2 mr-5">
        <img className="h-12 w-14" src={LOGO} />
        <p className="hidden md:block font-bold text-xl opacity-90 text-gray-800 cursor-pointer">
          PicGallery
        </p>
      </section>
    </>
  );
}

export default Logo;
