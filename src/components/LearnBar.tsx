import React, { FC } from "react";
import { Link } from "react-router-dom";

const LearnBar: FC<{ setTitle: string }> = (params) => {

  return (
    <div className="flex flex-row content-center justify-center relative shadow-md bg-white px-12">
      <Link
        to="/cardset"
        className="font-bold text-primary text-2xl text-left p-4 inline-block mr-auto "
      >
        Flash Cards
      </Link>
      <h2 className="justify-self-center self-center mr-auto absolute text-2xl  font-bold font-mono">
        {params.setTitle}
      </h2>
    </div>
  );
};

export default LearnBar;
