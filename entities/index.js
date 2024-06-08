import Matter from "matter-js";
import Bird from "../components/Bird";
import Floor from "../components/Floor";
import Obstacle from "../components/Obstacle";
import { getPipeSizePosPair } from "../utils/Random";

import { Dimensions } from "react-native";
import { Images } from "../assets/Images";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

export default (restart) => {
  let engine = Matter.Engine.create({
    enableSleeping: false,
  });

  let world = engine.world;

  world.gravity.y;

  const pipeSizePosA = getPipeSizePosPair();

  const pipeSizePosB = getPipeSizePosPair(width * 0.53);

  const pipeSizePosC = getPipeSizePosPair(width * 0.96);

  return {
    physics: { engine, world },
    Bird: Bird(world, "green", { x: 90, y: 180 }, { height: 40, width: 40 }),
    ObstacleTop1: Obstacle(
      world,
      "ObstacleTop1",
      Images.pipeTop,
      pipeSizePosA.pipeTop.pos,
      pipeSizePosA.pipeTop.size
    ),
    ObstacleBottom1: Obstacle(
      world,
      "ObstacleBottom1",
      Images.pipeBottom,
      pipeSizePosA.pipeBottom.pos,
      pipeSizePosA.pipeBottom.size
    ),

    ObstacleTop2: Obstacle(
      world,
      "ObstacleTop2",
      Images.pipeTop,
      pipeSizePosB.pipeTop.pos,
      pipeSizePosB.pipeTop.size
    ),
    ObstacleBottom2: Obstacle(
      world,
      "ObstacleBottom2",
      Images.pipeBottom,

      pipeSizePosB.pipeBottom.pos,
      pipeSizePosB.pipeBottom.size
    ),

    ObstacleTop3: Obstacle(
      world,
      "ObstacleTop3",
      Images.pipeTop,
      pipeSizePosC.pipeTop.pos,
      pipeSizePosC.pipeTop.size
    ),
    ObstacleBottom3: Obstacle(
      world,
      "ObstacleBottom3",
      Images.pipeBottom,

      pipeSizePosC.pipeBottom.pos,
      pipeSizePosC.pipeBottom.size
    ),

    Floor: Floor(
      world,
      "green",
      { x: width / 2, y: height },
      { height: 25, width: width }
    ),
  };
};
