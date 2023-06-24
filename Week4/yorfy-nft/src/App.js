import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Navbar from "./components/Navbar/Navbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React from "react";
import Hero from "./components/Hero/Hero";
import bg from "./assets/hero/Cover.png";
import Footer from "./components/Footer/Footer";
function App() {
  const colors = theme.palette;
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth={"xl"}
        sx={{
          borderRadius: "0px",
          background: `url(${bg}) no-repeat`,
          backgroundSize: { xs: "cover", md: "100% 100%" },
          padding: "0 !important",
        }}
      >
        {/* Navbar start */}
        <Navbar />

        {/* Navbar End */}

        {/* Hero Section starts*/}
        <Hero />
        {/* Hero Section ends */}
        <Container
          sx={{
            padding: "2.5rem 1.9rem !important",
          }}
        >
          {/* Footer starts */}
          <Footer />
        </Container>
        {/* Footer ends */}
      </Container>
    </ThemeProvider>
  );
}

export default App;
