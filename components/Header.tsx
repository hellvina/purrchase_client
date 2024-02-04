import { ReactNode } from "react";
import {
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import Logo from "./Logo";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";
import { HamburgerIcon } from "@chakra-ui/icons";

const Header = (): ReactNode => {
  const matches_768 = useMediaQuery("(min-width: 768px)");
  const smallerThan768 = useMediaQuery("(max-width: 768px)");

  if (matches_768) {
    return (
      <Flex gap={6} alignItems="center" padding="1em" bgColor="raising_grey">
        <Link href="/">
          <Logo />
        </Link>
        <Spacer />
        <Button width="fit-content">Entrar</Button>
        <Button bgColor="tropical_indigo">Cadastrar-se</Button>
      </Flex>
    );
  }

  if (smallerThan768) {
    return (
      <Flex gap={6} alignItems="center" padding="1em" bgColor="raising_grey">
        <Link href="/">
          <Logo />
        </Link>
        <Spacer />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem>Entrar</MenuItem>
            <MenuItem>Cadastrar-se</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    );
  }
};
export default Header;
