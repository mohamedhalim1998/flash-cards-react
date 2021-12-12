import { stat } from "fs";
import React, { FC } from "react";
import { cardColors } from "../data/Card";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  deleteCard,
  updateCardBack,
  updateCardColor,
  updateCardFront,
} from "../store/SetFormReducer";
import TextInput from "./TextInput";

const CardInput: FC<{ index: number }> = (params) => {
  const index = params.index;
  console.log(index);
  const front = useAppSelector((state) => state.cardSetForm.cards[index].front);
  const back = useAppSelector((state) => state.cardSetForm.cards[index].back);
  let color = useAppSelector((state) => state.cardSetForm.cards[index].color);
  color = color ? color : cardColors[0];

  const dispatch = useAppDispatch();
  return (
    <div className="card text-left p-4 my-4" style={{ backgroundColor: color }}>
      <div className="flex flex-row container text-gray-600 items-center justify-start">
        <h3 className="font-semibold ">{index + 1}</h3>
        <i
          className="fa fa-lg fa-trash inline-block justify-self-end ml-auto cursor-pointer"
          onClick={(e) => {
            dispatch(deleteCard(index));
          }}
        />
      </div>
      <div className="flex flex-row container items-center justify-evenly w-2/4 mx-auto">
        {cardColors.map((c, i) => (
          <div
            key={i}
            className="rounded-full h-10 w-10 flex flex-row items-center justify-center border-2 border-gray-400 cursor-pointer"
            style={{ background: c }}
            onClick={(e) => dispatch(updateCardColor({ index, value: c }))}
          >
            {c == color && <i className="fa fa-check text-gray-500"></i>}
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 content-center pt-8 b-8">
        <TextInput
          label="FRONT"
          name="CardFront"
          hint="Enter Card Front"
          value={front}
          onChange={(e) => {
            dispatch(
              updateCardFront({ index: index, value: e.currentTarget.value })
            );
          }}
        />
        <TextInput
          label="BACK"
          name="CardBack"
          hint="Enter Card Back"
          value={back}
          onChange={(e) => {
            dispatch(
              updateCardBack({ index: index, value: e.currentTarget.value })
            );
          }}
        />
      </div>
    </div>
  );
};

export default CardInput;
