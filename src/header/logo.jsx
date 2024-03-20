import { useState } from "react";

function Logo() {
  return (
    <>
      <section className="flex items-center justify-center gap-2 mr-5">
        <img className="h-12 w-14" src="./src/assets/picture.png" />
        <p className="hidden md:block font-bold text-xl opacity-90 text-gray-800 cursor-pointer">
          PicGallery
        </p>
      </section>
    </>
  );
}

export default Logo;
