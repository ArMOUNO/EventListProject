import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

export const Navigation = () => {
  const location = useLocation();

  return (
    <Box  as="nav" bg={useColorModeValue("blackAlpha.700", "gray.700")}>
      <Flex justifyContent="space-between" px={4} py={2}>
        <Flex gap={4}>
          <Link to="/">
            <Text
              fontWeight="bold"
              color={location.pathname === "/" ? "teal.300" : "white"}
            >
              Events
            </Text>
          </Link>
          <>
            <Text
              style={{ cursor: 'default' }}
              fontWeight="bold"
              color={location.pathname.startsWith("/event/") ? "teal.300" : "white"}
            >
              Event
            </Text>
          </>
        </Flex>
      </Flex>
    </Box>
  );
};
