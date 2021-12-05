import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateDescription, updateTitle } from "../store/SetFormReducer";
import TextInput from "./TextInput";

function CardSetHeader() {
  const title = useAppSelector((state) => state.cardSetForm.title);
  const description = useAppSelector((state) => state.cardSetForm.description);
  const titleError = useAppSelector((state) => state.cardSetForm.titleError);
  const dispatch = useAppDispatch();
  return (
    <div>
      <TextInput
        label="TITLE"
        name="cardsetTitle"
        error={titleError}
        hint="card set title"
        value={title}
        onChange={(e) => {
          dispatch(updateTitle(e.currentTarget.value));
        }}
      />
      <TextInput
        label="DESCRIPTION"
        name="description"
        hint="card set description"
        value={description}
        onChange={(e) => {
          dispatch(updateDescription(e.currentTarget.value));
        }}
      />
    </div>
  );
}

export default CardSetHeader;
