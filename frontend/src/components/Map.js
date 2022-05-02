import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";
import cl from "./Map.module.css";

const Grid = styled.div`
  background-color: white;
  border: 0.05rem white solid;

  /* Make the whole grid fits its .fullSizeWrapper parent */
  width: min(70vw, 70vh);
  height: min(70vw, 70vh);

  display: grid;
  /* "gap" doesn't work well when dimension of the map is large */
  /* gap: 0.1rem; */
  grid-template-columns: repeat(${({ len }) => len}, 1fr);
  grid-template-rows: repeat(${({ len }) => len}, 1fr);
`;

export default function Map() {
  const { isDataLoaded, mapLength, spaceshipXYPos } = useSelector(
    (state) => state.data
  );

  // An empty len*len array for rendering the map
  const cellArray = (function () {
    const yxArray = [];
    for (let y = 0; y < mapLength; y++) {
      const yArray = [];
      for (let x = 0; x < mapLength; x++) {
        yArray.push(0);
      }
      yxArray.push(yArray);
    }
    return yxArray;
  })();

  // Filling in cellArray with data
  for (let i = 0; i < spaceshipXYPos.length; i++) {
    const spaceship = spaceshipXYPos[i];
    const [x, y] = spaceship;
    /********* Highlight the first spaceship in the spaceshipXYPos as 2, faking the owner's ship; otherwise assign 0. Modify this logic later !!! */
    cellArray[y][x] = i === 0 ? 2 : 1;
  }
  return (
    <div className={cl.map}>
      {isDataLoaded ? (
        <TransformWrapper>
          <TransformComponent>
            <div className={cl.fullSizeWrapper}>
              <Grid len={mapLength}>
                {cellArray.map((yArray) =>
                  yArray.map((data, id) => (
                    /********* Flash the first spaceship in the spaceshipXYPos. Change to the owner's spaceship later */
                    <div
                      className={`${cl.cell} ${
                        data === 1 || data === 2 ? cl.hasTank : ""
                      } ${data === 2 ? cl.activeShip : ""}
                      `}
                      key={id}
                    ></div>
                  ))
                )}
              </Grid>
            </div>
          </TransformComponent>
        </TransformWrapper>
      ) : (
        <div className={cl.fullSizeWrapper}>
          <span className={`h3 text-light ${cl.loadingText}`}>
            Map Loading...
          </span>
          <Spinner animation="border" role="status" variant="light">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
}
