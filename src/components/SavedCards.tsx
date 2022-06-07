import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Joke} from '../hooks/useJokes';

interface SavedCardsProps {
  joke: Joke;
  handleDelete: (id: string) => void;
}

const SavedCards: FC<SavedCardsProps> = ({joke, handleDelete}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{joke.joke}</Text>
      <Pressable
        style={({pressed}) =>
          pressed ? [styles.pressable, styles.pressed] : styles.pressable
        }
        onPress={() => handleDelete(joke.id)}>
        <Text style={styles.trash}>🗑️</Text>
      </Pressable>
    </View>
  );
};

export default SavedCards;

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderRadius: 24,
    padding: 16,
    backgroundColor: 'white',
    borderWidth: 2,
    marginBottom: 16,
    fontFamily: 'OpenSans-Bold',
    flexDirection: 'row',
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    flex: 1,
    minHeight: 100,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 24,
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
    fontFamily: 'OpenSans-Bold',
  },
  trash: {},
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  pressed: {
    opacity: 0.5,
  },
});
