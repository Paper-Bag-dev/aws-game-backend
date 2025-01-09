import * as ex from "excalibur";
import * as tiled from "@excaliburjs/plugin-tiled";
import { Player } from "../Actors/player/Player";
import { Direction, PlayerData } from "../Config";
import { Socket } from "socket.io";

class BaseGameScene extends ex.Scene {
  private random = new ex.Random();
  private tileMap: tiled.TiledResource;
  arr = [new ex.Vector(20, 20), new ex.Vector(40, 40)];
  it = 0;

  // playerMap
  public playerMap: Map<string, ex.Actor> = new Map();

  constructor(tileMapResource: tiled.TiledResource) {
    super();
    this.tileMap = tileMapResource;
  }

  override onInitialize(engine: ex.Engine): void {
    const Collidables = this.tileMap.getObjectLayers("Collidables");

    // Collidables[0].objects.forEach((shape) => {
    //   const colliderActor = new ex.Actor({
    //     pos: ex.vec(shape.x, shape.y),
    //     anchor: ex.vec(0, 0),
    //     width: shape.tiledObject.width,
    //     height: shape.tiledObject.height,
    //     collisionType: ex.CollisionType.Fixed,
    //   });

    //   this.add(colliderActor);
    // });

    // this.tileMap.addToScene(this);
  }

  override onPreUpdate(engine: ex.Engine, elapsed: number): void {
    
  }

  override onPostUpdate(engine: ex.Engine, delta: number): void {
    this.playerMap.forEach((player, key) => {
      // console.log("updated: " ,key, player.pos.x, player.pos.y);
    });
  }

  addPlayerToScene(id: string): boolean {
    try {
      const player = new Player(id, this, this.arr[this.it], "default");
      this.playerMap.set(id, player);

      this.add(player);

      this.it++;
      return true;
    } catch (error) {
      console.log("baseScene - Error Adding Player", error);
      return false;
    }
  }

  updatePlayerInScene(data: PlayerData): boolean {
    try {
      const player = this.playerMap.get(data.id) as Player;

      if (!player) {
        throw Error(`baseScene - Player not found with Id: ${data.id}`);
      }

      player.pos.x = data.data.x;
      player.pos.y = data.data.y;
      player.DIRECTION = data.data.direction as Direction;

      return true;
    } catch (error) {
      console.log("baseScene - Error Updating Player", error);
      return false;
    }
  }
}

export default BaseGameScene;
