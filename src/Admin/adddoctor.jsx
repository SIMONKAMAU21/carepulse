import React from "react";
import Header from "../Components/header";
import { Box, Image } from "@chakra-ui/react";
import AuthWrapper from "../Components/OnboarndingWrapper";
import illustration from "../assets/doc.png";

const Adddoctor = () => {
  return (
    <>
      <AuthWrapper
          leftChildren={<><Box bg={"#131619"} color={"white"} w={"100vw"} h={"100%"} p={4}>
          <Header width={{ base: "90%", md: "50%" }}/>
  
        
        </Box></>}
          rightChildren={
            <>
              <Box height="100%" width="100%">
                <Image
                  src={illustration}
                  alt="Illustration"
                  height="100%"
                  width="100%"
                  objectFit="cover"
                />
              </Box>
              woow
            </>
          }
        />
      
    </>
  );
};

export default Adddoctor;
