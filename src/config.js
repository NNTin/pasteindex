/* eslint-disable no-unused-vars */
import path from 'path'
import _ from 'lodash'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example')
  })
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    mongo: {
      options: {
        db: {
          safe: true
        }
      }
    }
  },
  test: {
    mongo: {
      uri: 'mongodb://heroku_b15wpkq7:c2tkkhqilgfoh1t4c13frv5ka7@ds157325.mlab.com:57325/heroku_b15wpkq7',
      //uri: 'mongodb://localhost/test-test',
      options: {
        debug: false
      }
    }
  },
  development: {
    mongo: {
      uri: 'mongodb://heroku_b15wpkq7:c2tkkhqilgfoh1t4c13frv5ka7@ds157325.mlab.com:57325/heroku_b15wpkq7',
      //uri: 'mongodb://localhost/test-test',
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      //uri: process.env.MONGODB_URI || 'mongodb://localhost/test'
      uri: process.env.MONGODB_URI || 'mongodb://heroku_b15wpkq7:c2tkkhqilgfoh1t4c13frv5ka7@ds157325.mlab.com:57325/heroku_b15wpkq7'
    }
  }
}

module.exports = _.merge(config.all, config[config.all.env])
export default module.exports
