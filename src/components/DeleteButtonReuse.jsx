import React from 'react';
import { Button, } from '@chakra-ui/react';
import { DeleteIcon, } from "@chakra-ui/icons";
const DeleteButtonReuse = ({ onClick } ) => {
  return (
    <Button
      bg="red.500"
      color="white"
      padding={"1.5"}
      borderRadius="sm"
      _hover={{ bg: "red.400" }}
      width="70px"
      height="30px"
      onClick={onClick}
    >
      Delete<DeleteIcon  /> 
    </Button>
  );
};

export default DeleteButtonReuse;

