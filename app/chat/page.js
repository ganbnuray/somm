"use client";
import {
  Box,
  Button,
  Stack,
  TextField,
  Container,
  ThemeProvider,
  createTheme,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { RedirectToSignIn } from "@clerk/nextjs";

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

export default function Generate() {
  useEffect(() => {
    document.title = "Somm | Chat";
  }, []);
  const theme = createTheme({
    typography: {
      fontFamily: `${lato.style.fontFamily}, sans-serif`,
    },
  });
  const { isSignedIn } = useAuth();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! I'm the AI Sommelier assistant. How can I help you today?`,
    },
  ]);
  const [message, setMessage] = useState("");
  const sendMessage = async () => {
    // Clear the message input
    setMessage("");

    // Add the user's message to the state
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    try {
      // Await the fetch call to ensure the response is handled correctly
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      });

      // Handle the response stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      const processText = async ({ done, value }) => {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), {
          stream: true,
        });
        result += text;

        // Update the assistant's message content
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });

        // Continue reading the stream
        return reader.read().then(processText);
      };

      await reader.read().then(processText);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const styles = {
    ul: {
      listStyleType: "none", // Remove bullet points
      padding: 0, // Remove padding
      margin: 1, // Remove margin
    },
    ol: {
      listStyleType: "none", // Remove bullet points
      padding: 0, // Remove padding
      margin: 0, // Remove margin
    },
    li: {
      padding: 0,
      marginBottom: "20px",
      marginTop: "20px", // Remove padding from list items
    },
  };
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
          <Stack
            direction={"column"}
            sx={{
              width: {
                xs: "95%",
                md: "50%",
              },
              height: "80vh",
            }}
            width="95%"
            border="none"
            borderRadius="10px"
            //p={2}
            spacing={3}
            bgcolor="#0E0D0D"
          >
            <Box
              sx={{
                width: "100%",
                borderTopRightRadius: "10px",
                borderTopLeftRadius: "10px",
                bgcolor: "#303030",
                paddingY: 1,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  margin: "auto",
                  paddingX: 2,
                  paddingY: 0.5,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box component={"img"} src="wine.svg" width="20px" mr={1} />
                <Box>
                  <Typography fontSize="1.2rem">Wine Recommendation</Typography>
                </Box>
              </Box>
            </Box>
            <Stack
              direction={"column"}
              spacing={2}
              flexGrow={1}
              p={2}
              overflow="auto"
              maxHeight="100%"
            >
              {messages.map((message, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent={
                    message.role === "assistant" ? "flex-start" : "flex-end"
                  }
                >
                  <Box
                    bgcolor={
                      message.role === "assistant" ? "#85122A" : "#303030"
                    }
                    color="#fbf7f5"
                    borderRadius="10px"
                    sx={{
                      width: {
                        xs: "90%", // 90% width on extra-small screens
                        md: message.role === "assistant" ? "70%" : "40%", // 70% or 40% width on small screens and up
                      },
                    }}
                    p={3}
                  >
                    <ReactMarkdown
                      components={{
                        ul: ({ node, ...props }) => (
                          <ul style={styles.ul} {...props} />
                        ),
                        ol: ({ node, ...props }) => (
                          <ul style={styles.ol} {...props} />
                        ),
                        li: ({ node, ...props }) => (
                          <li style={styles.li} {...props} />
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </Box>
                </Box>
              ))}
            </Stack>
            <Stack direction={"row"} spacing={2} p={2}>
              <TextField
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{
                  flexGrow: 1, // Allow the TextField to take up the remaining space
                  borderRadius: "5px",
                  backgroundColor: "#303030",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "5px", // Add border radius to the root element
                    "& fieldset": {
                      border: "none", // Remove the border
                      borderRadius: "5px", // Ensure the border radius is applied to the fieldset
                    },
                    "&:hover fieldset": {
                      border: "none", // Remove the border on hover
                    },
                    "&.Mui-focused fieldset": {
                      border: "3px solid #85122A", // Change outline color when focused
                    },
                    "& input": {
                      color: "#fff", // Change text color to white for better contrast
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={sendMessage}
                sx={{
                  paddingX: 4,
                  height: "56px",
                  borderRadius: "5px",
                  backgroundColor: "#85122A",
                  ":hover": {
                    backgroundColor: "#610e1f",
                  },
                }}
              >
                <Typography sx={{ textTransform: "none" }}>Send</Typography>
              </Button>
            </Stack>
          </Stack>
        </Box>

        <SignedOut>
          <RedirectToSignIn redirectUrl="/sign-in" />
        </SignedOut>
      </Container>
    </ThemeProvider>
  );
}
