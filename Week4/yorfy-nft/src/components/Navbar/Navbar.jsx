import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import theme from "../../theme";
import ImageListItem from "@mui/material/ImageListItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Logo from "../../assets/navbar/Logo.svg";
import LogoWithText from "../LogoWithText";

const pages = ["Home", "NFT", "Roadmap", "About Us", "Contact Us", "Pages"];

function Navbar() {
  const colors = theme.palette;
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [isHomeMenuOpen, setIsHomeMenuOpen] = React.useState(false);
  const [isPagesMenuOpen, setIsPagesMenuOpen] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "transparent",
        boxShadow: "none",
        color: colors.text.black,
        padding: { xs: "4px 2px", md: "4px 45px" },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* desktop logo yorfy */}
          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <LogoWithText text="YORFY"/>
          </Box>

          {/* mobile toggler icon starts */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* mobile toggler icon ends */}

          {/* navbar links desktop */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  textTransform: "initial",
                  fontWeight: "light",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {page}&nbsp;
                {page === "Home" || page === "Pages" ? (
                  <ArrowDropDownIcon fontSize="12px" />
                ) : (
                  ""
                )}
              </Button>
            ))}
          </Box>

          {/* desktop Join us button */}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ p: 0 }}>
              <Button
                sx={{
                  color: colors.text.white,
                  background: colors.primary.main,
                  padding: "8px 32px",
                  borderRadius: "8px",
                  fontWeight: 400,
                  textTransform: "initial",
                }}
              >
                Join Us
              </Button>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
