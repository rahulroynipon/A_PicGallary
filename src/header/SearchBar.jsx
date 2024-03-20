import React, { useState, useEffect, useCallback, useRef } from "react";
import useData from "../hook/useData";

function SearchBar(props) {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const [openSugg, setSugg] = useState(false);
  const AllData = useData(inputValue);
  const containerRef = useRef(null);
  const excludeRef = useRef(null); // Reference to the specific element to exclude from blur

  const suggTion = useCallback(() => {
    let allTag = AllData.flatMap((ele) =>
      ele.tags
        .split(",")
        .map((res) => res.trim())
        .filter((tt) => tt.startsWith(inputValue))
    );

    const suggestion = Array.from(new Set(allTag));
    setTags(suggestion);
  }, [inputValue, AllData]);

  useEffect(() => {
    suggTion();
  }, [inputValue, AllData]);

  const handleFocus = () => {
    setSugg(true);
  };

  const suggationDivHandler = (item) => {
    setInputValue(item);
    setSugg(false);
  };

  const handleSubmit = (submidata) => {
    props.setSearchData(submidata);
    setSugg(false);
    setInputValue("");
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
    setSugg(true);
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      handleSubmit(inputValue);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      // Check if the active element is the excluded element
      if (
        !containerRef.current.contains(document.activeElement) &&
        document.activeElement !== excludeRef.current
      ) {
        setSugg(false);
      }
    }, 0);
  };

  return (
    <div ref={containerRef}>
      <section className="relative w-full">
        <form
          className="flex border bg-stone-100"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(inputValue);
          }}
        >
          <input
            onInput={handleInput}
            onKeyUp={handleKeyUp}
            onFocus={handleFocus}
            value={inputValue}
            className="w-full px-3 outline-none font-semibold bg-transparent"
            type="search"
            placeholder="Search photo"
          />
          <button
            className="flex gap-2 item-center justify-center border py-2 px-6 bg-white hover:bg-slate-50 text-stone-600 hover:text-stone-800 transition-all"
            type="submit"
          >
            <img
              className="h-4 mt-1 opacity-60"
              src="./src/assets/search.svg"
              alt=""
            />
            <p className="font-bold opacity-80">Search</p>
          </button>
        </form>

        {openSugg && (
          <div className="absolute bg-white max-h-[400px] overflow-y-auto w-full border px-2 transition-all duration-200">
            {tags.map((item, index) => (
              <div
                key={index}
                onClick={() => suggationDivHandler(item)}
                className={`${index == 0 ? "mt-3" : "mt-0"} ${
                  index == tags.length - 1 ? "mb-3" : "mb-0"
                } cursor-pointer font-bold opacity-50 py-1 hover:opacity-70 hover:bg-slate-100 px-4 transition-all`}
                ref={excludeRef} // Assign the ref to the specific element
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default SearchBar;
