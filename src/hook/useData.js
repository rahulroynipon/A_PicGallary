import { useEffect, useState } from "react";

function useData(searchIMG = "nature") {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=37751582-2d5c45858694200b38b39ca6c&q=${searchIMG}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((res) => setData(res["hits"]))
      .catch((err) => {
        console.log(err);
      });
  }, [searchIMG]);

  return data;
}

export default useData;
