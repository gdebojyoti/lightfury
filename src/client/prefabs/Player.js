import Phaser from 'phaser'

import Socket from '../utilities/Socket'
import { gameConstants } from '../../shared/constants'

class Player extends Phaser.GameObjects.Rectangle {
  constructor (config) {
    super(config.scene)

    this.initialize(config)
  }

  initialize ({ scene, staticProps: objects, config, isActivePlayer }) {
    const {
      name,
      position: {
        x: posX = 0,
        y: posY = 0
      } = {}
    } = config

    // private members
    this._scene = scene

    // local physics are applied for active player only
    this.isActivePlayer = isActivePlayer

    this.entity = scene.add.rectangle(posX, posY, 100, 100, 0x000000)
    scene.physics.add.existing(this.entity)
    this.entity.name = name
    this.entity.setOrigin(0, 0)

    // add colliders to player character
    scene.physics.add.collider(this.entity, objects, this.onCollision.bind(this))
  }

  onCollision (obj1, obj2) {
    // console.log('collided..', obj1.name, obj2.name)
  }

  // handle movement & jumping
  checkInputAndMove (cursors) {
    // poll for arrow keys
    if (cursors) {
      if (cursors.left.isDown) {
        // allow player to walk left only if inside game world
        if (this.entity.x > 0) {
          this.isActivePlayer && Socket.onPlayerInput({ left: true })
        }
      } else if (cursors.right.isDown) {
        this.isActivePlayer && Socket.onPlayerInput({ right: true })
      } else if (cursors.up.isDown) {
        this.isActivePlayer && Socket.onPlayerInput({ up: true })
      } else if (cursors.down.isDown) {
        if (this.entity.body.onFloor()) {
          console.log('floored!', this.entity)
        }
        this.isActivePlayer && Socket.onPlayerInput({ down: true })
      }
    }

    this.realOps()
  }

  realOps () {
    const { left, right, up, down } = this.directions || {}

    let velocityX = 0
    let velocityY = 0
    let color = 0x000

    if (left) {
      color = 0xff0000
      velocityX = -gameConstants.MOVEMENT_SPEED
    } else if (right) {
      color = 0x0000ff
      velocityX = gameConstants.MOVEMENT_SPEED
    } else if (up) {
      color = 0xffff00
      velocityY = -gameConstants.JUMP_SPEED
    } else if (down) {
      color = 0x00ff00
      velocityY = gameConstants.MOVEMENT_SPEED
    }

    // update player color
    this.entity.fillColor = color

    // update player's velocity
    this.entity.body.setVelocityX(velocityX)
    velocityY && this.entity.body.setVelocityY(velocityY)

    this.directions = null
  }

  // update player color
  updatePosition (data) {
    this.directions = data.directions
    console.log('updating player position')
  }

  update ({ cursors }) {
    this.checkInputAndMove(cursors)
  }
}

export default Player
