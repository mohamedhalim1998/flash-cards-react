import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import DraggableCardList from "../components/DraggableCardList";
import CardSetHeader from "../components/CardSetHeader";
import {
  addNewCard,
  fillCards,
  getNoneEmptyCards,
  resetForm,
  updateCardsError,
  updateDescription,
  updateSetId,
  updateTitle,
  updateTitleError,
} from "../store/SetFormReducer";
import {
  createCardSet,
  editCardSet,
  getSetById,
} from "../store/CardSetsReducer";
import { TwinSpin } from "react-cssfx-loading/lib";

const NewSet: FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const state = useAppSelector((state) => state);
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
  useEffect(() => {
    if (params.id) {
      const setId = parseInt(params.id!);
      const cardSet = getSetById(setId)(state);
      if (cardSet) {
        dispatch(updateSetId(cardSet.id));
        dispatch(updateTitle(cardSet.name));
        dispatch(updateDescription(cardSet.description));
        dispatch(fillCards(setId));
      }
    }
    return () => {
      dispatch(resetForm());
    };
  }, [dispatch]);
  console.log(formData.cards);
  if (formData.setId && formData.cards.length === 0) {
    console.log("loading");
    return (
      <div className="flex flex-row justify-center items-center h-screen container text-center mx-auto">
        <TwinSpin />
      </div>
    );
  }
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
              console.log("add card");
              dispatch(addNewCard());
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
      </form>
    </div>
  );
};

export default NewSet;
