import React, { useEffect } from "react";
import { loadCardSets } from "../store/CardSetsReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import CardSetCard from "../components/CardSet";

function Home() {
  const dispatch = useAppDispatch();
  const cardsets = useAppSelector((state) => state.cardSets.sets);
  useEffect(() => {
    dispatch(loadCardSets());
  }, []);
  return (
    <div className="container grid md:grid-cols-3 gap-4 pt-8 mx-8">
      {cardsets.map((cardset) => (
        <CardSetCard
          key={cardset.id}
          id={cardset.id}
          name={cardset.name}
          count={cardset.count}
        />
      ))}
    </div>
  );
}

export default Home;
