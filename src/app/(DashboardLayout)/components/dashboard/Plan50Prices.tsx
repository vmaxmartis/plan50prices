import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RefreshIcon from "@mui/icons-material/Refresh";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
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
  ButtonGroup,
  Button,
  InputBase,
  Input,
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
import { isHasValue } from "@/utils/helper/isHasValue";
import TrafficDistribution from "./TrafficDistribution";
import theme from "@/utils/theme";
import curState from "@/utils/helper/currentState";

const Plan50Prices = () => {
  const [currentPrice, setCurrentPrice] = useState<number>(2221.5);
  const [entryInit, setEntryInit] = useState<number>(0);
  const [targetProfit, setTargetProfit] = useState<number>(50);
  const [type, setType] = useState<boolean>(false);
  const fetchXAU = async () => {
    await fetchAPI_XAU().then((res) => {
      // setCurrentPrice(res?.data.values[0].open);
      setCurrentPrice(2221.5);
    });
  };
  const listPlan = generateOPT(
    type,
    listLot,
    entryInit,
    1.5,
    targetProfit,
    currentPrice
  );

  useEffect(() => {
    fetchXAU();
  }, []);

  useEffect(() => {
    if (entryInit === 0) {
      setEntryInit(Number(document.getElementById("entryInput")));
    }
  }, [entryInit]);

  return (
    <DashboardCard title="Plan to place orders at 50 prices">
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <BlankCard>
            <CardContent
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box sx={{ display: "block", mr: 2 }}>
                <InputBase
                  id="entryInput"
                  defaultValue={Number(currentPrice).toFixed(1)}
                  sx={{
                    border: 2,
                    borderColor: "#ebebeb",
                    maxWidth: "650px",
                    maxHeight: "63px",
                    borderRadius: "50px",
                    padding: 1,
                    fontSize: "20px",
                    paddingInline: 1,
                  }}
                  onChange={(e) => {
                    // if (Number(e.target.value) > currentPrice - 100) { setEntryInit(Number(e.target.value)) }
                    // if (Number(e.target.value) === 0) { setEntryInit(currentPrice) };
                    setEntryInit(Number(e.target.value));
                  }}
                  placeholder={Number(currentPrice).toFixed(1)}
                  startAdornment={
                    <Box sx={{ minWidth: "150px", ml: 2 }}>
                      <Typography variant="h5" fontWeight={200}>
                        Điểm vào lệnh:
                      </Typography>
                    </Box>
                  }
                  endAdornment={
                    <ButtonGroup
                      disableElevation
                      variant="contained"
                      sx={{ justifyContent: "space-between" }}
                    >
                      <InputBase
                        defaultValue={Number(targetProfit).toFixed(0)}
                        sx={{
                          borderRadius: "150px",
                          maxWidth: "90px",
                          fontSize: "20px",
                          mr: 2,
                        }}
                        onChange={(e) =>
                          setTargetProfit(Number(e.target.value))
                        }
                        placeholder={"50 Pips"}
                      />
                      <Button
                        color="error"
                        sx={{ width: type ? "100px" : "200px" }}
                        startIcon={<CallReceivedIcon />}
                        onClick={() => setType(false)}
                      >
                        Sell
                      </Button>
                      <Button
                        color="success"
                        sx={{ width: !type ? "100px" : "200px" }}
                        onClick={() => setType(true)}
                        endIcon={<CallMadeIcon />}
                      >
                        Buy{" "}
                      </Button>
                    </ButtonGroup>
                  }
                />
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "block",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "50%",
                    }}
                  >
                    <Typography variant="h6" fontWeight={400}>
                      Giá hiện tại
                    </Typography>
                    <Box><InputBase



                      sx={{ fontSize: 22,   fontWeight: 700 }}

                      defaultValue={Number(currentPrice).toFixed(2)}
                      placeholder={'Nhập giá hiện tại'}
                    /></Box>
                    <Typography mt={2} variant="h6" fontWeight={400}>
                      Giá trung bình
                    </Typography>
                    <Typography variant="subtitle2" fontSize={22}>
                      {Number(listPlan[listPlan.length - 1].avgEntry).toFixed(
                        2
                      )}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "block",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "50%",
                    }}
                  >
                    <Typography variant="h5" fontWeight={400}>
                     Lợi nhuận 
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        variant="subtitle2"
                        fontSize={45}
                        color={curState(
                          Number(listPlan[listPlan.length - 1].profit),
                          currentPrice,
                          type
                        )}
                      >
                        {`${listPlan[listPlan.length - 1].profit?.toFixed(
                          0
                        )} USC`}
                      </Typography>
                    </Box>
                    <Typography mt={2} variant="h4" fontWeight={400}>
                      Số lệnh đã khớp: {listPlan.length}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <TrafficDistribution
                type={type}
                profit={Number(listPlan[listPlan.length - 1].profit)}
                numOfMatch={listPlan.length - 1}
                numOfPlan={
                  listPlan[listPlan.length - 1].entry - listPlan[0].entry
                }
              />
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
                    Average
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
              {listPlan.map((plan: Eprop) => {
                return (
                  <TableRow
                    key={plan.id}
                    sx={{
                      bgcolor: type
                        ? plan.entry < currentPrice
                          ? "#f5f5f5"
                          : "unset"
                        : plan.entry > currentPrice
                        ? "#f5f5f5"
                        : "unset",
                    }}
                  >
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
                          <Typography
                            variant="subtitle2"
                            color={curState(plan.entry, currentPrice, type)}
                            fontWeight={600}
                          >
                            {plan.entry}
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
                          color: curState(plan.avgEntry, currentPrice, type),
                        }}
                        size="small"
                        label={plan.avgEntry.toFixed(2) || "0"}
                      ></Chip>
                    </TableCell>
                    <TableCell sx={{ display: "flex", justifyContent: "end" }}>
                      <Typography
                        variant="h6"
                        color={curState(Number(plan.entry), currentPrice, type)}
                      >
                        {plan.profit?.toFixed(0)}
                      </Typography>
                      <Typography variant="subtitle2" fontSize={10}>
                        ` USC`
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
