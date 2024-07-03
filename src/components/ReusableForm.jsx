import React from 'react';
import { Box, FormControl, FormLabel, Input, Select, FormErrorMessage, VStack } from "@chakra-ui/react";

const ReusableForm = ({
  label1 = "",
  label2 = "",
  label3 = "",
  label4 = "",
  label5 = "",
  label6 = "",
  type1 = "",
  type2 = "",
  type3 = "",
  type4 = "",
  
  type5 = "",
  name1 = "",
  name2 = "",
  name3 = "",
  name4 = "",
  name5 = "",
  name6 = "",
  register = () => {},
  required = true,
  error = {},
  categories = []
}) => {

  return (
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="lg">
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!error[name1]}>
          <FormLabel>{label1} {required && <span style={{ color: 'red' }}>*</span>}</FormLabel>
          <Input {...register(name1, { required: required && 'Please fill-up this field' })} type={type1} />
          <FormErrorMessage>{error[name1]?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!error[name2]}>
          <FormLabel>{label2} {required && <span style={{ color: 'red' }}>*</span>}</FormLabel>
          <Input {...register(name2, { required: required && 'Please fill-up this field' })} type={type2} />
          <FormErrorMessage>{error[name2]?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!error[name3]}>
          <FormLabel>{label3} {required && <span style={{ color: 'red' }}>*</span>}</FormLabel>
          <Input {...register(name3, { required: required && 'Please fill-up this field' })} type={type3} />
          <FormErrorMessage>{error[name3]?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!error[name4]}>
          <FormLabel>{label4} {required && <span style={{ color: 'red' }}>*</span>}</FormLabel>
          <Input {...register(name4, { required: required && 'Please fill-up this field' })} type={type4} />
          <FormErrorMessage>{error[name4]?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!error[name5]}>
          <FormLabel style={{ fontWeight: 'bold' }} htmlFor="categoryIds">{label5} {required && <span style={{ color: 'red' }}>*</span>}</FormLabel><br />
          <Select {...register(name5, { required: required && 'Please select a category' })}>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{error[name5]?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!error[name6]}>
          <FormLabel>{label6} {required && <span style={{ color: 'red' }}>*</span>}</FormLabel>
          <Input {...register(name6, {
            required: required && 'Please fill-up this field.',
          })} type={type5} />
          <FormErrorMessage>{error[name6]?.message}</FormErrorMessage>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default ReusableForm;
