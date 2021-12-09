import { FC, useEffect, useState } from "react";
import { setTimeout } from "timers";
import Card from "../data/Card";
let reordered: number[] = [];
const CardQuestion: FC<{ cards: Card[] }> = ({ cards }) => {
  if (reordered.length == 0) {
    reordered = shuffle(Array.from(Array(cards.length).keys()));
  }
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [right, setRight] = useState<number>(-1);
  const [wrong, setWrong] = useState<number>(-1);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState<boolean>(false);
  useEffect(() => {
    setAnswers(generateAnswers(reordered[currentCard], cards.length));
    console.log("generated");
  }, [currentCard]);
  if (currentCard == cards.length) {
    return <p>done</p>;
  }
  return (
    <div>
      <div className="mt-12">
        <div className="w-3/5 mx-auto px-8 card">
          <h4 className="text-left text-gray-500 py-10 font-medium">Front</h4>
          <h3 className="text-left text-2xl text-gray-700 font-semibold pb-20">
            {cards[reordered[currentCard]].front}
          </h3>
          <h4 className="text-left text-gray-500 py-10 font-medium">
            Choose Right Answer
          </h4>
          <div className="grid grid-cols-2 px-2 gap-1">
            {answers.map((num, index) => (
              <div
                className="flex flex-row items-center p-2 justify-start container  text-gray-700 border-2 hover:border-gray-400 cursor-pointer rounded-md"
                onClick={(e) => {
                  if (num == reordered[currentCard]) {
                    setRight(index);
                  } else {
                    setWrong(index);
                  }
                  setTimeout(() => {
                    setCurrentCard(currentCard + 1);
                    setRight(-1);
                    setWrong(-1);
                  }, 1000);
                }}
              >
                {right == index && (
                  <span className="fa-stack fa text-green-400">
                    <i className="fa fa-circle-thin fa-stack-2x"></i>
                    <i className="fa fa-check fa-stack-lg text-green-400"></i>{" "}
                  </span>
                )}
                {wrong == index && (
                  <span className="fa-stack fa text-red-400">
                    <i className="fa fa-circle-thin fa-stack-2x"></i>
                    <i className="fa fa-times fa-stack-lg text-red-400"></i>{" "}
                  </span>
                )}
                {right !== index && wrong !== index && (
                  <span className="fa-stack fa text-gray-400">
                    <i className="fa fa-circle-thin fa-stack-2x"></i>
                    <p className="font-bold">{index + 1}</p>
                  </span>
                )}
                <h3 key={index} className="p-4 font-medium text-lg flex-grow">
                  {cards[num].back}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function generateAnswers(right: number, len: number): number[] {
  const array: number[] = [];
  array.push(right);
  while (array.length < Math.min(len, 4)) {
    const randomIndex: number = Math.floor(Math.random() * len * 10) % len;
    if (!array.includes(randomIndex)) {
      array.push(randomIndex);
    }
  }
  return shuffle(array);
}
export default CardQuestion;
