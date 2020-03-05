require('@babel/register')({
  presets: ['@babel/preset-env']
})

const { JSDOM } = require('jsdom')
const Canvas = require('canvas')

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

global.window = window
global.navigator = { userAgent: 'nodejs' }
global.Image = Canvas.Image
window.focus = () => { console.warn('window.focus does not work on the server') }

// copy properties from window to global; to avoid writing stuff like `global.document = window.document`
Object.defineProperties(global, {
  ...Object.getOwnPropertyDescriptors(window),
  ...Object.getOwnPropertyDescriptors(global)
})

const animationFrame = (cb) => {
  if (typeof cb !== 'function') return 0 // this line saves a lot of cpu
  window.setTimeout(() => {
    cb(0) // eslint-disable-line standard/no-callback-literal
  }, 1000 / 60)
  return 0
}

window.requestAnimationFrame = cb => {
  return animationFrame(cb)
}

module.exports = require('../src/server/app.js')
