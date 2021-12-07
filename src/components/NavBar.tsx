import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { resetForm } from "../store/SetFormReducer";
import SearchBox from "./SearchBox";

function NavBar() {
  const navigate = useNavigate();
  const distpatch = useAppDispatch();
  return (
    <div className="bg-primary flex flex-row content-center justify-between px-8">
      <Link
        to="/cardset"
        className="font-bold text-2xl text-white text-left p-4 inline-block"
      >
        Flash Cards
      </Link>
      <SearchBox />
      <div
        className="bg-secondary hover:opacity-90 self-center py-2 px-4 rounded-md m-0 cursor-pointer"
        onClick={(e) => {
          distpatch(resetForm());
          navigate("/cardset/new");
        }}
      >
        Create Set
      </div>
    </div>
  );
}

export default NavBar;
