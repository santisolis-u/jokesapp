import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {FavJokesContext} from '../../store/store';
import SavedCards from '../components/SavedCards';

const Saved = () => {
  const {favJokes, removeFavJoke} = useContext(FavJokesContext);
  const handleDelete = (id: string) => {
    if (removeFavJoke) {
      removeFavJoke(id);
    }
  };
  return (
    <View style={styles.savedContainer}>
      <FlatList
        keyExtractor={element => element.id}
        data={favJokes}
        renderItem={joke => (
          <SavedCards handleDelete={handleDelete} joke={joke.item} />
        )}
        style={styles.flatList}
      />
    </View>
  );
};

export default Saved;

const styles = StyleSheet.create({
  savedContainer: {
    margin: 24,
    overflow: 'visible',
  },
  flatList: {
    overflow: 'visible',
  },
});
