import { Input, InputGroup, InputLeftElement, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchInput = ({value,onChange,placeholder}) => {
  const { colorMode } = useColorMode();

  return (
    <InputGroup bg={colorMode === "light" ?  "gray.200" :" none"}>
    <InputLeftElement pointerEvents="none">
      <FaSearch color={colorMode === "dark" ? "gray" :"black"} />
    </InputLeftElement>
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </InputGroup>  )
}

export default SearchInput