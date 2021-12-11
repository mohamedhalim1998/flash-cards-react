import { FC, useEffect, useState } from "react";
import { setTimeout } from "timers";
import Card from "../data/Card";
import TestStats from "./TestStats";
let reordered: number[] = [];

interface Stats {
  rightIndex: number;
  rightCount: number;
  wrongIndex: number;
  wrongCount: number;
}
const CardQuestion: FC<{ cards: Card[] }> = ({ cards }) => {
  const [reordered, setReordered] = useState<number[]>(
    shuffle(Array.from(Array(cards.length).keys()))
  );
  console.log(reordered);
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [stats, setStats] = useState<Stats>({
    rightIndex: -1,
    rightCount: 0,
    wrongIndex: -1,
    wrongCount: 0,
  });

  const [answers, setAnswers] = useState<number[]>([]);
  useEffect(() => {
    setAnswers(generateAnswers(reordered[currentCard], cards.length));
  }, [currentCard]);
  if (currentCard === cards.length) {
    return <TestStats right={stats.rightCount} wrong={stats.wrongCount} />;
  }
  return (
    <div>
      <div className="my-12">
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
                key={index}
                className="flex flex-row items-center p-2 justify-start container  text-gray-700 border-2 hover:border-gray-400 cursor-pointer rounded-md"
                onClick={(e) => {
                  let right = false;
                  if (num == reordered[currentCard]) {
                    setStats({
                      ...stats,
                      rightIndex: index,
                    });
                    right = true;
                  } else {
                    setStats({
                      ...stats,
                      wrongIndex: index,
                    });
                  }

                  setTimeout(() => {
                    console.log(stats);
                    const newStat = { ...stats };
                    newStat.rightIndex = -1;
                    newStat.wrongIndex = -1;
                    if (right) {
                      newStat.rightCount = newStat.rightCount + 1;
                    } else {
                      newStat.wrongCount = newStat.wrongCount + 1;
                    }
                    setStats(newStat);
                    setCurrentCard(currentCard + 1);
                  }, 1000);
                }}
              >
                {answerIcon(index, stats.rightIndex, stats.wrongIndex)}
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

function answerIcon(index: number, right: number, wrong: number) {
  if (right == index)
    return (
      <span className="fa-stack fa text-green-400">
        <i className="fa fa-circle-thin fa-stack-2x"></i>
        <i className="fa fa-check fa-stack-lg text-green-400"></i>{" "}
      </span>
    );
  if (wrong == index)
    return (
      <span className="fa-stack fa text-red-400">
        <i className="fa fa-circle-thin fa-stack-2x"></i>
        <i className="fa fa-times fa-stack-lg text-red-400"></i>{" "}
      </span>
    );

  return (
    <span className="fa-stack fa text-gray-400">
      <i className="fa fa-circle-thin fa-stack-2x"></i>
      <p className="font-bold">{index + 1}</p>
    </span>
  );
}
export default CardQuestion;
