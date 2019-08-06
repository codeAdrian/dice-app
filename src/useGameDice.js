import { useState, useMemo, useCallback, useEffect } from "react";

export const useGameDice = (initialNumberOfDice = 1, initialDiceValue = 1) => {
  const [diceValue, setDiceValue] = useState();
  const [numberOfDice, setNumberOfDice] = useState(initialNumberOfDice);

  const initalDiceState = useMemo(
    () => Array(numberOfDice).fill(initialDiceValue),
    [numberOfDice, initialDiceValue]
  );

  const generateRandomDiceNumber = useCallback(() => {
    return Math.floor(Math.random() * 6) + 1;
  }, []);

  const rollDice = useCallback(() => {
    const arrayConfig = { length: numberOfDice };
    const newDiceValues = Array.from(arrayConfig, generateRandomDiceNumber);
    setDiceValue(newDiceValues);
  }, [numberOfDice, generateRandomDiceNumber]);

  const resetDice = useCallback(() => {
    setDiceValue(initalDiceState);
  }, [initalDiceState]);

  useEffect(() => {
    setDiceValue(initalDiceState);
  }, [initalDiceState]);

  const state = {
    diceValue,
    numberOfDice
  };

  const api = useMemo(
    () => ({
      setNumberOfDice,
      rollDice,
      resetDice
    }),
    [setNumberOfDice, rollDice, resetDice]
  );

  return [state, api];
};
