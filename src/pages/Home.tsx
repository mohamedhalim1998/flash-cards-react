import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import CardSetCard from "../components/CardSet";
import { filterSets, loadCardSets } from "../store/CardSetsReducer";
import NavBar from "../components/NavBar";

function Home() {
  const cardsets = useAppSelector((state) => state.cardSets.sets);
  const query = useAppSelector((state) => state.cardSets.query);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadCardSets());
  }, []);
  return (
    <div>
      <NavBar />
      <div className="container grid md:grid-cols-3 gap-4 pt-8 mx-auto px-8">
        {filterSets(cardsets, query).map((cardset) => (
          <CardSetCard
            key={cardset.id}
            id={cardset.id}
            description={cardset.description}
            name={cardset.name}
            count={cardset.count}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
