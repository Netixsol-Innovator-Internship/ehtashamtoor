import React from "react";
import { Typography, Stack, Grid, Box } from "@mui/material";
import theme from "../../theme";
import SectionHeading from "../SectionHeading";
import Buttton from "../Button";

const CommunitySlider = () => {
  const colors = theme.palette;
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height={300}
    >
      <Box
        bgcolor={colors.primary.dark}
        color="white"
        sx={{
          zIndex: 12,
          opacity: 1,
          boxShadow: "0px 0px 20px 8px rgba(0, 0, 0, 0.8)",
          borderRadius: "8px",
        }}
        padding={2}
        marginBottom={1}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={{ xs: "2rem", sm: "8rem" }}
        >
          <Stack direction="row" gap={"1rem"}>
            <Box
              width="3rem"
              height="3rem"
              sx={{ background: "white", borderRadius: "50%" }}
            ></Box>
            <Stack gap="0.2rem">
              <Typography variant={"h6"} color={colors.text.white}>
                ShooParDie
              </Typography>
              <Typography fontSize={"0.6rem"} color={colors.text.white}>
                Last Online 2 hours ago
              </Typography>
            </Stack>
          </Stack>
          <Typography fontSize="1.2rem">...</Typography>
        </Stack>
      </Box>

      <Box
        bgcolor={colors.primary.dark}
        color="white"
        sx={{
          zIndex: 11,
          opacity: 0.9,
          boxShadow: "0px 0px 20px 6px rgba(0, 0, 0, 0.8)",
          borderRadius: "8px",
        }}
        padding={2}
        marginBottom={1}
        marginLeft={{ xs: 0, sm: 3 }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={{ xs: "2rem", sm: "8rem" }}
        >
          <Stack direction="row" gap={"1rem"}>
            <Box
              width="3rem"
              height="3rem"
              sx={{ background: "white", borderRadius: "50%" }}
            ></Box>
            <Stack gap="0.2rem">
              <Typography variant={"h6"} color={colors.text.white}>
                ShooParDie
              </Typography>
              <Typography fontSize={"0.6rem"} color={colors.text.white}>
                Last Online 2 hours ago
              </Typography>
            </Stack>
          </Stack>
          <Typography fontSize="1.2rem">...</Typography>
        </Stack>
      </Box>
      <Box
        bgcolor={colors.primary.dark}
        color="white"
        sx={{
          zIndex: 10,
          opacity: 0.5,
          boxShadow: "0px 0px 20px 6px rgba(0, 0, 0, 0.8)",
          borderRadius: "8px",
        }}
        padding={2}
        marginBottom={1}
        marginLeft={{ xs: 0, sm: 6 }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={{ xs: "2rem", sm: "8rem" }}
        >
          <Stack direction="row" gap={"1rem"}>
            <Box
              width="3rem"
              height="3rem"
              sx={{ background: "white", borderRadius: "50%" }}
            ></Box>
            <Stack gap="0.2rem">
              <Typography variant={"h6"} color={colors.text.white}>
                ShooParDie
              </Typography>
              <Typography fontSize={"0.6rem"} color={colors.text.white}>
                Last Online 2 hours ago
              </Typography>
            </Stack>
          </Stack>
          <Typography fontSize="1.2rem">...</Typography>
        </Stack>
      </Box>
    </Box>
  );
};

const Community = () => {
  const colors = theme.palette;
  return (
    <Grid
      container
      justifyContent={"space-between"}
      padding={{ xs: "1rem 0.5rem", md: "4rem 4.5rem" }}
    >
      <Grid item xs={12} md={7} marginY={"3rem"}>
        <Stack gap={"1.6rem"} alignItems={"baseline"}>
          <SectionHeading text="Community" align="left" />
          <Typography
            fontSize={{ xs: "2rem", md: "3rem" }}
            color={colors.text.white}
          >
            Join Our Community and Get Many Benefits
          </Typography>
          <Typography
            color={colors.text.disabled}
            fontSize="14px"
            fontWeight={300}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
          <Buttton text="Join Our Discord" bg={colors.primary.main} />
        </Stack>
      </Grid>
      <Grid
        xs={12}
        md={4}
        item
        marginY={"3rem"}
        alignItems={"center"}
        margin="auto"
      >
        <CommunitySlider />
      </Grid>
    </Grid>
  );
};

export default Community;
