import React from 'react'
import { Button } from '@chakra-ui/react';
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
      width="60px"
      height="30px"
    >
      Edit
    </Button>
    </div>
  )
}

export default EditButtonReuse
