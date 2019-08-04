import { useState, useMemo, useCallback, useEffect } from "react";

// Hook can be initialized with 2 optional values (number of dice and initial value).
// Both options have a default value of 1 to avoid issues and simplify the basic hook init.
export const useGameDice = (initialNumberOfDice = 1, initialDiceValue = 1) => {
  // Initializing hook states with initial values.
  const [diceValue, setDiceValue] = useState();
  const [numberOfDice, setNumberOfDice] = useState(initialNumberOfDice);

  // Initializes initial dice state constant. Expected to rarely change.
  // Array shouldn't re-initialize each time component re-renders.
  const initalDiceState = useMemo(
    () => Array(numberOfDice).fill(initialDiceValue),
    [numberOfDice, initialDiceValue]
  );

  // Memoized function for generating random number between 1 and 6.
  // This function will never change, so the dependency array is empty.
  const generateRandomDiceNumber = useCallback(() => {
    return Math.floor(Math.random() * 6) + 1;
  }, []);

  // Memoized function for rolling the dice. It changes only if we change the number of dice.
  const rollDice = useCallback(() => {
    const arrayConfig = { length: numberOfDice };
    const newDiceValues = Array.from(arrayConfig, generateRandomDiceNumber);
    setDiceValue(newDiceValues);
  }, [numberOfDice, generateRandomDiceNumber]);

  // Memoized function for rolling the dice. It changes only if we change the initalDiceState.
  const resetDice = useCallback(() => {
    setDiceValue(initalDiceState);
  }, [initalDiceState]);

  // Monitoring changes in initialDiceState. Resets the dice state with updated length and values.
  // On initial render, it sets initial diceValue with memoized initialDiceState.
  useEffect(() => {
    setDiceValue(initalDiceState);
  }, [initalDiceState]);

  // State object. It's expected to change very often.
  const state = {
    diceValue,
    numberOfDice
  };

  // Memoized api object. Expected to rarely change.
  const api = useMemo(
    () => ({
      setNumberOfDice,
      rollDice,
      resetDice
    }),
    [setNumberOfDice, rollDice, resetDice]
  );

  // Return hook state and functions.
  return [state, api];
};
