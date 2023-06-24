import React from "react";
import { Typography } from "@mui/material";
import theme from "../theme";

const SectionHeading = ({ text, align = "center" }) => {
  const colors = theme.palette;
  return (
    <Typography color={colors.primary.light} fontWeight={700} textAlign={align}>
      {text}
    </Typography>
  );
};

export default SectionHeading;
