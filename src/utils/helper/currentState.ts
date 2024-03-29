import theme from "../theme";

const curState = (price: number, curPrice: number, typeAc: boolean) =>
  typeAc
    ? curPrice > price
      ? theme.palette.success.main
      : theme.palette.error.main
    : curPrice < price
    ? theme.palette.success.main
    : theme.palette.error.main;
export default curState;
