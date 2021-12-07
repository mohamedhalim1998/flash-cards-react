import React from "react";
import { useAppDispatch } from "../store/hooks";
import { addNewCard } from "../store/SetFormReducer";

function AddCardButton() {
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="text-center">
        <button
          type="submit"
          name="create"
          id="create"
          className="text-center text-gray-600 p-2 font-semibold border-b-4 border-secondary focus:outline-none hover:border-accent hover:text-accent"
          onClick={(e) => {
            e.preventDefault();
            console.log("add card");
            dispatch(addNewCard());
          }}
        >
          + ADD CARD
        </button>
      </div>
    </div>
  );
}

export default AddCardButton;
