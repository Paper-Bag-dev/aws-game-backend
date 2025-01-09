import "node-self";
import "../polyFill";
import { parentPort } from "worker_threads";
import BaseGameScene from "../Scene/baseScene";
import * as tiled from "@excaliburjs/plugin-tiled";
import * as ex from "excalibur";
import { PlayerData } from "../Config";
import * as path from "path";
import Canvas from "canvas";

let players: string[] = [];

const tmxFilePath = path.resolve(
  __dirname,
  "../../assets/baseMaps/testMap3.tmx"
);

const tiledMapResource = new tiled.TiledResource(tmxFilePath, {
  headless: true,
  fileLoader: async (path: string, contentType: "json" | "xml") =>
    Promise<any>,
});

const scene = new BaseGameScene(tiledMapResource);

if (parentPort) {
  parentPort.on("message", (message) => {
    switch (message.type) {
      case "init-game":
        console.log("Worker - Game Start!");
        players = message.sceneData.players;

        startGame(scene as ex.Scene);
        break;

      case "player-update":
        console.log("Player update received:", message.data);
        if (!scene) {
          console.log("Was game even initialized? ");
          return;
        }
        scene.updatePlayerInScene(message.data);
        break;

      case "remove-player":
        players = players.filter((player) => player !== message.playerId);
        console.log("Player removed:", message.playerId);
        break;

      default:
        console.error("Unknown message type:", message.type);
    }
  });
}

function startGame(scene: ex.Scene) {
  try {
    const game = new ex.Engine({
      backgroundColor: ex.Color.fromHex("#5fcde4"),
      width: 600,
      height: 400,
      fixedUpdateFps: 30,
      antialiasing: false,
    });

    // Start the engine

    game.start().then(() => {
      game.addScene("BaseGameScene", scene);
      game.goToScene("BaseGameScene");
    });

    console.log("game start");
  } catch (e) {
    console.error(e);
    console.log("================================");
    console.trace();
  }
}
