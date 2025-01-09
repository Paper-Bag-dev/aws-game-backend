import * as ex from "excalibur";
import { Direction } from "../../Config";
import { TAG_ANY_PLAYER } from "../../constants";
import BaseGameScene from "../../Scene/baseScene";



export class Player extends ex.Actor {
  private Scene: BaseGameScene;
  public playerType: number = 0;
  public playerId: string = "";
  public character: string = "";
  public DIRECTION: Direction = Direction.NULL;

  constructor(
    id: string,
    Scene: BaseGameScene,
    pos: ex.Vector,
    characterType: string,
  ) {
    super({
      name: id,
      pos: pos,
      anchor: ex.vec(0, 0),
      width: 16,
      height: 20,
      color: ex.Color.Yellow,
      collisionType: ex.CollisionType.Active,
      z: 1,
    });

    this.playerId = id;
    this.Scene = Scene;
    this.character = characterType;

    // this.socket.on(`client-player-${this.playerId}`, (data) => {
    //   console.log("Data", data);
    //   this.data = data as PlayerData;
    //   this.sokcetMgr.emitToRoom("update-player", {id: this.name, x: this.pos.x, y: this.pos.y, direction: this.DIRECTION});
    // })
  }

  onInitialize(engine: ex.Engine): void {
    console.log("Player tagged");
    this.addTag(TAG_ANY_PLAYER);
  }
}
