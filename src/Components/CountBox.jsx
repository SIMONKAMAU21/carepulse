import { Box, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const CountBox = ({icon,count,title,gradient}) => {
  return (
    <Box
        //   bgGradient=""
        bgGradient={gradient}
          p={{ base: "2", md: "4" }}
          borderRadius="md"
          shadow="md"
          w={{base:"100%",md:"100%"}}
          // h={{ base: "auto", md: "auto" }}
        >
          <VStack align="start">
            <HStack>
              <Icon
                as={icon}
                boxSize={{ base: 6, md: 8 }}
                color="rgb(255,209,71)"
              />
              <Heading size={{ base: "md", md: "lg" }}>
                {count}
              </Heading>
            </HStack>
            <Text fontWeight={{base:"bold",md:"bold"}} fontSize={{ base: "12px", md: "lg" }}>
                {title}
            </Text>
          </VStack>
        </Box>
  )
}

export default CountBox