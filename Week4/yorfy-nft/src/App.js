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
import NewsLetter from "./components/Newsletter/NewsLetter";
import Collaboration from "./components/Collaboration/Collaboration";
import Discount from "./components/Discount/Discount";
import Community from "./components/Community/Community";
import Collection from "./components/collection/Collection";
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

        {/* Discount starts */}
        <Box sx={{ margin: "5rem 0", padding: "0" }}>
          <Discount />
        </Box>
        {/* Discount ends */}

        {/* Collection starts */}
        <Collection />
        {/* Collection ends */}

        {/* Community starts */}
        <Box sx={{ margin: "5rem 0", padding: "0" }}>
          <Community />
        </Box>
        {/* Community ends */}
          
        {/* Discount starts */}
        <Box sx={{ margin: "5rem 0", padding: "0" }}>
          <Discount />
        </Box>
        {/* Discount ends */}

        {/* Collaboration starts */}
        <Box sx={{ margin: "5rem 0", padding: "0" }}>
          <Collaboration />
        </Box>
        {/* Collaboration ends */}

        {/* Newsletter starts */}
        <Box
          sx={{ margin: "5rem 0" }}
          padding={{ xs: "1rem 1rem", md: "4rem 4.5rem" }}
        >
          <NewsLetter />
        </Box>
        {/* Newsletter ends */}
        {/* Footer starts */}
        <Box
          sx={{ margin: "5rem 0" }}
          padding={{ xs: "1rem 1rem", md: "4rem 4.5rem" }}
        >
          <Footer />
        </Box>
        {/* Footer ends */}
      </Container>
    </ThemeProvider>
  );
}

export default App;
