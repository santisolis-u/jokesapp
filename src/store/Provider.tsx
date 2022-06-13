import React, {useEffect, useState} from 'react';
import {Joke} from '../hooks/useJokes';
import {FavJokesContext} from './store';
import Realm from 'realm';
import {JokeSchema} from '../realm/schema';
interface Props {
  children: JSX.Element;
}

export const FavsProvider: React.FC<Props> = ({children}) => {
  const [favJokes, setFavJokes] = useState<Joke[]>([]);
  const [realm, setRealm] = useState<Realm>();

  useEffect(() => {
    const openRealm = async () => {
      const r = await Realm.open({schema: [JokeSchema]});
      if (r != null && !r.isClosed) {
        setRealm(r);
        const result = r.objects<Joke>('Joke').map(value => {
          return value.toJSON() as Joke;
        });
        setFavJokes(result);
      }
    };
    openRealm();
    return () => {
      if (!!realm && !realm.isClosed) {
        realm.close();
      }
    };
  }, []);

  const addFavJoke = (joke: Joke) => {
    if (!favJokes.includes(joke)) {
      if (!!realm && !realm.isClosed) {
        realm.write(() => {
          realm.create('Joke', joke);
        });
      }
      setFavJokes(favJokes => [...favJokes, joke]);
    }
  };
  const removeFavJoke = (id: string) => {
    if (!!realm && !realm.isClosed) {
      realm.write(() => {
        const joke = realm.objectForPrimaryKey<Joke>('Joke', id);
        realm.delete(joke);
      });
    }
    setFavJokes(favJokes => favJokes.filter(joke => joke.id !== id));
  };
  return (
    <FavJokesContext.Provider value={{favJokes, addFavJoke, removeFavJoke}}>
      {children}
    </FavJokesContext.Provider>
  );
};
