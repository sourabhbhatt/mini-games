"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  initialBoard,
  boardDesign,
  calculateWinner,
  isDraw,
} from "./TicTacToeLogic";
import Ring from "./TicTacToeComponents/Ring";
import Cross from "./TicTacToeComponents/Cross";
import Confetti from "react-confetti";
import { Button } from "@nextui-org/button";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import generateAnonymousToken from "@/../server/helper/webSocketHelper";

const secret = process.env.NEXT_PUBLIC_JWT_SECRET || "test";

// const token = generateAnonymousToken({ secret });
const token = "";

const socket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}/tictactoe`, {
  auth: {
    token: token,
  },
}); // Replace with your server URL

const TicTacToeOnline = ({ playerName, gameRoomId, currentAction }) => {
  const [turn, setTurn] = useState(true);
  const [board, setBoard] = useState(initialBoard);
  const [winner, setWinner] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [playerJoined, setPlayerJoined] = useState(false);

  useEffect(() => {
    const handleGameUpdate = (data) => {
      setTurn(data.turn === socket.id);
      setBoard(data.board);
      setWinner(data.winner);
      setCurrentPlayer(data.currentPlayerName); // Assuming you have a state variable for the current player
    };

    socket.on("gameUpdate", handleGameUpdate);
    socket.on("connect_error", (error) => {
      console.log("Connection error:", error);

      // You can show an alert or update the UI to inform the user about the connection error
      // For example, you might display a message on the page or redirect the user to an error page
    });

    // Logic for handling socket events based on currentAction
    if (socket.connected) {
      if (currentAction === "create") {
        console.log("Creating room...");
        socket.emit("createRoom", { playerName, gameRoomId });
      } else if (currentAction === "join") {
        console.log("Joining room...");
        socket.emit("joinRoom", { playerName, gameRoomId });
        setRoomId(gameRoomId); // Update the room ID state
      }
    } else {
      toast.error("Socket is not connected, please try again!", {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: "Bounce",
      });
    }

    // Clean up the effect
    return () => {
      console.log("TicTacToeOnline component unmounted");
      socket.off("gameUpdate", handleGameUpdate);
      // Disconnect or perform any necessary cleanup
    };
  }, [playerName, gameRoomId, currentAction]);
  useEffect(() => {
    socket.on("playerJoined", (playerName) => {
      // Update the state to indicate that the player has joined the room
      setPlayerJoined(true);
      console.log(`${playerName} has joined the room`);
    });
    socket.on("roomError", (errorMessage) => {
      console.log(`Error: ${errorMessage}`);
      // Optionally, you can update your UI to inform the user about the error
      // For example, you could display an alert or update a status message on the page
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("playerJoined");
    };
  }, [socket]);

  useEffect(() => {
    if (winner) {
      setTimeout(() => {
        resetGame();
      }, 5000);
    }
  }, [winner]);

  const handleCellClick = (position) => {
    if (playerJoined) {
      if (winner || calculateWinner(board)) {
        console.log("Game is over");
        return;
      }
      console.log("cell clicked");
      if (turn && board[position].value === "" && !winner) {
        setBoard((prevBoard) => {
          const updatedBoard = [...prevBoard];
          updatedBoard[position].value = turn ? "O" : "X";
          return updatedBoard;
        });
        socket.emit("cellClick", { position, playerName, gameRoomId });
      }
    } else {
      console.log("Wait until player join");
    }
  };

  const resetGame = () => {
    setBoard([
      { position: 0, value: "" },
      { position: 1, value: "" },
      { position: 2, value: "" },
      { position: 3, value: "" },
      { position: 4, value: "" },
      { position: 5, value: "" },
      { position: 6, value: "" },
      { position: 7, value: "" },
      { position: 8, value: "" },
    ]);
    setWinner(null);
    setTurn(true);
    socket.emit("resetGame", { roomId: gameRoomId });
  };

  const renderGameStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (isDraw(board)) {
      return "It's a draw!";
    }
  };
  const isMyTurn = currentPlayer && currentPlayer === playerName;

  return (
    <>
      <div className={boardDesign.flex}>
        <div className={boardDesign.statusContainer}>
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-row w-full justify-between">
              <h2 className={boardDesign.statusText}>
                Room Id : {roomId || gameRoomId}
              </h2>
              <h1 className={boardDesign.statusText}>{renderGameStatus()}</h1>
            </div>
            <div className="flex flex-row w-full">
              {!renderGameStatus() ? (
                <h1 className="font-semibold text-2xl flex flex-row">
                  It&apos;s {isMyTurn ? "Your" : "Opponent's"} Turn :&nbsp;{" "}
                  <p
                    className={`${
                      isMyTurn ? "text-[#17C964]" : "text-[#F31260]"
                    }`}
                  >
                    {currentPlayer || "waiting.."}
                  </p>
                </h1>
              ) : (
                <Button color="danger" size="xs" onClick={resetGame}>
                  Reset Game
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className={boardDesign.gridContainer}>
          {board.map((item, i) => (
            <button
              onClick={() => handleCellClick(i)}
              key={i}
              className={`flex justify-center items-center w-full aspect-square transition-all ease-linear duration-300 ${
                isMyTurn
                  ? "border border-green-600 hover:bg-green-600/30"
                  : "border border-red-600 hover:bg-red-600/30"
              }`}
            >
              {item.value === "X" ? (
                <Cross className="scale-125" />
              ) : item.value === "O" ? (
                <Ring />
              ) : null}
            </button>
          ))}
        </div>
      </div>
      {winner && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={300}
        />
      )}
      <ToastContainer limit={1} />
    </>
  );
};

export default TicTacToeOnline;
