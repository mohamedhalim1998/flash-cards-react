import { current } from "@reduxjs/toolkit";
import React from "react";

interface CardsNavigationParam {
  onNext: () => void;
  onBack: () => void;
  current: number;
  size: number;
}

function CardsNavigation(params: CardsNavigationParam) {
  return (
    <div className="w-1/3 flex flex-row content-center justify-evenly mx-auto text-gray-600 pt-4">
      <button
        className="disabled:opacity-40"
        onClick={(e) => params.onBack()}
        disabled={params.current === 1}
      >
        <i className="fa fa-arrow-left" />
      </button>
      <h2>{`${params.current} / ${params.size}`}</h2>
      <button
        className="disabled:opacity-40"
        onClick={(e) => params.onNext()}
        disabled={params.current === params.size}
      >
        <i className="fa fa-arrow-right" />
      </button>
    </div>
  );
}

export default CardsNavigation;
