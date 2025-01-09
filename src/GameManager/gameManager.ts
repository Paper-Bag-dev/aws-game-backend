import BaseGameScene from "../Scene/baseScene";
import * as tiled from "@excaliburjs/plugin-tiled";
import { PlayerData } from "../Config";
import * as path from "path";
import { Socket } from "socket.io";
import { Worker } from "worker_threads";

export default class GameManager {
  public players: string[];
  public scene: BaseGameScene | null = null;
  // private tiledMapResource: tiled.TiledResource;
  public socket: Socket | null = null;
  private worker: Worker | null = null;

  constructor() {
    this.players = [];
    // const tmxFilePath = path.resolve(
    //   __dirname,
    //   "../../assets/baseMaps/testMap3.tmx"
    // );

    // // Here instead Call the AI and make it choose the tile or choose random tile
    // this.tiledMapResource = new tiled.TiledResource(tmxFilePath, {
    //   headless: true,
    //   fileLoader: async (path: string, contentType: "json" | "xml") =>
    //     Promise<any>,
    // });

    // this.scene = new BaseGameScene(
    //   this.tiledMapResource,
    //   this.socket as Socket
    // );
  }

  addUser(id: string) {
    if (this.players.length < 2) {
      this.players.push(id);
      this.scene?.addPlayerToScene(id);
      console.log("Added", this.players);
    }
  }

  updateUser(data: PlayerData) {
    if (this.worker) {
      this.worker.postMessage({ type: "player-update", data });
    }
  }
  checkUsers() {
    if (this.players.length === 2) {
      return true;
    }
    return false;
  }

  initGame() {
    console.log("GM - INIT");

    const players = this.players;

    // Correct worker initialization using the compiled .js file
    this.worker = new Worker(
      path.resolve(__dirname, "../worker/gameWorker.js")
    );

    this.worker.postMessage({
      type: "init-game",
      players: this.players,
    });

    this.worker.on("message", (msg) => {
      console.log("Message from worker:", msg);
    });
  }
}
