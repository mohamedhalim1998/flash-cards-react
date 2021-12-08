import React, { useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import NewSet from "./pages/NewSet";
import Cards from "./pages/Cards";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { loadCardSets, updateLoading } from "./store/CardSetsReducer";
import { TwinSpin } from "react-cssfx-loading/lib";

function App() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.cardSets.loading);
  useEffect(() => {
    dispatch(updateLoading(true));
    dispatch(loadCardSets());
    setTimeout(() => {
      dispatch(updateLoading(false));
    }, 1000);
  }, []);
  if (loading) {
    return (
      <div className="flex flex-row justify-center items-center h-screen container text-center mx-auto">
        <TwinSpin />
      </div>
    );
  }
  return (
    <div className="App bg-gray-100">
      <Routes>
        <Route path="/cardset/edit/:id" element={<NewSet />} />
        <Route path="/cardset/new" element={<NewSet />} />
        <Route path="/cardset/:id" element={<Cards />} />
        <Route path="/cardset" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
