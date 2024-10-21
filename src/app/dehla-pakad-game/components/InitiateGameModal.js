import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

export default function InitiateGameModal() {
  const handleSubmit = () => {
    // Set default names if fields are empty
    setTeamAName((prev) => prev.trim() || "Team A");
    setTeamBName((prev) => prev.trim() || "Team B");

    setPlayerNames((prev) => ({
      playerA1: prev.playerA1.trim() || "Player A1",
      playerA2: prev.playerA2.trim() || "Player A2",
      playerB1: prev.playerB1.trim() || "Player B1",
      playerB2: prev.playerB2.trim() || "Player B2",
    }));

    // Choose the method
    if (!method) {
      setMethod(1); // Default to method 1 if not selected
    }

    setIsModalOpen(false); // Close the modal once the game details are set
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)} // Close action when needed
      placement="top-center"
      classNames={{
        closeButton: "scale-50 m-0 p-0",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Game Setup</ModalHeader>
        <ModalBody>
          {/* Input for Team A */}
          <Input
            label="Team A Name"
            placeholder="Enter Team A Name"
            variant="bordered"
            value={teamAName}
            onValueChange={setTeamAName}
          />
          <Input
            label="Player A1 Name"
            placeholder="Enter Player A1 Name"
            variant="bordered"
            value={playerNames.playerA1}
            onValueChange={(value) =>
              setPlayerNames((prev) => ({ ...prev, playerA1: value }))
            }
          />
          <Input
            label="Player A2 Name"
            placeholder="Enter Player A2 Name"
            variant="bordered"
            value={playerNames.playerA2}
            onValueChange={(value) =>
              setPlayerNames((prev) => ({ ...prev, playerA2: value }))
            }
          />

          {/* Input for Team B */}
          <Input
            label="Team B Name"
            placeholder="Enter Team B Name"
            variant="bordered"
            value={teamBName}
            onValueChange={setTeamBName}
          />
          <Input
            label="Player B1 Name"
            placeholder="Enter Player B1 Name"
            variant="bordered"
            value={playerNames.playerB1}
            onValueChange={(value) =>
              setPlayerNames((prev) => ({ ...prev, playerB1: value }))
            }
          />
          <Input
            label="Player B2 Name"
            placeholder="Enter Player B2 Name"
            variant="bordered"
            value={playerNames.playerB2}
            onValueChange={(value) =>
              setPlayerNames((prev) => ({ ...prev, playerB2: value }))
            }
          />
        </ModalBody>
        <ModalFooter>
          <Button color="success" onPress={handleSubmit}>
            Start Game
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
