import { Box, Button, Grid, GridItem, HStack, Center } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumber = [];

  const pageSize = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= pageSize; i++) {
    pageNumber.push(i);
  }

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <Center>
        <Box mb="30px">
          <Grid templateColumns={1} gap={6}>
            <HStack mt={5}>
              {pageNumber.map((number) => (
                <GridItem>
                  <Button
                    onClick={() => paginate(number)}
                    borderRadius={15}
                    color={"#000"}
                    _hover={{ bg: "#66ccff", color: " black" }}
                  >
                    {number}
                  </Button>
                </GridItem>
              ))}
            </HStack>
          </Grid>
        </Box>
      </Center>
    </>
  );
};

export default Pagination;
