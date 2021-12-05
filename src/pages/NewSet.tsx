import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import DraggableCardList from "../components/DraggableCardList";
import CardSetHeader from "../components/CardSetHeader";
import {
  addCard,
  getNoneEmptyCards,
  validateForm,
} from "../store/SetFormReducer";
import { createCardSet } from "../store/CardSetsReducer";

const NewSet: FC = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const formData = useAppSelector((state) => state.cardSetForm);
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-sans font-semibold text-left my-10 text-gray-700">
        Create a new Set
      </h1>
      <form action="" className="py-4">
        <CardSetHeader />
        <DraggableCardList />

        <div className="text-center">
          <button
            type="submit"
            name="create"
            id="create"
            className="text-center text-gray-600 p-2 font-semibold border-b-4 border-secondary focus:outline-none hover:border-accent hover:text-accent"
            onClick={(e) => {
              e.preventDefault();
              dispatch(addCard());
            }}
          >
            + ADD CARD
          </button>
        </div>

        <div className="text-right">
          <button
            type="submit"
            name="create"
            id="create"
            className="text-right p-5 px-10 bg-secondary hover:opacity-90 rounded-md text-white font-semibold"
            onClick={(e) => {
              e.preventDefault();
              dispatch(validateForm());
              if (formData.validForm) {
                dispatch(
                  createCardSet(
                    formData.title,
                    formData.description,
                    getNoneEmptyCards()(formData)
                  )
                );
                navigate("/cardset");
              }
            }}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewSet;
