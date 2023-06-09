'use strict'

import { Model, DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'

import connection from '../index.js'

class User extends Model {
  static init(aConnection) {
    const schema = {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isStrongPassword: {
            minLength: 8,
            minLowercase: 0,
            minUppercase: 0,
            minNumbers: 0,
            minSymbols: 0,
          },
        },
      },
      salt: {
        type: DataTypes.STRING,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }

    const hooks = {
      beforeValidate: user => {
        const salt = bcrypt.genSaltSync()
        user.salt = salt
        return user.hash(user.password, salt).then(hash => {
          user.password = hash
        })
      },
    }

    const defaultScope = {
      attributes: {
        exclude: ['password', 'salt', 'createdAt', 'updatedAt'],
      },
    }

    const scopes = {
      everything: {
        attributes: {},
      },
    }

    return super.init(schema, {
      defaultScope,
      scopes,
      hooks,
      sequelize: aConnection,
    })
  }

  hash(password, salt) {
    return bcrypt.hash(password, salt)
  }

  hasPassword(stringToValidate) {
    return this.hash(stringToValidate, this.salt).then(
      newHash => newHash === this.password
    )
  }

  // See nonybrighto's comment in https://stackoverflow.com/a/48357983/8706387
  toJSON() {
    const userForClient = this.get({ clone: true })
    ;['id', 'password', 'salt', 'createdAt', 'updatedAt'].forEach(
      key => delete userForClient[key]
    )
    return userForClient
  }
}

User.init(connection)

export default User
