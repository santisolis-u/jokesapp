import {useLazyQuery} from '@apollo/client';
import {useCallback, useEffect, useState} from 'react';
import {FETCH_DAD_JOKE} from '../graphql/graphql';

export type Joke = {
  id: string;
  joke: string;
  permalink?: string;
};

export interface JokeResponse {
  joke: Joke;
}

const useJokes = () => {
  const [fetchJoke, {loading: isLoading}] = useLazyQuery<JokeResponse>(
    FETCH_DAD_JOKE,
    {
      fetchPolicy: 'network-only',
    },
  );
  const [fourJokes, setFourJokes] = useState<Joke[]>([]);
  const [jokes, setJokes] = useState<Joke[]>([]);

  const fetchJokes: () => void = useCallback(async () => {
    const jokesComing: Joke[] = [];
    for (let i = 0; i <= 3; i++) {
      const response = await fetchJoke();
      if (!!response.data) {
        jokesComing.push(response.data.joke);
      }
    }
    setJokes([...jokes, ...jokesComing]);
    setFourJokes(jokesComing);
  }, [jokes, setJokes, fetchJoke]);

  useEffect(() => {
    fetchJokes();
  }, []);

  const fetchMoreJokes = useCallback(() => {
    fetchJokes();
  }, []);

  return {
    jokes,
    fourJokes,
    fetchMoreJokes,
    isLoading: isLoading,
  };
};

export default useJokes;
