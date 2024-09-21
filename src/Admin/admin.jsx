import { Box, Heading, HStack, Image, Spacer, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import logo from '../assets/Logo.svg'

const Admin = () => {
  return (
    <Box bg={"#131619"}  w={"100vw"} h={"100vh"}>
<HStack  p={"1%"} h={"5%"} bg={"black"}>
    <Image src={logo}/>
    <Spacer/>
    <Image src={logo}/>

</HStack>

<VStack>
    <Heading>
        Welcome Admin
    </Heading>
    <Text>Start day with managing new appointments</Text>
</VStack>
    </Box>
  )
}

export default Admin