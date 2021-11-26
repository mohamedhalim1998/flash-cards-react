import React, { FC } from "react";
import TextInput from "./TextInput";

interface CardInputParams {
  num: number;
  forntValue: string;
  frontOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  backValue: string;
  backOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CardInput: FC<CardInputParams> = (params: CardInputParams) => {
  console.log(params);
  return (
    <div className="card text-left p-4 my-4">
      <h3 className="font-semibold text-gray-600">{params.num}</h3>
      <div className="grid md:grid-cols-2 content-center pt-16 pb-8">
        <TextInput
          label="FRONT"
          name="CardFront"
          hint="Enter Card Front"
          value={params.forntValue}
          onChange={params.frontOnChange}
        />
        <TextInput
          label="BACK"
          name="CardBack"
          hint="Enter Card Back"
          value={params.backValue}
          onChange={params.backOnChange}
        />
      </div>
    </div>
  );
};

export default CardInput;
