import styles from "../styles/Card.module.css";

const Card = ({ suit, value, isAdCard = false }) => {
  const isRed = suit === "♥" || suit === "♦";
  const cardClass = isRed ? "red" : "black";

  if (isAdCard)
    return (
      <div className="relative h-[90px] w-[60px] flex flex-col justify-center text-center items-center bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out">
        <span className="text-xs text-gray-500 font-semibold leading-3 mb-2">
          Your Ad Here
        </span>
        <span className="text-[10px] text-gray-400 leading-3">
          Click to learn more
        </span>
      </div>
    );
  else
    return (
      <div className={`${styles.card} ${styles[cardClass]}`}>
        <span>{value}</span>
        <span>{suit}</span>
      </div>
    );
};

export default Card;
