import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Navbar from "./components/Navbar/Navbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React from "react";
import Hero from "./components/Hero/Hero";
import bg from "./assets/hero/Cover.png";
function App() {
  const colors = theme.palette;
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth={"xl"}
        sx={{
          background: `url(${bg}) no-repeat`,
          borderRadius: "0px",
          backgroundSize: "100% 100%",
          padding: "0 !important",
        }}
      >
        {/* Navbar start */}
        <Box sx={{}}>
          <Navbar />
        </Box>
        {/* Navbar End */}

        {/* Hero Section starts*/}
        <Hero />
        {/* Hero Section ends */}
      </Container>
    </ThemeProvider>
  );
}

export default App;
