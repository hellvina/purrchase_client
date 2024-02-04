import { ReactNode } from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";

const Header = (): ReactNode => {
  return (
    <Flex>
      <Box p="4" bg="red.400">
        Box 1
      </Box>
      <Spacer />
      <Box p="4" bg="green.400">
        Box 2
      </Box>
    </Flex>
  );
};
export default Header;
