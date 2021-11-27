import { FC, useState } from "react";
import CardInput from "../components/CardInput";
import TextInput from "../components/TextInput";
import Card from "../data/Card";
import { createCardSet } from "../store/CardSetsReducer";
import { useAppDispatch } from "../store/hooks";

interface FormData {
  title: string;
  cards: Card[];
}

const NewSet: FC = () => {
  const [formdata, setFormData] = useState<FormData>({
    title: "",
    cards: [{ front: "f", back: "b" }],
  });
  const dispatch = useAppDispatch();

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-sans font-semibold text-left my-10 text-gray-700">
        Create a new Set
      </h1>
      <form action="" className="py-4">
        <TextInput
          label="TITLE"
          name="cardsetTitle"
          hint="card set title"
          value={formdata.title}
          onChange={(e) => {
            const data: FormData = {
              title: formdata.title,
              cards: [...formdata.cards],
            };
            data.title = e.currentTarget.value;
            setFormData(data);
          }}
        />
        {formdata.cards.map((value, index) => (
          // console.log(value);
          // <h1 key={index}>
          //   {index} {value}
          // </h1>;
          <CardInput
            key={index}
            num={index + 1}
            forntValue={value.front}
            backValue={value.back}
            frontOnChange={(e) => {
              const data: FormData = {
                title: formdata.title,
                cards: [...formdata.cards],
              };
              data.cards[index].front = e.currentTarget.value;
              setFormData(data);
            }}
            backOnChange={(e) => {
              const data: FormData = {
                title: formdata.title,
                cards: [...formdata.cards],
              };
              data.cards[index].back = e.currentTarget.value;
              setFormData(data);
            }}
          />
        ))}

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
              dispatch(createCardSet(formdata.title, formdata.cards));
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
