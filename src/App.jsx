// App.js
import { useState } from "react";
import Photo from "./AllPhoto/Photo";
import Header from "./header/Header";

function App() {
  const [searchData, setSearchData] = useState("nature");

  return (
    <main>
      <Header setSearchData={setSearchData} />
      <Photo searchData={searchData} />
    </main>
  );
}

export default App;
