import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import CardSetCard from "../components/CardSet";
import { loadCardSets } from "../store/CardSetsReducer";

function Home() {
  const cardsets = useAppSelector((state) => state.cardSets.sets);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadCardSets());
  }, []);
  return (
    <div className="container grid md:grid-cols-3 gap-4 pt-8 mx-auto px-8">
      {cardsets.map((cardset) => (
        <CardSetCard
          key={cardset.id}
          id={cardset.id}
          description={cardset.description}
          name={cardset.name}
          count={cardset.count}
        />
      ))}
    </div>
  );
}

export default Home;
