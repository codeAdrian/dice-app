import React, { useCallback } from "react";
import { useGameDice } from "./useGameDice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [state, api] = useGameDice(5);
  const { diceValue, numberOfDice } = state;

  const getDiceClassName = useCallback(value => {
    switch (value) {
      case 1:
        return faDiceOne;
      case 2:
        return faDiceTwo;
      case 3:
        return faDiceThree;
      case 4:
        return faDiceFour;
      case 5:
        return faDiceFive;
      default:
        return faDiceSix;
    }
  }, []);

  const handleNumberOfDiceClick = useCallback(
    event => {
      const { value } = event.currentTarget || event.srcElement;
      const numValue = value && parseInt(value);
      numValue && api.setNumberOfDice(numValue);
    },
    [api]
  );

  return (
    <section className="diceApp">
      <div className="diceApp__wrapper">
        <h1 className="diceApp__heading">Dice App</h1>
        <article className="diceApp__container diceApp__container--primary">
          {diceValue &&
            diceValue.map((value, index) => (
              <FontAwesomeIcon
                key={`dice-${index}`}
                className="diceApp__dice"
                icon={getDiceClassName(value)}
              />
            ))}
        </article>
        <article className="diceApp__container diceApp__container--secondary">
          <button
            className="button diceApp__button button--primary"
            onClick={api.rollDice}
          >
            <strong>Roll </strong>
          </button>
          <button className="button diceApp__button" onClick={api.resetDice}>
            <strong>Reset </strong>
          </button>
          <button
            value={`${numberOfDice === 1 ? 5 : 1}`}
            className="button button__icon  diceApp__button"
            onClick={handleNumberOfDiceClick}
          >
            <strong>{numberOfDice === 1 ? 5 : 1} x Dice</strong>
          </button>
        </article>
        <hr className="diceApp__divider" />
        <a
          className="diceApp__link"
          href="https://codeAdrian.github.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          By Adrian Bece
        </a>
      </div>
    </section>
  );
}

export default App;
