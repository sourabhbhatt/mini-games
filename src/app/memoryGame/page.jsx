import MemoryGame from "./MemoryComponents/Memory";

export default function page() {
  return (
    <div className="grow text-center m-auto p-4">
      <h1 className="font-blomberg text-8xl">Memory</h1>
      <div className="py-4">
        Level up your memory for free with this online memory card game. Flip
        the cards and match the tiles together in pairs.
      </div>
      <MemoryGame />
    </div>
  );
}
