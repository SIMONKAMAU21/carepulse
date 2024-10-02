import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchInput = ({value,onChange,placeholder}) => {
  return (
    <InputGroup>
    <InputLeftElement pointerEvents="none">
      <FaSearch color="gray.300" />
    </InputLeftElement>
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </InputGroup>  )
}

export default SearchInput