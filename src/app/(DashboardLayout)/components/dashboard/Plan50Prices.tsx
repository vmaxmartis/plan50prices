import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Paper,
  CardContent,
  TextField,
} from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
import generateOPT from "@/app/handleEntry/generatePlanEntry";
import { calculateProfit } from "@/app/handleEntry/calculateProfit";
import Eprop from "@/app/Interface/iEntryPlan";
import { listLot } from "@/app/dummyData/planLot";
import { useState, useEffect } from "react";
import { fetchAPI_XAU } from "@/app/handleEntry/fetchPriceXAU";
import BlankCard from "../shared/BlankCard";
import IGold from "@/app/Interface/IGold";

const Plan50Prices = () => {
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [entryInit, setEntryInit] = useState<number>(2000);
  const [type, setType] = useState<boolean>(false);
  console.log("currentprice:12321", currentPrice);

  const fetchXAU = async () => {
    await fetchAPI_XAU().then((res) => {
      setCurrentPrice(res?.data.values[0].open);
    });
  }

  useEffect(() => {
    fetchXAU()
  }, []);
  const planEntry = generateOPT(type, listLot, currentPrice, 0.5, 50);
  console.log("planEntry:", planEntry);
  return (
    <DashboardCard title="Plan to place orders at 50 prices">
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <BlankCard>
            <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 4 }}>
                <TextField placeholder={currentPrice.toString()} />
              </Box>
              <Box>
                <Typography
                  variant="h2"
                  sx={{ color: (theme) => theme.palette.success.main }}
                  fontWeight={700}
                >
                  {currentPrice}
                </Typography>
              </Box>
            </CardContent>
          </BlankCard>
          <Table
            sx={{
              whiteSpace: "nowrap",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h5" fontWeight={600}>
                    Id
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5" fontWeight={600}>
                    Volumn
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5" fontWeight={600}>
                    Entry
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5" fontWeight={600}>
                    Total Vol
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5" fontWeight={600}>
                    Point TP
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h5" pr={1} fontWeight={600}>
                    Profit
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {planEntry.map((plan: Eprop) => {
                const frofit = calculateProfit(
                  plan,
                  currentPrice,
                  type
                );
                return (
                  <TableRow key={plan.id}>
                    <TableCell>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "500",
                        }}
                      >
                        {plan.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={400}
                      >
                        {plan.vol} lot
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {plan.entry}
                          </Typography>
                          <Typography
                            color="textSecondary"
                            sx={{
                              fontSize: "13px",
                            }}
                          >
                            {plan.avgEntry.toFixed(3)}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={400}
                      >
                        {plan.sumVol.toFixed(2)} lot
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        sx={{
                          px: "4px",
                          color: "#000",
                        }}
                        size="small"
                        label={plan.pTP?.toFixed(2) || "0"}
                      ></Chip>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6">
                        {frofit.profit === undefined
                          ? 0
                          : frofit.profit.toFixed(1)}{" "}
                        USC
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default Plan50Prices;
