import React, {
  ChangeEvent,
  useState,
  useEffect,
  useReducer,
} from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ColorResult, RGBColor } from 'react-color'
import WebWorker from '../../../libs/createWorker'
import message from './worker'
import draw from './draw'
import { createLedMessage } from '../../../libs/led'
import calcTextWidth, { createTempCanvas } from '../../../libs/calcTextWidth'
import config from './../../../config'
import { setFile, FileType } from '../../../actions/file'
import BoardPresentation from '../presentations'
import get from '../../../libs/get'

const { FONT_SIZE, FONT_TYPE } = config
const [ messageWorker ] = WebWorker([message])

const mapStateToProps = (state: any) => ({
  file: get([ 'file' ], state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setFile: (file: FileType) => dispatch((setFile(file))),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardPresentation)

export enum statusType {
  init,
  drawing,
  toGif,
  toBinary,
}

interface Action {
  type: string
  payload: {
    status: statusType
  }
}

export const changeStatus = (type: number): Action => ({
  type: 'CHANGE_STATUS_TYPE',
  payload: {
    status: type
  }
})

export const initialStatusState = statusType.init

export const reducer = (state: statusType, action: Action) => {
  if (!Object.values(statusType).includes(action.payload.status)) {
    return statusType.init
  }
  return action.payload.status
}

type ParamsType = {
  setFile: (file: FileType) => {}
}

export const useCanvas = (params: ParamsType) => {

  const { setFile } = params

  const [ text, setText ] = useState<string>('')
  const [ textCount, setTextCount ] = useState<number>(0)
  const [ color, setColor ] = useState<RGBColor | undefined>({
    a: 1,
    b: 0,
    g: 152,
    r: 255
  })
  const [ progress, setProgress ] = useState(0)
  const [ status, dispatchStatus ] = useReducer(reducer, initialStatusState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    // setTextCount(e.target.value.length)
  }

  useEffect(() => {
    messageWorker.onmessage = function(e: any) {
      const { imageData, text } = e.data
      createLedMessage({
        imageData,
        text,
        dispatchStatus,
        setProgress,
        callback: (blob: Blob, base64data: string) => {
          setFile({ blob, base64: base64data, text })
          dispatchStatus(changeStatus(statusType.init))
          setProgress(0)
        }
      })
    }
  }, [])

  const onCreate = () => {
    dispatchStatus(changeStatus(statusType.drawing))
    setProgress(0)
    setFile({ blob: null, base64: null, text: null })

    const textWidth = calcTextWidth("　".repeat(4) + text, FONT_SIZE, FONT_TYPE)
    const canvas = createTempCanvas()
    if (!('transferControlToOffscreen' in canvas)) {
      setTimeout(() => {
        draw({
          canvas,
          text,
          textWidth,
          color,
          ...config
        })
          .then((res: any) => {
            const { imageData } = res
            return createLedMessage({
              imageData,
              text,
              dispatchStatus,
              setProgress,
              callback: (blob: Blob, base64data: string) => {
                setFile({ blob, base64: base64data, text })
                dispatchStatus(changeStatus(statusType.init))
                setProgress(0)
              }
            })
          })
      }, 100)
      return
    }
    const offscreenCanvas = canvas.transferControlToOffscreen()
    messageWorker.postMessage({
      canvas: offscreenCanvas,
      text,
      textWidth,
      color,
      ...config
    }, [
      offscreenCanvas
    ])
  }

  const onChangeCompleteColor = (argColor: ColorResult) =>
    setColor(argColor.rgb)

  return {
    text: text.trim(),
    setText,
    textCount,
    color,
    onChangeCompleteColor,
    progress,
    setProgress,
    status,
    dispatchStatus,
    onCreate,
    handleChange,
  }
}