import React from 'react'
import { CirclePicker, ColorResult, RGBColor } from 'react-color'

type PropsType = {
  color: RGBColor | undefined,
  onChangeComplete: (color: ColorResult) => void
}

const CircleColorPicker: React.FC<PropsType> = ({ color, onChangeComplete }: PropsType) => (
  <CirclePicker
    color={color}
    colors={[
      "#f44336",
      "#e91e63",
      "#9c27b0",
      "#673ab7",
      "#3f51b5",
      "#2196f3",
      "#03a9f4",
      "#00bcd4",
      "#009688",
      "#4caf50",
      "#8bc34a",
      "#cddc39",
      "#ffeb3b",
      "#ffc107",
      "#ff9800",
      "#ff5722",
      "#795548",
      "#607d8b"
    ]}
    onChangeComplete={onChangeComplete}
  />
)

export default CircleColorPicker