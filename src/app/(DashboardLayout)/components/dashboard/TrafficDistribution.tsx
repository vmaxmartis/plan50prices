import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Stack,
  Typography,
  Avatar,
  Box,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { IconArrowUpLeft, IconArrowDownLeft } from "@tabler/icons-react";

import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import React from "react";
interface Props {
  type: boolean;
  profit: number;
  numOfMatch: number;
}
const TrafficDistribution: React.FC<Props> = ({ type, profit, numOfMatch }) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const error = theme.palette.error.main;
  const secondary = theme.palette.secondary.light;
  const success = theme.palette.success.dark;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 170,
    },
    colors: [Number(profit) > 0 ? success : error, "#d2d2d2"],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 800,
        options: {
          chart: {
            width: 126,
          },
        },
      },
    ],
  };
  const seriescolumnchart: any = [50000 - profit, profit];

  return (
    <Box sx={{ minWidth: "45%" }}>
      <DashboardCard title="Traffic Distribution">
        <Grid container spacing={3}>
          {/* column */}
          <Grid item xs={6} sm={7}>
            <Typography variant="h3" fontWeight="700">
              {Number(50000 + profit).toFixed(0)} USC
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              mt={1}
              alignItems="center"
            >
              <Stack direction="row">
                <Avatar
                  sx={{ bgcolor: "#f5f5f5", mr: 1, width: 21, height: 21 }}
                >
                  {profit > 0 ? (
                    <IconArrowUpLeft
                      width={18}
                      color={theme.palette.success.main}
                    />
                  ) : (
                    <IconArrowDownLeft
                      width={18}
                      color={theme.palette.error.main}
                    />
                  )}
                </Avatar>
                <Typography variant="subtitle2" fontWeight="600">
                  {type && `+`} {Number((profit * 100) / 50000).toFixed(2)} %
                </Typography>
              </Stack>
              <Typography variant="subtitle2" color="textSecondary">
                total
              </Typography>
            </Stack>
            <Stack spacing={3} mt={3} direction="row">
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  sx={{
                    width: 9,
                    height: 9,
                    bgcolor: "#d2d2d2",
                    svg: { display: "none" },
                  }}
                ></Avatar>
                <Typography
                  variant="subtitle2"
                  fontSize="12px"
                  color="textSecondary"
                >
                  Vốn
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  sx={{
                    width: 10,
                    height: 10,
                    bgcolor: Number(profit) > 0 ? success : error,
                    svg: { display: "none" },
                  }}
                ></Avatar>
                <Typography
                  variant="subtitle2"
                  fontSize="12px"
                  color="textSecondary"
                >
                  Profit
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          {/* column */}
          <Grid item xs={6} sm={5}>
            {/* <Chart
              options={optionscolumnchart}
              series={seriescolumnchart}
              type="donut"
              width={"100%"}
              height="150px"
            /> */}
            <Tooltip title={`${numOfMatch}/50`} followCursor>
              <CircularProgress
                variant="determinate"
                size={80}
                value={Number((numOfMatch) / 50)}
                color={profit > 0 ? "success" : "error"}
                // variant="indeterminate"
                thickness={6}
              />
            </Tooltip>
            <Tooltip title={`${Number(profit).toFixed(2)} usc`} followCursor>
              <CircularProgress
                variant="determinate"
                size={80}
                value={Number((profit * 100)/50000)}
                color={profit > 0 ? "success" : "error"}
                // variant="indeterminate"
                thickness={6}
              />
            </Tooltip>
          </Grid>
        </Grid>
      </DashboardCard>
    </Box>
  );
};

export default TrafficDistribution;
