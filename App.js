import { StatusBar } from "expo-status-bar";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./physics";
import { React, useEffect, useState } from "react";
import { Images } from "./assets/Images";
import * as Font from "expo-font";

export default function App() {
  const [running, setRunning] = useState(false);
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);

  useEffect(() => {
    setRunning(false);
  }, []);

  useEffect(() => {
    let fontLoad = async (_) => {
      await Font.loadAsync({
        "press-font": require("./assets/fonts/PressStart2P-Regular.ttf"),
      });

      setIsFontLoaded(true);
    };

    fontLoad();
  }, []);

  if (!isFontLoaded) {
    return (
      <ImageBackground
        source={Images.splashScreen}
        style={{ width: "100%", height: "100%" }}
      >
        <StatusBar hidden={true} />
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={Images.background} style={styles.container}>
      <Text style={styles.scoreStyle}>
        {currentPoints.toLocaleString("en-US")}
      </Text>
      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        running={running}
        onEvent={(event) => {
          switch (event.type) {
            case "game_over":
              setRunning(false);
              gameEngine.stop();
              break;
            case "new_point":
              setCurrentPoints(currentPoints + 1);
              break;
          }
        }}
        systems={[Physics]}
        entities={entities()}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      ></GameEngine>

      {!running ? (
        <View style={styles.boxModal}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: "#000",
              borderRadius: 5,
            }}
            onPress={(_) => {
              setRunning(true);
              gameEngine.swap(entities());
              setCurrentPoints(0);
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "#fff",
                fontFamily: "press-font",
              }}
            >
              START GAME
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <StatusBar style="auto" hidden />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scoreStyle: {
    fontSize: 25,
    margin: 20,
    zIndex: 10,
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
    fontFamily: "press-font",
    color: "#efef",
  },
  boxModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
