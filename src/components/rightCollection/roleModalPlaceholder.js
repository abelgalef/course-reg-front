import React from 'react'
import {Skeleton, Grid, Divider} from "@mui/material"
function RolePlaceholder() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Skeleton variant="text" sx={{ fontSize: "5rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Divider style={{ marginTop: "1rem" }} />
      </Grid>
      <Grid item spacing={4} xs={8}>
        <Grid container rowSpacing={4} columnSpacing={4}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </Grid>
        </Grid>
        <Grid container rowSpacing={4} sx={{ mt: "3rem", }}>
          <Grid item xs={6} >
            <Skeleton variant="rounded"  height={60} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton variant="rounded"  height={60} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Skeleton variant="rounded" height={400} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant="rounded" height={200} />
      </Grid>
    </Grid>
  );
}

export default RolePlaceholder