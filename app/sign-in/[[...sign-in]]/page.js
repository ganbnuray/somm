"use client";
import {
  Container,
  Typography,
  Box,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { SignIn } from "@clerk/nextjs";
import { useEffect } from "react";
import { La_Belle_Aurore, Lato } from "next/font/google";

const labelloaurore = La_Belle_Aurore({
  subsets: ["latin"],
  weight: ["400"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const theme = createTheme({
  typography: {
    fontFamily: `${lato.style.fontFamily}, sans-serif`,
  },
});
export default function SignUpPage() {
  useEffect(() => {
    document.title = "Somm | Log in";
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <>
        <link rel="icon" href="wine.svg" />
      </>
      <Container
        maxWidth={"false"}
        disableGutters
        width="100vw"
        margin="auto"
        height="100vh"
        sx={{
          backgroundImage: "url('herobg.jpg')",
          height: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          id="navbar"
          height="60px"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingY: 1,
            backgroundColor: "transparent",
            flex: "0 1 auto",
          }}
        >
          <Box
            sx={{
              width: "95%",
              margin: "auto",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "2rem",
                  fontFamily: `${labelloaurore.style.fontFamily}, sans-serif`,
                }}
              >
                Somm
              </Typography>
              <Button
                href="/"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    ":hover": {
                      color: "#EBE9ED",
                    },
                  }}
                >
                  Home
                </Typography>
              </Button>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <SignedOut>
                <Button
                  sx={{
                    textTransform: "none",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    ":hover": {
                      backgroundColor: "#610e1f",
                    },
                  }}
                  variant="contained"
                  href="/sign-in"
                >
                  <Typography
                    sx={{
                      ":hover": {
                        color: "#EBE9ED",
                      },
                    }}
                  >
                    Log in
                  </Typography>
                </Button>
                <Button
                  sx={{
                    textTransform: "none",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    ":hover": {
                      backgroundColor: "#610e1f",
                    },
                  }}
                  variant="contained"
                  href="/sign-up"
                >
                  <Typography
                    sx={{
                      ":hover": {
                        color: "#EBE9ED",
                      },
                    }}
                  >
                    Sign up
                  </Typography>
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: "1 1 auto",
          }}
        >
          <SignIn />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
