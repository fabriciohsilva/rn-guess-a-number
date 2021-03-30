import React from "react";
import { View, StyleSheet, Text, Button, Image } from "react-native";

import MainButton from "../../components/MainButton/MainButton";

import DefaultStyles from "../../constants/default-styles";
import Colors from "../../constants/Colors";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>The Game is Over!</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="cover"
          fadeDuration={1000}
          source={require("../../assets/success.png")}
          //source={{uri: 'https://s3.amazonaws.com/images.gearjunkie.com/uploads/2018/05/matterhorn-3x21.jpg'}}
        />
      </View>
      <View style={styles.resultContainer}>
        <Text style={{ ...styles.resultText, ...DefaultStyles.bodyText }}>
          Your phone needed{" "}
          <Text style={styles.highLight}>{props.roundsNumber}</Text> rounds to
          guess the number{" "}
          <Text style={styles.highLight}>{props.userNumber}</Text>.
        </Text>
      </View>
      <MainButton onClick={props.onRestart}>New Game</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    // borderWidth: 3,
    // borderColor: "black",
    overflow: "hidden",
    marginVertical: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  resultContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  resultText: {
    textAlign: "center",
  },
  highLight: {
    color: Colors.secondary,
    fontFamily: "open-sans-bold",
  },
});

export default GameOverScreen;
