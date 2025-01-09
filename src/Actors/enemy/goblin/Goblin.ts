// import * as ex from "excalibur";
// import BaseGameScene from "../../../Scene/Scene";
// import { EnemyStates } from "../../../Config";
// import { TAG_ANY_ENEMY, TAG_ANY_PLAYER } from "../../../constants";
// import { randomFromArray } from "../../../helpers";
// import { Direction } from "../../../Config";
// import { Player } from "../../player/Player";

// type SelectedEnemyStates =
//   | EnemyStates.ROAMING
//   | EnemyStates.CHASING
//   | EnemyStates.DAMAGE
//   | EnemyStates.ATTACKING;

// export default class Goblin extends ex.Actor {
//   private Scene: BaseGameScene;
//   private socketManager: SocketManager;
//   private moveSpeed: number = 100; // Adjust speed as needed
//   private direction: Direction = Direction.NULL;
//   hp: number = 5;
//   state: SelectedEnemyStates = EnemyStates.ROAMING;
//   target: any = null;

//   constructor(Id: string, Scene: BaseGameScene, sckMngr: SocketManager) {
//     super({
//       name: Id,
//       anchor: ex.vec(0, 0),
//       pos: ex.vec(200, 200),
//       width: 16,
//       height: 16,
//       color: ex.Color.Green,
//       collisionType: ex.CollisionType.Fixed,
//       z: 1,
//     });

//     this.Scene = Scene;
//     this.socketManager = sckMngr;
//   }

//   override onInitialize(engine: ex.Engine): void {
//     // Initialize any state or properties here
//     this.addTag(TAG_ANY_ENEMY);
//   }

//   override onPreUpdate(engine: ex.Engine, elapsed: number): void {
//     // if(!this.queryForTarget() && this.state != EnemyStates.CHASING){
//     //   this.state = EnemyStates.CHASING;
//     //   console.log("set State, ", this.state);
//     // }
//     // this.vel.setTo(-300, 0);
//   }

//   override update(engine: ex.Engine, elapsed: number): void {
//     super.update(engine, elapsed); // Pass the correct elapsed time
//     this.vel.x = -300; // Set velocity
//   }

//   queryForTarget() {
//     // Correctly assigning to state using enum values
//     if (!this.target || this.target?.isKilled()) {
//       this.state = EnemyStates.ROAMING; // Use the enum value, not a string
//       const players = this.Scene.world
//         .queryManager.getQuery([TAG_ANY_PLAYER])
//         .getEntities() as ex.Actor[];

//       if (players.length > 0) {
//         this.target = randomFromArray(players);

//         const nearbyPlayers = players.filter((actor) => {
//           const actorDistance = this.pos.distance(actor.pos);
//           console.log("distance: ", actorDistance);
//           return actorDistance <= 50;
//         });

//         if (nearbyPlayers.length > 0) {
//           this.target = randomFromArray(nearbyPlayers);
//         }
//       }
//     }
//     return false;
//   }

//   override onPostUpdate(engine: ex.Engine, elapsed: number): void {
//     if (this.target && this.state === EnemyStates.CHASING) {
//       // this.moveTowardsTarget(elapsed);
//     }

//     const data = {
//       id: this.name,
//       type: "enemy",
//       x: this.pos.x,
//       y: this.pos.y,
//       hp: this.hp,
//       state: this.state,
//       direction: this.direction,
//     };

//     this.socketManager.emitToRoom("update-enemy", data);
//   }

//   // Add this method to handle movement
//   private moveTowardsTarget(elapsed: number) {}
// }
