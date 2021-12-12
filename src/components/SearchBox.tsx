import React, { useState } from "react";
import { updateQuery } from "../store/CardSetsReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";

function SearchBox() {
  const query = useAppSelector((state) => state.cardSets.query);
  const dispatch = useAppDispatch();
  return (
    <form id="search-box" className="self-center">
      <div className="border border-solid rounded-xl p-2 bg-white">
        <input
          type="text"
          name="search"
          id="search"
          value={query}
          placeholder="search"
          onChange={(e) => {
            dispatch(updateQuery(e.currentTarget.value));
          }}
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
