import React from "react";
import { useNavigate } from "react-router";
import { createCardSet, editCardSet } from "../store/CardSetsReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  getNoneEmptyCards,
  updateCardsError,
  updateTitleError,
} from "../store/SetFormReducer";
function CreateSetButton() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formData = useAppSelector((state) => state.cardSetForm);
  const validateForm = (): boolean => {
    if (formData.title === "") {
      dispatch(updateTitleError("YOU NEED TO ENTER A TITLE"));
      return false;
    } else {
      dispatch(updateTitleError(undefined));
    }
    if (getNoneEmptyCards()(formData).length < 2) {
      dispatch(updateCardsError("NEED AT LEAST TWO NON EMPTY CARDS"));
      console.log("card error");
      return false;
    } else {
      dispatch(updateCardsError(undefined));
    }
    return true;
  };
  return (
    <div className="text-right">
      <button
        type="submit"
        name="create"
        id="create"
        className="text-right p-5 px-10 bg-secondary hover:opacity-90 rounded-md text-white font-semibold"
        onClick={(e) => {
          e.preventDefault();
          const valid = validateForm();
          if (valid) {
            if (formData.setId) {
              dispatch(
                editCardSet(
                  formData.setId,
                  formData.title,
                  formData.description,
                  getNoneEmptyCards()(formData)
                )
              );
            } else {
              dispatch(
                createCardSet(
                  formData.title,
                  formData.description,
                  getNoneEmptyCards()(formData)
                )
              );
            }
            navigate("/cardset");
          }
        }}
      >
        Create
      </button>
    </div>
  );
}

export default CreateSetButton;
