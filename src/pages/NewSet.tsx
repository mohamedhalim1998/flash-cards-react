import { FC, useState } from "react";
import CardInput from "../components/CardInput";
import TextInput from "../components/TextInput";
import Card from "../data/Card";
import { createCardSet } from "../store/CardSetsReducer";
import { useAppDispatch } from "../store/hooks";

interface FormData {
  title: string;
  description: string;
  cards: Card[];
}
interface FormError {
  cardsError?: string;
  titleError?: string;
}

const NewSet: FC = () => {
  const [formdata, setFormData] = useState<FormData>({
    title: "",
    description: "",
    cards: [
      { front: "", back: "" },
      { front: "", back: "" },
    ],
  });
  const [formError, setFormError] = useState<FormError>({});
  const dispatch = useAppDispatch();
  const emptyCard = (card: Card): boolean =>
    (card.back != "" && card.front != "");

  const validateForm = (): boolean => {
    const data = { ...formError };
    if (formdata.title === "") {
      data.titleError = "YOU NEED TO ENTER A TITLE";
    } else {
      data.titleError = undefined;
    }
    if (formdata.cards.filter(emptyCard).length < 2) {
      data.cardsError = "NEED AT LEAST TWO NON EMPTY CARDS";
    } else {
      data.cardsError = undefined;
    }
    setFormError(data);
    return data.titleError == undefined && data.cardsError == undefined;
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-sans font-semibold text-left my-10 text-gray-700">
        Create a new Set
      </h1>
      <form action="" className="py-4">
        <TextInput
          label="TITLE"
          name="cardsetTitle"
          error={formError.titleError}
          hint="card set title"
          value={formdata.title}
          onChange={(e) => {
            const data: FormData = {
              title: formdata.title,
              description: formdata.description,
              cards: [...formdata.cards],
            };
            data.title = e.currentTarget.value;
            setFormData(data);
          }}
        />
        <TextInput
          label="DESCRIPTION"
          name="description"
          hint="card set description"
          value={formdata.description}
          onChange={(e) => {
            const data: FormData = {
              title: formdata.title,
              description: formdata.description,
              cards: [...formdata.cards],
            };
            data.description = e.currentTarget.value;
            setFormData(data);
          }}
        />
        <div>
          {formError.cardsError && (
            <div className="border-2 border-error text-error w-2/4 py-2 mx-auto">
              NEED AT LEAST TWO NON EMPTY CARDS
            </div>
          )}

          {formdata.cards.map((value, index) => (
            <CardInput
              key={index}
              num={index + 1}
              forntValue={value.front}
              backValue={value.back}
              frontOnChange={(e) => {
                const data: FormData = {
                  title: formdata.title,
                  description: formdata.description,
                  cards: [...formdata.cards],
                };
                data.cards[index].front = e.currentTarget.value;
                setFormData(data);
              }}
              backOnChange={(e) => {
                const data: FormData = {
                  title: formdata.title,
                  description: formdata.description,
                  cards: [...formdata.cards],
                };
                data.cards[index].back = e.currentTarget.value;
                setFormData(data);
              }}
            />
          ))}
        </div>
        <div className="text-center">
          <button
            type="submit"
            name="create"
            id="create"
            className="text-center text-gray-600 p-2 font-semibold border-b-4 border-secondary focus:outline-none hover:border-accent hover:text-accent"
            onClick={(e) => {
              e.preventDefault();
              const data: FormData = {
                title: formdata.title,
                description: formdata.description,
                cards: [...formdata.cards, { front: "", back: "" }],
              };
              console.log(data);
              setFormData(data);
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
              if (validateForm()) {
                dispatch(
                  createCardSet(
                    formdata.title,
                    formdata.description,
                    formdata.cards.filter(emptyCard)
                  )
                );
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
