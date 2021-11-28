import React from "react";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";

function NavBar() {
  return (
    <div className="bg-primary flex flex-row content-center justify-between px-8">
      <Link to="/cardset" className="font-bold text-2xl text-white text-left p-4 inline-block">
        Flash Cards
      </Link>
      <SearchBox />
      <Link
        to="/cardset/new"
        className="bg-secondary hover:opacity-90 self-center py-2 px-4 rounded-md m-0"
      >
        Create Set
      </Link>
    </div>
  );
}

export default NavBar;
