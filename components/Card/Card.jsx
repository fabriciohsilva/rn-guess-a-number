import React from "react";
import { View, StyleSheet } from "react-native";

import Colors from "../../constants/Colors"

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "#ffffff",
    elevation: 5,
    borderRadius: 10,
    padding: 10
  },
});

export default Card;
