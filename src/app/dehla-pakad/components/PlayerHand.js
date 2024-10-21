import Card from "./Card";
import styles from "../styles/PlayerHand.module.css";

const PlayerHand = ({ player, isCurrentPlayer, onPlayCard }) => {
  return (
    <div className={styles.playerHandContainer}>
      {/* Player Name */}
      <div className={styles.playerName}>{player.name}</div>

      {/* Player Hand Row (Profile Picture + Cards) */}
      <div className={styles.playerHandRow}>
        {/* Profile Picture */}
        <img
          className={styles.profilePic}
          src={player.profilePic}
          alt={`${player?.name}'s profile`}
        />

        {/* Cards: Hidden or actual cards based on whether it's the current player's turn */}
        {isCurrentPlayer ? (
          <div className={styles.cards}>
            {player.hand.map((card, index) => {
              return (
                <div
                  key={index}
                  className={styles.card}
                  onClick={() => onPlayCard(card)}
                >
                  <Card suit={card.suit} value={card.value} />
                </div>
              );
            })}
          </div>
        ) : (
          <Card isAdCard={true} />
        )}
      </div>
    </div>
  );
};

export default PlayerHand;
