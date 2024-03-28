import Eprop from "../Interface/iEntryPlan";

export function calculateProfit(
  entry: Eprop,
  current: number,
  type: boolean
): Eprop {
  const profit =
    (type ? current - entry.avgEntry : entry.avgEntry - current) *
    (entry.sumVol);
  return {
    ...entry,
    profit: profit,
  };
}
