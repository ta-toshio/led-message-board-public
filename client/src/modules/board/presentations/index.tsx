import React from 'react'
import {
  Flex,
  Box,
  Text,
  Input,
  Button,
  Image,
} from '@chakra-ui/core'
import CircleColorPicker from '../../../components/atoms/CircleColorPicker'
import { statusType, useCanvas } from '../containers'
import { FileType } from '../../../actions/file'
import './index.css'

type PropsType = {
  setFile: (file: FileType) => {}
  file: FileType
}

const Board: React.FC<PropsType> = (props: PropsType) => {

  const { setFile, file: { blob } } = props

  const {
    text,
    textCount,
    color,
    onChangeCompleteColor,
    progress,
    status,
    onCreate,
    handleChange,
  } = useCanvas({ setFile })

  return (
    <>
      <Flex align="center" justify="center" flexDirection={"column"}>
        <Box width={[ '100%' ]}>
          <Input
            size="lg"
            placeholder="ここにメッセージを書きます... (最大50文字)"
            maxLength={50}
            onChange={handleChange}
          />
          {/*
          <Text
            fontSize="md"
            mt={2}
            mb={2}
            textAlign="right"
          >
            {50 - textCount > 0 ? 50 - textCount : 0}
          </Text>
          */}
        </Box>
        <Box mt={6}>
          <CircleColorPicker
            color={color}
            onChangeComplete={onChangeCompleteColor}
          />
        </Box>
        <Button
          m={4}
          size={"lg"}
          onClick={onCreate}
          isDisabled={!text || status != statusType.init}
        >GIF画像を作成する</Button>
      </Flex>

      <Flex align="center" justify="center" flexDirection={"column"}>
        {!blob && (
          <Box className="zone" d="flex" justifyContent="center" alignItems="center">
            {status === statusType.drawing && (
              <Text fontSize="lg">
                描画中...<br />
                少し時間がかかります。
              </Text>
            )}
            {status === statusType.toGif && (
              <>
                <Text fontSize="lg">GIF画像作成中...</Text>
                <Text>{progress}%</Text>
              </>
            )}
            {status === statusType.toBinary && (
              <Text fontSize="lg">あと少し...</Text>
            )}
          </Box>
        )}
        {blob && (<Image rounded={10} src={URL.createObjectURL(blob)} />)}
      </Flex>
    </>
  )
}

export default Board