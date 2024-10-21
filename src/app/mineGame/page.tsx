"use client";
import Image from "next/image";
import { cn } from "../../lib/utils";
import { useLayoutEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../UI/dialog";

import { Popover, PopoverContent, PopoverTrigger } from "../../UI/popover";

import { sendGAEvent } from "@next/third-parties/google";

import { Settings } from "../mineGame/MineGameComponents/settings";

const SIZES = [
  { value: "2", label: "Two (2 X 2)" },
  { value: "3", label: "Three (3 X 3)" },
  { value: "4", label: "Four (4 X 4)" },
  { value: "5", label: "Five (5 X 5)" },
];
export type ConfigType = {
  fieldSizes: Array<{ value: string; label: string }>;
  size: number;
  volume: number[];
  fields: Array<{
    isOpen: boolean;
    isMine: boolean;
    isFlag: boolean;
    answerByUser: boolean;
  }>;
};
const defaultConfig: ConfigType = {
  fieldSizes: SIZES,
  size: 4,
  volume: [50],
  fields: Array.from({ length: 4 * 4 }).map(() => ({
    isOpen: false,
    isMine: false,
    isFlag: false,
    answerByUser: false,
  })),
};
export default function Home() {
  const [config, setConfig] = useState<ConfigType>(defaultConfig);
  const [gameOver, setGameOver] = useState(false);
  const [isGameWin, setIsGameWin] = useState(false);

  const sound = config.volume[0] > 0;
  /**
   * The fields state is an array of objects that represent the game fields.
   * Each field object has the following properties:
   * 1. isOpen: A boolean that indicates whether the field is open or not
   * 2. isMine: A boolean that indicates whether the field is a mine or not
   * 3. isFlag: A boolean that indicates whether the field is flagged or not
   * 4. answerByUser: A boolean that indicates whether the field is answered by the user or not
   */

  function gameWin(
    fields: Array<{ isOpen: boolean; isMine: boolean; isFlag: boolean }>
  ) {
    const flags = fields.filter(
      (field) => field.isOpen && !field.isMine && field.isFlag
    );
    if (flags.length !== config.size) return;

    if (fields.every((field) => field.isOpen || field.isMine)) {
      if (sound) {
        const WinSound = new Audio("./win.wav");
        WinSound.volume = config.volume[0] / 100;
        WinSound.play();
      }
      setIsGameWin(true);
    }
  }

  /**
   *
   * @param index
   * @returns
   * 1. If the game is over, return immediately
   * 2. Create a new array of fields
   * 3. Set the field at the index to open and answered by the user
   * 4. If the field is a mine, set the game over state to true, set all fields to open, and return
   * 5. Set the fields with the new fields
   * 6. If all fields are open or all fields are mines, set the game clear state to true
   *
   */
  const handleClicked = (index: number, fieldType: "diamond" | "flag") => {
    if (gameOver) return;

    const newFields = [...config.fields];
    newFields[index].isOpen = true;
    if (newFields[index].answerByUser) {
      return;
    }
    newFields[index].answerByUser = true;
    if (fieldType === "flag") {
      newFields[index].isFlag = true;
      newFields[index].isMine = false;
      setConfig((prev) => ({
        ...prev,
        fields: newFields,
      }));
      gameWin(newFields);
      return;
    }
    // check if the field is a mine or not
    /**
     * If the field is a mine, the game is over.
     * 1. Set the game over state to true
     * 2. Set all fields to open
     * 3. Return
     */
    if (newFields[index].isMine) {
      if (sound) {
        const explosion = new Audio("./explosion.mpeg");
        explosion.volume = config.volume[0] / 100;
        explosion.play();
      }
      // set timeout for the sound
      setTimeout(() => {
        if (sound) {
          const gameOverSound = new Audio("./game-over.wav");
          gameOverSound.volume = config.volume[0] / 100;
          gameOverSound.play();
        }
      }, 1000);

      setGameOver(true);
      setConfig((prev) => ({
        ...prev,
        fields: newFields.map((field) => ({
          ...field,
          isOpen: true,
        })),
      }));
      return;
    }

    if (sound) {
      const ClickSound = new Audio("./click.wav");
      ClickSound.volume = config.volume[0] / 100;
      ClickSound.play();
    }
    setConfig((prev) => ({
      ...prev,
      fields: newFields,
    }));

    gameWin(newFields);
  };

  /**
   * The init function is responsible for initializing the game.
   * 1. Create a set of mines
   * 2. Add random numbers to the set until the set size is equal to the number of fields in the game
   * 3. Set the fields with the mines in the random positions created in step 2
   * 4. Mine are equal to the number of fields in the game
   * @example
   * size = 4
   * mines = [1, 3, 5, 7]
   */

  const init = () => {
    setGameOver(false);
    setIsGameWin(false);
    const mines = new Set<number>();

    while (mines.size < config.size) {
      mines.add(Math.floor(Math.random() * (config.size * config.size)));
    }

    setConfig((prev) => ({
      ...prev,
      fields: prev.fields.map((field, index) => ({
        ...field,
        isMine: mines.has(index),
      })),
    }));
  };

  useLayoutEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex  flex-col items-center gap-10 sm:p-16 p-4">
      <div className="w-full flex flex-col items-center gap-4">
        <div className="flex  items-center ">
          <h1 className="text-4xl font-bold text-center">Mine</h1>
          <Settings
            config={config}
            setConfig={setConfig}
            defaultConfig={defaultConfig}
            init={init}
          />
        </div>
        <p className="text-center">Find diamond</p>
      </div>

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${config.size}, 1fr)`,
        }}
      >
        {config.fields.map((field, index) => (
          <Popover key={index}>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "w-16 h-16 sm:w-24 sm:h-24 bg-gray-200 flex items-center justify-center rounded-md",
                  field.isOpen && field.answerByUser && "bg-green-500/20",
                  field.isOpen && field.isMine && "bg-red-500/20",
                  field.isOpen && field.isFlag && "bg-yellow-500/20",
                  (gameOver || isGameWin) && "cursor-not-allowed"
                )}
              >
                {field.isOpen ? (
                  field.isMine ? (
                    <Image src="/bomb.svg" alt="bomb" width={40} height={40} />
                  ) : field.isFlag ? (
                    <Image src="/flag.svg" alt="gem" width={40} height={40} />
                  ) : (
                    <Image src="/gem.svg" alt="gem" width={40} height={40} />
                  )
                ) : (
                  ""
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="flex justify-between w-full gap-5">
              <button
                className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-200 flex items-center justify-center rounded-md hover:bg-yellow-500/20"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClicked(index, "flag");
                }}
              >
                <Image src="/flag.svg" alt="flag" width={40} height={40} />
              </button>

              <button
                className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-200 flex items-center justify-center rounded-md hover:bg-green-500/20"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClicked(index, "diamond");
                }}
              >
                <Image src="/gem.svg" alt="diamond" width={40} height={40} />
              </button>
            </PopoverContent>
          </Popover>
        ))}
      </div>

      {isGameWin && (
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Congratulations! You have found all the diamond!
              </DialogTitle>
              <DialogDescription>
                Thank you for playing the game! Hope you enjoyed it!
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  sendGAEvent({
                    event: "RestartWhenGameOver",
                    value: "Restart when game is over",
                  });
                  setGameOver(false);
                  setIsGameWin(false);
                  setConfig((prev) => ({
                    ...prev,
                    fields: Array.from({
                      length: prev.size * prev.size,
                    }).map(() => ({
                      isOpen: false,
                      isMine: false,
                      isFlag: false,
                      answerByUser: false,
                    })),
                  }));
                  init();
                }}
              >
                Restart
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {gameOver && (
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Game over</DialogTitle>
              <DialogDescription>
                Thank you for playing the game! Hope you enjoyed it!
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  sendGAEvent({
                    event: "RestartWhenGameWin",
                    value: "Restart when game win",
                  });
                  setGameOver(false);
                  setIsGameWin(false);
                  setConfig((prev) => ({
                    ...prev,
                    fields: Array.from({
                      length: prev.size * prev.size,
                    }).map(() => ({
                      isOpen: false,
                      isMine: false,
                      isFlag: false,
                      answerByUser: false,
                    })),
                  }));
                  init();
                }}
              >
                Restart
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
