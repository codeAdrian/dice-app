import React, { useCallback } from "react";
import { useGameDice } from "./useGameDice";

function App() {
  const [state, api] = useGameDice(5);
  const { diceValue, numberOfDice } = state;

  const getDiceClassName = useCallback(value => {
    switch (value) {
      case 1:
        return "diceApp__dice fas fa-dice-one";
      case 2:
        return "diceApp__dice fas fa-dice-two";
      case 3:
        return "diceApp__dice fas fa-dice-three";
      case 4:
        return "diceApp__dice fas fa-dice-four";
      case 5:
        return "diceApp__dice fas fa-dice-five";
      default:
        return "diceApp__dice fas fa-dice-six";
    }
  }, []);

  return (
    <section className="diceApp">
      <div className="diceApp__wrapper">
        <h1 className="diceApp__heading">Dice App</h1>
        <article className="diceApp__container diceApp__container--primary">
          {diceValue &&
            diceValue.map((value, index) => (
              <i key={`dice-${index}`} className={getDiceClassName(value)} />
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
            className="button button__icon  diceApp__button"
            onClick={() => api.setNumberOfDice(numberOfDice === 1 ? 5 : 1)}
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
