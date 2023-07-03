import "./styles.scss";
import { useEffect, useState } from "react";

export default function App() {
  const [sliderValue, setSliderValue] = useState(2);
  const [mySquares, setMySquares] = useState([]);
  const [stylesRC, setStylesRC] = useState("50px 50px");
  const [randomSquares] = useState(["1 2", "1 1"]);
  const [lives, setLives] = useState(3);

  //Square Component
  const Square = ({ id, onClick }) => {
    return <div id={id} className={compareIDs(id)} onClick={onClick}></div>;
  };

  const compareIDs = (id) => {
    if (randomSquares.includes(id)) return "square memo-bg";
    else return "square";
  };

  const handleSlider = (e) => {
    setSliderValue(e.target.value);
  };

  const handleClick = (e) => {
    let clickedID = e.target.id;
    console.log(clickedID);
    if (randomSquares.includes(clickedID)) {
      console.log("Awesome, you still have ${} squares to find, though");
    } else return "square";
  };

  useEffect(() => {
    let squares = [];
    let stylesValues = "";
    for (let rows = 1; rows <= sliderValue; rows++) {
      stylesValues += "50px ";
      for (let cols = 1; cols <= sliderValue; cols++) {
        squares.push(
          <Square id={`${rows} ${cols}`} onClick={(e) => handleClick(e)} />
        );
      }
    }
    setStylesRC(stylesValues);
    setMySquares([...squares]);
  }, [sliderValue, stylesRC]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log("color");
  //   }, 3000);
  // }, []);

  return (
    <div className="App">
      <label for="slider">Grid: {sliderValue}</label>
      <br />
      <input
        type="range"
        id="slider"
        name="slider"
        min="2"
        max="8"
        defaultValue={sliderValue}
        onChange={(e) => handleSlider(e)}
      />
      <h2>Lives left: {lives} </h2>
      <div
        className="grid-layout"
        style={{
          gridTemplateColumns: stylesRC,
          gridTemplateRows: stylesRC
        }}
      >
        {mySquares}
      </div>
    </div>
  );
}
