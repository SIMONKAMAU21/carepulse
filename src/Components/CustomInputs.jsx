import React from 'react';
import { Input, InputGroup, InputLeftElement, FormControl, FormLabel, useColorMode } from '@chakra-ui/react';

const CustomInputs = ({ label, value, placeholder, fontSize, icon: IconComponent, width, name, onChange,accept, variant,type, ...rest }) => {
  const { colorMode } = useColorMode();

  return (
    <FormControl color={colorMode === "light" ? "black" : "gray.100"}>
      {label && <FormLabel mt={"1%"} fontSize={fontSize}>{label}</FormLabel>}
      <InputGroup>
        {IconComponent && (
          <InputLeftElement pointerEvents="none">
            <IconComponent />
          </InputLeftElement>
        )}
        <Input
          type={type}
          value={value}
          fontSize={fontSize}
          onChange={onChange}
          name={name}
          variant={variant}
          borderBottom={"1px solid gray"}
          placeholder={placeholder}
          {...rest}
          accept={accept}
          w={width}
          // variant={"outline"}
          isRequired
        />
      </InputGroup>
    </FormControl>


  );
};

export default CustomInputs;
