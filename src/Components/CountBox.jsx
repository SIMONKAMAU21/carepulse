import { Box, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";

const CountBox = ({ icon, count, title, gradient, clickMe, disable }) => {
  return (
    <Box
      bgGradient={gradient}
      p={{ base: "2", md: "4" }}
      borderRadius="md"
      boxShadow="dark-lg"
      w={{ base: "100%", md: "100%" }}
      onClick={clickMe}
      _hover={{cursor:"pointer", boxShadow: `0px 14px 15px ${gradient.match(/#[0-9A-Fa-f]{6}/g)?.[1] || "rgba(0,0,0,0.12)"}`,
      
    }}
    transition="box-shadow 0.3s ease" // Smooth hover effect
    >
      <VStack align="start">
        <HStack>
          <Icon
            as={icon}
            boxSize={{ base: 6, md: 8 }}
            color="rgb(255,209,71)"
          />
          <Heading size={{ base: "md", md: "lg" }}>{count}</Heading>
        </HStack>
        <Text
          fontWeight={{ base: "bold", md: "bold" }}
          fontSize={{ base: "12px", md: "lg" }}
        >
          {title}
        </Text>
      </VStack>
    </Box>
  );
};

export default CountBox;
