import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {FavJokesContext} from '../store/store';
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
      {favJokes.length > 0 ? (
        <FlatList
          keyExtractor={element => element.id}
          data={favJokes}
          renderItem={joke => (
            <SavedCards handleDelete={handleDelete} joke={joke.item} />
          )}
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.center}>
          <Text style={styles.fallbackText}>Nothing saved</Text>
        </View>
      )}
    </View>
  );
};

export default Saved;

const styles = StyleSheet.create({
  savedContainer: {
    margin: 24,
    // overflow: 'visible',
    flex: 1,
  },
  flatList: {
    // overflow: 'visible',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    textAlign: 'center',
    fontSize: 32,
    fontFamily: 'OpenSans-Bold',
  },
});
