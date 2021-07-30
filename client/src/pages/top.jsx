import React from 'react'
import { Box, Flex, Text, Image } from '@chakra-ui/core'
import TweetEmbed from 'react-tweet-embed'
import Layout from '../components/layouts/DefaultLayout'
import Board from '../modules/board/containers'
import Login from '../modules/auth/containers/Login'
import TweetButton from '../modules/tweet/containers'
import './top.css'

const Top = () => {
  return (
    <>
      <Box
        pt={[ 4, 8 ]}
        pb={[ 4, 8 ]}
        mb={8}
        className="hero"
        bg="orange.200"
      >
        <Box
          display={{ xs: "none", xl: "block" }}
          textAlign={[ "center" ]}
          p={[ 4 ]}
        >
          <Text
            as="b"
            display="block"
            fontSize={["6xl"]}
          >GIF画像のメッセージで</Text>
          <Text
            as="b"
            display="block"
            fontSize={["6xl"]}
          >ツイートしてみよう！</Text>
        </Box>
        <Box
          display={{ xs: "block", xl: "none" }}
          textAlign={[ "center" ]}
          p={[ 4 ]}
        >
          <Text
            as="b"
            fontSize={["2xl", "3xl", "4xl"]}
            display="block"
          >GIF画像のメッセージで</Text>
          <Text
            as="b"
            display="block"
            fontSize={["2xl", "3xl", "4xl"]}
          >ツイートしてみよう！</Text>
        </Box>
      </Box>
      <Layout>
        {/* <Box mb={4} d="flex" justifyContent="center">
          <Image rounded={10} src="/images/sample.gif" />
        </Box> */}
        <Box mb={4} mx="auto" className="tweet-embed">
          <TweetEmbed id="1185823750735814657" />
        </Box>
        <Box
          p={[ 4 ]}
        >
          <Board />
          <Flex align="center" justify="center" flexDirection={"row"} m={4}>
            <TweetButton />
          </Flex>
          <Login />
        </Box>
      </Layout>
    </>
  )
}

export default Top