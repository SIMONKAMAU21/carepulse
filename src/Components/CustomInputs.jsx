import React from 'react';
import { Input, InputGroup, InputLeftElement, FormControl, FormLabel } from '@chakra-ui/react';

const CustomInputs = ({ label,value, placeholder, icon: IconComponent,width, type = "text", ...rest }) => {
  return (
    <FormControl>
      {label && <FormLabel mt={"10px"}>{label}</FormLabel>}
      <InputGroup>
        {IconComponent && (
          <InputLeftElement pointerEvents="none">
            <IconComponent color="gray.300" />
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
