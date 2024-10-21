// import LoggedLayout from "@/app/components/ui/LoggedLayout";
import dynamic from "next/dynamic";
import HangmanGame from "./HangmanComponents/Hangman";

// const HangmanGame = dynamic(
//   //   () => import("@/app/components/games/hangman/Hangman"),
//   () => import("@/app/hangman/HangmanComponents/Hangman"),
//   { ssr: false }
// );

export default function Hangman() {
  return (
    <div className="text-center m-auto">
      <h1 className="font-blomberg text-8xl">Hangman</h1>
      <div className="py-4">
        Play Hangman to test your vocabulary by guessing letters one at a time
        to solve the word puzzle.{" "}
      </div>
      <HangmanGame />
    </div>
  );
}
