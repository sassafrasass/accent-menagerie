import { useDispatch, useSelector } from "react-redux";
import mapSlice from "../../store/map/mapSlice";
import cl from "./Cell.module.css";

export default function Cell({ shipIndex, isDying, id }) {
  const dispatch = useDispatch();
  const shipData = useSelector((state) => state.data.shipDataArray[shipIndex]);

  // Props processing
  const hasShip = shipIndex !== null;
  /********* Flash the first spaceship in the spaceshipXYPos. Change to the owner's spaceship later */
  // const isOwnersShip = shipIndex === 2;
  const isOwnersShip = false;

  const handleClick = () => {
    dispatch(mapSlice.actions.clickShip(shipIndex));
  };

  return (
    <div
      className={[
        cl.cell,
        hasShip ? cl.hasShip : "",
        isOwnersShip ? cl.isActiveShip : "",
      ].join(" ")}
      id={id}
      onClick={handleClick}
    >
      {/* Only render an img when there is a spaceship */}
      {hasShip && (
        <img className={cl.shipImg} src={shipData.avatarString} alt="" />
      )}
      {/* Only render red shadow if the cell is in the dying zone */}
      {isDying && <div className={cl.isDying}></div>}
    </div>
  );
}
