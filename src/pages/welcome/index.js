import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import AuthPortal from "../../components/AuthPortal";
import DECLogo from "../../components/logo";
import InfoIcon from "@mui/icons-material/Info";

function Welcome() {
  return (
    <Box style={{ height: "100vh !important", overflow: "hidden" }}>
      <Grid
        container
        style={{
          position: "absolute",
          width: "100vw",
          paddingTop: "1rem",
          paddingLeft: "2rem",
          paddingRight: "2rem",
        }}
        spacing={2}
      >
        <Grid item xs={8}>
          <DECLogo
            s={{
              fontFamily: "'Lato', sans-serif",
              color: { xs: "black", xl: "whitesmoke" },
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <div style={{ float: "right", margin: "auto" }}>
            <Button variant="text" size="large" startIcon={<InfoIcon />}>
              Help
            </Button>
          </div>
        </Grid>
      </Grid>
      <div
        style={{
          marginTop: "1rem",
          marginLeft: "1rem",
          position: "absolute",
          width: "100vw",
        }}
      ></div>
      <Grid style={{ height: "100vh" }} container spacing={2}>
        <Grid item md={6} xs={1} sx={{ display: { xs: "none", xl: "block" } }}>
          <Grid
            style={{
              overflowWrap: "break-word",
              wordWrap: "break-word",
              hyphens: "auto",
            }}
            container
          >
            <Typography
              variant="h1"
              ml="3rem"
              style={{
                position: "absolute",
                zIndex: "100",
                top: "35%",
                fontFamily: "'Lato', sans-serif",
                color: "whitesmoke",
              }}
            >
              <b>Teachers Portal</b>
              <Typography variant="h5" ml="1rem">
                Enter your credentials to gain access
              </Typography>
            </Typography>
            <Grid
              style={{ minHeight: "100vh", backgroundColor: "#008F7A" }}
              item
              xs={8}
            >
              {/* <div style={{ marginTop: "1rem", marginLeft: "1rem" }}>
                <DECLogo />
              </div> */}
            </Grid>
            <Grid item xs={4}>
              <svg
                width="100%"
                height="100vh"
                preserveAspectRatio="xMaxYMin meet"
              >
                <g transform="skewX(168)">
                  <rect
                    fill="#008F7A"
                    x="0"
                    y="0"
                    height="100%"
                    width="100%"
                  ></rect>
                </g>
              </svg>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} xl={6}>
          <AuthPortal />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Welcome;
