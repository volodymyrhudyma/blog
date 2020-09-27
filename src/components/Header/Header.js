import React from "react"
import { Link } from "gatsby"
import { ReactSVG } from "react-svg"

import {
  Wrapper,
  Navigation,
  MenuList,
  MenuItem,
  IconList,
  IconItem,
  StyledSearchIcon,
} from "./styles"

const Header = () => (
  <Wrapper>
    <Navigation>
      <MenuList>
        <MenuItem>
          <Link to="/">Home</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/2020-05-01-a-few-words-about-author/">About</Link>
        </MenuItem>
        <MenuItem>
          <Link target="_blank" to="https://www.vhudyma-portfolio.eu/">
            Contact
          </Link>
        </MenuItem>
      </MenuList>
      <IconList>
        <IconItem>
          <Link to="#">
            <ReactSVG src="/icons/linkedin.svg" />
          </Link>
        </IconItem>
        <IconItem>
          <Link to="#">
            <ReactSVG src="/icons/twitter.svg" />
          </Link>
        </IconItem>
        <IconItem>
          <Link to="#">
            <ReactSVG src="/icons/github.svg" />
          </Link>
        </IconItem>
        <IconItem>
          <Link to="#">
            <ReactSVG src="/icons/instagram.svg" />
          </Link>
        </IconItem>
        <IconItem noBg>
          <Link to="#">
            <StyledSearchIcon />
          </Link>
        </IconItem>
      </IconList>
    </Navigation>
  </Wrapper>
)

export default Header
