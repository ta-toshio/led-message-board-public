import React, { useState } from 'react'
import { useToast, Button } from '@chakra-ui/core'

type Props = {
  tweet: any
  file: any
  user: any
}

const Tweet = (props: Props) => {
  const [ submitting, setSubmitting ] = useState(false)
  const toast = useToast()
  const { tweet, file, user } = props

  return (
    <Button
      size={"lg"}
      onClick={e => {
        setSubmitting(true)
        tweet({ file, user })
          .then((res: boolean) => {
            res && toast({
              description: "ツイートしました！",
              status: "success",
              duration: 9000,
              isClosable: true,
            })
            setSubmitting(false)
          })
      }}
      isDisabled={submitting || !user || !file.base64}
    >
      {submitting && (<>ツイート送信中...</>)}
      {!submitting && (<>ツイートする</>)}
    </Button>
  )
}

export default Tweet