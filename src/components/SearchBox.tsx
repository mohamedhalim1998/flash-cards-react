import React, { useState } from "react";

function SearchBox() {
  return (
    <form id="search-box" className="self-center">
      <div className="border border-solid rounded-xl p-2 bg-white">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="search"
          className="inline-block focus:outline-none border-none"
        ></input>
        <span>
          <i className="fa fa-search"></i>
        </span>
      </div>
    </form>
  );
}

export default SearchBox;
