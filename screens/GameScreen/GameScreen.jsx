import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Card from "../../components/Card/Card";
import NumberContainer from "../../components/NumberContainer/NumberContainer";
import MainButton from "../../components/MainButton/MainButton";

import DefaultStyles from "../../constants/default-styles";
import { Colors } from "react-native/Libraries/NewAppScreen";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNum = Math.floor(Math.random() * (max - min)) + min;

  if (randomNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNum;
  }
};

const renderListItem = (listLength, itemData) => {
  return (
    <View style={styles.listItem}>
      <Text style={{ ...DefaultStyles.bodyText }}>
        #{listLength - itemData.index}
      </Text>
      <Text style={{ ...DefaultStyles.bodyText }}>{itemData.item}</Text>
    </View>
  );
};

const GameScreen = (props) => {
  const initGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initGuess);
  const [pastGuesses, setPastGuesses] = useState([initGuess.toString()]);

  const lower = "LOWER";
  const greater = "GREATER";
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {

    if (
      (direction === lower && currentGuess < userChoice) ||
      (direction === greater && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know  that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    } else if (direction === lower) {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuesses((curPastGuesses) => [
      nextNumber.toString(),
      ...curPastGuesses,
    ]);
  };

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onClick={nextGuessHandler.bind(this, lower)}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onClick={nextGuessHandler.bind(this, greater)}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView> */}

        <FlatList
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 400,
    maxWidth: "90%",
  },
  listContainer: {
    flex: 1,
    width: "60%",
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: Colors.secondary,
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    width: "100%",
  },
});

export default GameScreen;
