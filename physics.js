import Matter from "matter-js";
import { getPipeSizePosPair } from "./utils/Random";
import { Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;
const windowsWidth = Dimensions.get("window").width;

const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;

  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      Matter.Body.setVelocity(entities.Bird.body, {
        x: 0,
        y: -6,
      });
    });

  Matter.Engine.update(engine, time.delta);

  for (let index = 1; index <= 3; index++) {
    const pipeSizePos = getPipeSizePosPair(windowsWidth * 0.5);

    if (
      entities[`ObstacleTop${index}`].body.bounds.max.x <= 1 &&
      !entities[`ObstacleTop${index}`].points
    ) {
      entities[`ObstacleTop${index}`].point = true;
      dispatch({
        type: "new_point",
      });
    }

    if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
      Matter.Body.setPosition(
        entities[`ObstacleTop${index}`].body,
        pipeSizePos.pipeTop.pos
      );
      Matter.Body.setPosition(
        entities[`ObstacleBottom${index}`].body,
        pipeSizePos.pipeBottom.pos
      );
    }

    Matter.Body.translate(entities[`ObstacleTop${index}`].body, {
      x: -3,
      y: 0,
    });
    Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {
      x: -3,
      y: 0,
    });
  }

  Matter.Events.on(engine, "collisionStart", (event) => {
    dispatch({
      type: "game_over",
    });
  });

  return entities;
};

export default Physics;
