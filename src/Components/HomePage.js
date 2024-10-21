import GameCard from "./GameCard";
import { useTheme } from "next-themes";

const HomePage = () => {
  const { theme } = useTheme();

  return (
    <div className="flex justify-between items-center flex-col w-full h-screen gap-6">
      <h1
        className={`font-black px-4 uppercase text-center text-5xl md:text-6xl lg:text-8xl xl:text-9xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b ${
          theme === "light" ? "from-black to-white" : "from-white to-black"
        } opacity-60`}
      >
        Game Zone
      </h1>
      <div className="flex flex-col sm:flex-row w-full justify-center items-center sm:items-start gap-4 px-6 h-full">
        <GameCard
          subtitle={"1 v 1"}
          title={"Tic Tac Toe"}
          gameTitle={"Tic Tac Toe"}
          screenToNavigate={"tictactoe"}
          thumbnail={"/tic-tac-toe.jpg"}
        />
        <GameCard
          subtitle={"Solo"}
          title={"Typing Test"}
          gameTitle={"Typing Test"}
          screenToNavigate={"typingTest"}
          thumbnail={"/typing.jpg"}
        />
        {/* <GameCard
          subtitle={"Hang man game"}
          title={"HangMan"}
          gameTitle={"HangMan"}
          screenToNavigate={"hangman"}
          thumbnail={"/TypeTest/TypeTestGif.gif"}
        /> */}
        <GameCard
          subtitle={"memory game"}
          title={"Memory Game"}
          gameTitle={"Memory Game"}
          screenToNavigate={"memoryGame"}
          thumbnail={"/cube.png"}
        />
        <GameCard
          subtitle={"Mine game"}
          title={"Mine Game"}
          gameTitle={"Mine Game"}
          screenToNavigate={"mineGame"}
          thumbnail={"/mineGame.jpeg"}
        />
        {/* <GameCard
          subtitle={"Dehla-Pakad"}
          title={"Dehla-Pakad"}
          gameTitle={"Dehla-Pakad"}
          screenToNavigate={"Dehla-Pakad"}
          thumbnail={"/TypeTest/TypeTestGif.gif"}
        /> */}
        <GameCard
          subtitle={"Dehla-Pakad"}
          title={"Dehla-Pakad"}
          gameTitle={"Dehla-Pakad"}
          screenToNavigate={"dehla-pakad"}
          thumbnail={"/playingcards.png"}
        />
      </div>
    </div>
  );
};

export default HomePage;
