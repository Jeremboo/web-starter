/**
 * Inspired by @soufianelasri <3
 *
 * HOW:
 * - npm install -g workflow-cli
 * - wk json2bin --input Bottle/bottle2.json --output bottleMin.bin
 */

import when from 'when'
import { BufferGeometry, BufferAttribute } from 'three'

export default class BytesLoader {
  // TODO looking for how to get a material from arrayBuffer
  async load (url, callback, progress = f => f, reject = f => f) {
    try {
      const arrayBuffer = await this._ajax(url, 'arraybuffer', progress)
      const geom = this._geomFromArrayBuffer(arrayBuffer)
      callback(geom)
    } catch (e) {
      reject(e)
    }
  }

  _ajax (url, rtype, progress = f => f) {
    var deferred, xhr
    var method = 'GET'

    deferred = when.defer()
    xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.responseType = rtype
    xhr.onprogress = progress
    xhr.onload = function() {
      return deferred.resolve(xhr.response)
    }
    xhr.error = function(e) {
      return deferred.reject(e)
    }
    xhr.send()
    return deferred.promise
  }

  _geomFromArrayBuffer (buffer) {
    var geometry  = new BufferGeometry()
    var flag      = new Uint32Array(buffer)
    var data      = new Float32Array(buffer)
    var count     = flag[ 0 ]

    var vertices = new Float32Array(count * 3)
    var normals = new Float32Array(count * 3)
    var uvs = new Float32Array(count * 2)

    for (let i = 0; i < count; i++) {
      vertices[ i * 3 + 0 ] = data[ 1 + i * 3 + 0 ]
      vertices[ i * 3 + 1 ] = data[ 1 + i * 3 + 1 ]
      vertices[ i * 3 + 2 ] = data[ 1 + i * 3 + 2 ]

      normals[ i * 3 + 0 ] = data[ 1 + count * 3 + i * 3 + 0 ]
      normals[ i * 3 + 1 ] = data[ 1 + count * 3 + i * 3 + 1 ]
      normals[ i * 3 + 2 ] = data[ 1 + count * 3 + i * 3 + 2 ]

      uvs[ i * 2 + 0 ] = data[ 1 + count * 6 + i * 2 + 0 ]
      uvs[ i * 2 + 1 ] = data[ 1 + count * 6 + i * 2 + 1 ]
    }

    geometry.addAttribute('position', new BufferAttribute(vertices, 3))
    geometry.addAttribute('normal', new BufferAttribute(normals, 3))
    geometry.addAttribute('uv', new BufferAttribute(uvs, 2))
    return geometry
  }
}
