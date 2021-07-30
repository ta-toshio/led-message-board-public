export const createTempCanvas = () => {
  const canvas = document.createElement('canvas')
  canvas.style.display = 'none'
  return canvas
}

export default (
  text: string,
  fontSize: number = 16,
  fontType: string = ''
): number => {
  const canvas = createTempCanvas()
  const context = <CanvasRenderingContext2D> canvas.getContext('2d')
  context.font =  `${fontSize}px ${fontType}`
  context.textAlign = 'left'
  context.textBaseline = 'middle'
  const metrics = context && context.measureText(text)
  return metrics && metrics.width || 0
}