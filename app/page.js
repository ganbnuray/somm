"use client";
import {
  Container,
  Box,
  Typography,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import { La_Belle_Aurore, Lato } from "next/font/google";
const labelloaurore = La_Belle_Aurore({
  subsets: ["latin"],
  weight: ["400"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Home() {
  const theme = createTheme({
    typography: {
      fontFamily: `${lato.style.fontFamily}, sans-serif`,
    },
  });
  const { isSignedIn } = useAuth();
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
          id="main"
          sx={{
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              paddingBottom: 2,
              [theme.breakpoints.up("xs")]: {
                fontSize: "1.6rem", // Use fontSize instead of variant for responsiveness
              },
              [theme.breakpoints.up("sm")]: {
                fontSize: "3rem",
              },
              width: { xs: "90%", lg: "60%" },
              fontFamily: `${lato.style.fontFamily}, sans-serif`,
            }}
          >
            The world of wines at your fingertips
          </Typography>

          <Typography
            variant="h6"
            sx={{
              width: { xs: "90%", lg: "60%" },
              fontFamily: `${lato.style.fontFamily}, sans-serif`,
            }}
            mb={3}
          >
            Since its establishment in 1969, only 279 professionals worldwide
            have earned the prestigious title of Master Sommelier. The journey
            to becoming a sommelier is incredibly challenging, requiring
            extensive knowledge, practical experience, and continuous learning.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              width: { xs: "90%", lg: "60%" },
              fontFamily: `${lato.style.fontFamily}, sans-serif`,
            }}
          >
            Our AI solution offers an accessible alternative, providing
            personalized wine recommendations tailored to your taste
            preferences. Whether you are a connoisseur or a casual sipper, we
            help you find the perfect bottle.
          </Typography>

          <Button
            href={isSignedIn ? "/chat" : "/sign-up"}
            variant="contained"
            sx={{
              marginTop: 3,
              backgroundColor: "#85122A",
              borderRadius: "15px",
              ":hover": {
                backgroundColor: "#610e1f",
              },
            }}
          >
            <Typography
              sx={{
                textTransform: "none",
                paddingX: 2,
                paddingY: 0.5,
                fontWeight: "bold",
              }}
            >
              <SignedOut>Get started</SignedOut>
              <SignedIn>Continue</SignedIn>
            </Typography>
          </Button>
        </Box>

        {/* <Box
          id="footer"
          width="100vw"
          sx={{ height: "40px", backgroundColor: "#85122A", flex: "0 1 auto" }}
        >
          <Box
            sx={{
              height: "100%",
              width: "95%",
              margin: "auto",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              color="#fff"
              sx={{ fontFamily: `${lato.style.fontFamily}, sans-serif` }}
            >
              Speak Your Taste, Sip Your Wine
            </Typography>
          </Box>
        </Box> */}
      </Container>
    </ThemeProvider>
  );
}
