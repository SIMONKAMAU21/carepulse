import { Box, HStack } from '@chakra-ui/react'
import React from 'react'

const AuthWrapper = ({leftChildren,rightChildren,background}) => {
  return (
    <HStack bg={background} h={"100%"} w={"100%"} spacing={"0"} align={"stretch"}>
        <Box m={"0px"}  alignItems={"center"} justifyContent={"center"} w={{base:"100%",md:'60%'}} h={"100%"} bg={"#131619"} >
            {leftChildren} </Box>
        <Box  w={{base:"100%",md:"40%"}} h={"100%"} display={{base:"none",md:"block"}} bg={background}>{rightChildren} </Box>

    </HStack>
  )
}

export default AuthWrapper