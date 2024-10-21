"use client";

import { Provider } from "react-redux";
import GameBoard from "./components/GameBoard";
import { store } from "./redux/store";

const GamePage = () => {
  return (
    <Provider store={store}>
      <GameBoard />
    </Provider>
  );
};

export default GamePage;
