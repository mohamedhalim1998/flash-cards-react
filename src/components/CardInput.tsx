import { stat } from "fs";
import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deleteCard, updateCardBack, updateCardFront } from "../store/SetFormReducer";
import TextInput from "./TextInput";

const CardInput: FC<{ index: number }> = (params) => {
  const index = params.index;
  console.log(index);
  const front = useAppSelector((state) => state.cardSetForm.cards[index].front);
  const back = useAppSelector((state) => state.cardSetForm.cards[index].back);

  const dispatch = useAppDispatch();
  return (
    <div className="card text-left p-4 my-4">
      <div className="flex flex-row container text-gray-600 items-center justify-start">
        <h3 className="font-semibold ">{index + 1}</h3>
        <i
          className="fa fa-lg fa-trash inline-block justify-self-end ml-auto cursor-pointer"
          onClick={(e) => {
            dispatch(deleteCard(index));
          }}
        />
      </div>
      <div className="grid md:grid-cols-2 content-center pt-16 pb-8">
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
