import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {
  FC,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import Title from '../components/Title';
import Card from '../components/Card';
import Button from '../components/Button';
import Carousel from '../components/Carousel';
import useJokes from '../hooks/useJokes';
import {FavJokesContext} from '../../store/store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

const {width} = Dimensions.get('window');

type HomeProps = NativeStackScreenProps<RootStackParamList>;

const Home: FC<HomeProps> = ({navigation}) => {
  const {favJokes, addFavJoke} = useContext(FavJokesContext);
  const {fourJokes, fetchMoreJokes, isLoading} = useJokes();
  const [cardIndex, setCardIndex] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate('Saved')}>
          <Text style={styles.saved}>❤️Saved: {favJokes.length} </Text>
        </Pressable>
      ),
    });
  }, [navigation, favJokes]);

  const indexChange = (index: number) => {
    setCardIndex(index);
  };

  const handleSaveJoke = (jokeIdx: number) => {
    console.log('IDX', jokeIdx, cardIndex);
    const favJokeToAdd = fourJokes[jokeIdx];
    const jokeInFav = !!favJokes.find(
      joke => joke.id === fourJokes[jokeIdx].id,
    );
    console.log('conditions', !!addFavJoke && !!favJokeToAdd && !jokeInFav);
    if (!!addFavJoke && !!favJokeToAdd && !jokeInFav) {
      addFavJoke(favJokeToAdd);
    }
    console.log(favJokes);
  };
  return !isLoading ? (
    <View style={styles.root}>
      <Title
        style={styles.title}
        text={'Things you can say to annoy designers.'}
      />
      <View style={styles.carouselContainer}>
        <Carousel
          indexChange={indexChange}
          items={fourJokes}
          cardIndex={cardIndex}
          fetchNextJokes={() => {
            fetchMoreJokes();
            setCardIndex(0);
          }}
        />
      </View>
      <Button
        onPress={() => handleSaveJoke(cardIndex)}
        style={styles.saveButton}>
        <Text>Save</Text>
      </Button>
    </View>
  ) : (
    <View style={styles.root}>
      <ActivityIndicator size="large" color="black" animating={true} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    // flex: 1,
  },
  carouselContainer: {
    flex: 5,
  },
  carousel: {
    flex: 1,
    backgroundColor: 'pink',
    width: '100%',
  },
  saveButton: {
    // flex: 1,
  },
  saved: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
  },
});
