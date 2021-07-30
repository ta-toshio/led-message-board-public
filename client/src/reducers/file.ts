import { types } from '../actions/file'

export type FileStateType = {
  blob: Blob | null
  base64: string | null
  text: string | null
}

const initialState: FileStateType = {
  blob: null,
  base64: null,
  text: null,
}

const fileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.SET_FILE:
      return { ...action.file }
    default:
      return state
  }
}

export default fileReducer