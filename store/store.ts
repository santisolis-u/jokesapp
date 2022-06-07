import {Joke} from '../src/hooks/useJokes';
import React, {FC, ReactChildren, useState} from 'react';
interface FavJokesContextType {
  favJokes: Joke[];
  addFavJoke?: (joke: Joke) => void;
  removeFavJoke?: (id: string) => void;
}

const defaultState = {
  favJokes: [],
};

export const FavJokesContext =
  React.createContext<FavJokesContextType>(defaultState);
