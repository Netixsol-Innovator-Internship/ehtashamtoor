import React from "react";
import { Typography, ImageListItem, Stack } from "@mui/material";
import Logo from "../assets/navbar/Logo.svg";
import theme from "../theme";

const LogoWithText = () => {
  const colors = theme.palette;
  return (
    <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
      <ImageListItem sx={{ width: 40, height: 40 }}>
        <img src={Logo} alt="Yorfy-logo" />
      </ImageListItem>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontWeight: 700,
          letterSpacing: ".1rem",
          color: "inherit",
          fontSize: "1.4rem",
          textDecoration: "none",
          color: colors.text.white,
        }}
      >
        YORFY
      </Typography>
    </Stack>
  );
};

export default LogoWithText;
