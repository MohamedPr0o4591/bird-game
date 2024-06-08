import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getPipeSizePosPair = (addToPosX = 0) => {
  let yPosTop = -getRandom(150, height - 50);

  let pipeTop = {
    pos: { x: width + addToPosX, y: yPosTop },
    size: { height: height * 2, width: 75 },
  };

  let pipeBottom = {
    pos: { x: width + addToPosX, y: height * 2 + 150 + yPosTop },
    size: { height: height * 2, width: 75 },
  };

  return { pipeTop, pipeBottom };
};
