import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Text,
  Avatar,
} from "@chakra-ui/react";

const PaginatedTable = ({ data, columns, itemsPerPage = 10, renderActions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Table variant="simple" colorScheme="whiteAlpha" size="md">
        <Thead>
          <Tr>
            {columns.map((column, index) => (
              <Th key={index}>{column.header}</Th>
            ))}
            {renderActions && <Th>Actions</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {currentData.map((row) => (
            <Tr key={row.$id}>
              {columns.map((column, index) => (
                <Td key={index}>
                  {column.render ? column.render(row) : row[column.field]}
                </Td>
              ))}
              {renderActions && (
                <Td>
                  {renderActions(row)} {/* Render custom action buttons */}
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Pagination Controls */}
      <HStack justifyContent="center" mt={4}>
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        <Text>{currentPage} of {totalPages}</Text>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </HStack>
    </>
  );
};

export default PaginatedTable;
