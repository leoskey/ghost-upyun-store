'use strict'

const Promise = require('bluebird')
const upyun = require('upyun')
const fs = require('fs');
const urlParse = require('url').parse
const moment = require('moment')
const StorageBase = require('ghost-storage-base');

class UpyunStore extends StorageBase {
  constructor(options) {
    super(options)
    this.options = options || {}
    const bucket = new upyun.Service(this.options.bucket, this.options.operator, this.options.password)
    this.client = new upyun.Client(bucket)
  }

  save(image, targetDir) {
    const key = this.generateFileKey(image.name)
    return this.getStream(image.path)
      .then(data => {
        return this.client.putFile(key, data)
      }).then(result => {
        console.error(result)
        return Promise.resolve(`${this.options.domian}/${key}`)
      })
  }


  read(options) {
    options = options || {}
    const key = urlParse(options.path).pathname.slice(1)
    return this.client.getFile(key)
  }

  exists() {
    return Promise.resolve(false)
  }

  delete() {
    return Promise.resolve(true)
  }

  serve() {
    return function(req, res, next) {
      next()
    }
  }

  getStream(path) {
    return new Promise((reslove, reject) => {
      fs.readFile(path, (error, data) => {
        if (error) {
          reject(error)
        } else {
          reslove(data)
        }
      })
    })
  }

  generateFileKey(name) {
    const key = moment().format(this.options.prefix || 'YYYYMM/')
    return `${key}${name}`
  }
}

module.exports = UpyunStore