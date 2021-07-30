
export const types = {
  SET_FILE: 'FILE/SET_FILE',
}

export interface FileType {
  blob: Blob | null
  base64: string | null
  text: string | null
}

export const setFile = (file: FileType) => ({
  type: types.SET_FILE,
  file,
})