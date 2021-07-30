import React, { FunctionComponent } from 'react'
import { Box, Text } from '@chakra-ui/core'
import Auth from '../../modules/auth/containers/Auth'

const DefaultLayout: FunctionComponent = ({ children }) => {

  return (
    <Auth>
      <Box maxW="960px" mx="auto" pb={12}>
        {children}
      </Box>
      <Box
        pt={[ 4, 8 ]}
        pb={[ 4, 8 ]}
        mt={4}
        bg="orange.200"
        d="flex"
        justifyContent="center"
      >
        <Text>
          © Copyright led-msg.site, All Rights Reserved.
        </Text>
      </Box>
    </Auth>
  )
}

export default DefaultLayout