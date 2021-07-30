/*global GIF */

import calculateTextWidth, { createTempCanvas } from './calcTextWidth'
import { statusType, changeStatus } from '../modules/board/containers'
import config from './../config'
const { FONT_SIZE, FONT_TYPE, CANVAS_SIZE } = config

export function createLedMessage({
  text: _text,
  imageData,
  dispatchStatus,
  setProgress,
  callback,
}) {
  const canvas = createTempCanvas()
  const context = canvas.getContext('2d')
  const text = "　".repeat(4) + _text
  canvas.width = calculateTextWidth(text, FONT_SIZE, FONT_TYPE) + FONT_SIZE
  canvas.height = CANVAS_SIZE
  context.putImageData(imageData, 0, 0)

  create({
    canvas,
    context,
    text,
    dispatchStatus,
    setProgress,
    callback
  })
}

const create = ({
  canvas,
  context,
  text,
  dispatchStatus,
  setProgress,
  callback
}) => {

  // const $renderCanvas = document.getElementById('canvas')
  const $renderCanvas = createTempCanvas()
  const renderContext = $renderCanvas.getContext('2d')
  $renderCanvas.width = CANVAS_SIZE
  $renderCanvas.height = CANVAS_SIZE
  const contentsWidth = canvas.width

  const gif = new GIF({
    workers: 4,
    quality: 100
  })

  gif.on('progress', function (p) {
    setProgress(Math.round(p * 100))
  })

  gif.on('finished', function (blob) {
    dispatchStatus(changeStatus(statusType.toBinary))
    // window.open(URL.createObjectURL(blob))
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onloadend = function () {
      // const base64data = reader.result.replace(/^data:.+base64,/, '')
      const base64data = reader.result
      callback(blob, base64data)
    }
  })

  const imageData = context.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  )

  let x = 0

  while(true) {

    renderContext.putImageData(imageData, x, 0)
    gif.addFrame($renderCanvas, {
      copy: true,
      delay: 100
    })

    if (contentsWidth < (x * -1)) {
      dispatchStatus(changeStatus(statusType.toGif))
      gif.render()
      break
    }

    x -= 20
  }

}