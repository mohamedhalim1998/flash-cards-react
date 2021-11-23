import React from "react";
import SearchBox from "./SearchBox";

function NavBar() {
  return (
    <div className="bg-primary flex flex-row content-center justify-between px-8">
      <h3 className="font-bold text-2xl text-white text-left p-4 inline-block">
        Flash Cards
      </h3>
      <SearchBox />
      <h4 className="inline-block bg-secondary self-center py-2 px-4 rounded-md">
        Create Set
      </h4>
    </div>
  );
}

export default NavBar;
