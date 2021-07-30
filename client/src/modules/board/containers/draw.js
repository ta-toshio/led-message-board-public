// copy from ./worker.js

let FONT_SIZE
let FONT_TYPE
let BLOCK_SIZE
let CANVAS_SIZE

const create = ({
  canvas,
  text: _text,
  textWidth: _textWidth,
  color,
  FONT_SIZE: font_size,
  FONT_TYPE: font_type,
  BLOCK_SIZE: block_size,
  CANVAS_SIZE: canvas_size,
}) => {

  FONT_SIZE = font_size
  FONT_TYPE = font_type
  BLOCK_SIZE = block_size
  CANVAS_SIZE = canvas_size

  const context = canvas.getContext(`2d`);

  const text = "　".repeat(4) + _text
  const textWidth = _textWidth + FONT_SIZE
  canvas.width = textWidth
  canvas.height = CANVAS_SIZE

  // テキストボックスの文字列をCanvasに描画する
  return drawText(canvas, context, text)
    .then(() => {
      // 電光掲示板ぽくしたいので、一旦モザイクな感じにする
      return toMosaic(canvas, context, color)
    })
    .then(() => {
      // LEDぽく見えるよう、格子状の罫線を引く
      return toBlind(canvas, context);
    })
    .then(() => ({
        canvas,
        context,
        text: _text,
        imageData: context.getImageData(0, 0, canvas.width, canvas.height)
      })
    )
}

const drawText = (canvas, context, text) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'rgb(128, 128, 128)';
  context.font =  `${FONT_SIZE}px ${FONT_TYPE}`
  context.textAlign = 'left';
  context.textBaseline = 'middle';
  context.fillText(text, 0, FONT_SIZE * 2);

  return Promise.resolve()
}

/**
 * ピクセレート処理
 */
const toMosaic = (canvas, context, color) => {

  const promises = []
  const tiles_w = canvas.width / BLOCK_SIZE;
  const tiles_h = canvas.height / BLOCK_SIZE;

  for (let i = 0; i < tiles_w; i++) {
    for (let j = 0; j < tiles_h; j++) {
      const x = (i * BLOCK_SIZE);
      const y = (j * BLOCK_SIZE);

      const promise = new Promise((resolve) => {
        const block_image = context.getImageData(x, y, BLOCK_SIZE, BLOCK_SIZE);
        const rgb = getAvgRgb(block_image, color);
        context.fillStyle = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
        context.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
        return resolve()
      })

      promises.push(promise)
    }
  }

  return Promise.all(promises)
}

/**
 * 特定の範囲のRGB平均値を求める
 */
const getAvgRgb = (imageData, color) => {

  const pixels = imageData.data;
  let r = 0,
    g = 0,
    b = 0;
  let rgb;

  // LEDの明るさをブロック内の全ピクセルの平均で算出する
  // 各ピクセルは、Red/Green/Blue/Alpha の4個の配列になっている
  const len = pixels.length / 4;
  for (let i = 0; i < len; i++) {
    r += pixels[i * 4];
    g += pixels[i * 4 + 1];
    b += pixels[i * 4 + 2];
  }
  r = parseInt(r / len, 10);
  g = parseInt(g / len, 10);
  b = parseInt(b / len, 10);

  rgb = adjustBlightness(r, g, b);
  r = rgb[0];
  g = rgb[1];
  b = rgb[2];

  rgb = colorize(r, g, b, color)
  r = rgb[0];
  g = rgb[1];
  b = rgb[2];

  return [r, g, b];
}

const adjustBlightness = (r, g, b) => {
  // 平均値だけだと全体的にぼやけた感じに見えるので、
  // 閾値を超えている場合は、さらにちょっと明るくする
  const threshold = 20;
  if ((r > threshold) && (g > threshold) && (b > threshold)) {
    r = r + 160;
    g = g + 160;
    b = b + 160;
  } else {
    r = r + 20;
    g = g + 20;
    b = b + 20;
  }

  // 光っていないLEDは、うっすらと見えるようにする
  if ((r === 0) && (g === 0) && (b === 0)) {
    r = 40;
    g = 40;
    b = 40;
  }

  return [r, g, b];
}

/**
 * RGB値を受け取って、単色化する
 */
const colorize = (r, g, b, color) => {
  r = parseInt(r / 255 * color.r, 10);
  g = parseInt(g / 255 * color.g, 10);
  b = parseInt(b / 255 * color.b, 10);

  return [r, g, b];
}

/**
 * 電光掲示板のような格子状の罫線を引く
 */
const toBlind = (canvas, context) => {

  const tiles_w = canvas.width / BLOCK_SIZE;
  const tiles_h = canvas.height / BLOCK_SIZE;

  context.beginPath();
  context.lineWidth = 0.9;

  // 縦線を引く
  for (let i = 0; i < tiles_w + 1; i++) {
    const x = (i * BLOCK_SIZE);

    context.moveTo(x, 0);
    context.lineTo(x, canvas.height);

  }

  // 横線を引く
  for (let j = 0; j < tiles_h + 1; j++) {
    const y = (j * BLOCK_SIZE);

    context.moveTo(0, y);
    context.lineTo(canvas.width, y);
  }

  context.stroke();

  return Promise.resolve()
}

export default create