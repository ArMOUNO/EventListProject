import React from 'react'
import { Button } from '@chakra-ui/react';
import {  EditIcon } from "@chakra-ui/icons";
const EditButtonReuse = ({onEdit}) => {
 
  return (
    <div>
      <Button
      bg="blue.500"
      color="white"
      padding={"1.5"}
      marginBottom={"-0.5"}
      marginTop={"-0.5"}
      borderRadius="sm"
      _hover={{ bg: "blue.400" }}
      onClick={onEdit}
      width="70px"
      height="30px"
    >
      Edit <EditIcon ml={1} /> 
    </Button>
    </div>
  )
}

export default EditButtonReuse
