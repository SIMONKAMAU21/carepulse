import React from 'react';
import { Input, InputGroup, InputLeftElement, FormControl, FormLabel, useColorMode } from '@chakra-ui/react';

const CustomInputs = ({ label,value, placeholder, icon: IconComponent,width, type = "text", ...rest }) => {
  const { colorMode } = useColorMode();

  return (
    <FormControl color={colorMode === "light" ? "black" :"gray.100"}>
      {label && <FormLabel mt={"10px"}>{label}</FormLabel>}
      <InputGroup>
        {IconComponent && (
          <InputLeftElement pointerEvents="none">
            <IconComponent />
          </InputLeftElement>
        )}
        <Input 
          type={type} 
          value={value}
          border={"1px solid gray"}
          placeholder={placeholder} 
          {...rest} 
          w={width}
          variant={"outline"}
          isRequired
        />
      </InputGroup>
    </FormControl>


  );
};

export default CustomInputs;
