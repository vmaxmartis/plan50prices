import Eprop from "../Interface/iEntryPlan";

export default function generateOPT(
  type: boolean,
  listLot: number[],
  initEntry: number,
  spread: number,
  pip: number
): Eprop[] {
  let sumVolRunningTotal = 0;
  let trungbinhGIA = 0;

  const UOP: Eprop[] = listLot.map((vol, index) => {
    const entry =
      index == 0
        ? initEntry
        : type
        ? initEntry - spread * index
        : initEntry + spread * index;
    sumVolRunningTotal += vol;
    trungbinhGIA = index == 0 ? initEntry : entry * sumVolRunningTotal;
    return {
      id: index + 1,
      vol: vol,
      sumVol: sumVolRunningTotal,
      entry: entry,
      avgEntry: vol,
      pTP: 0,
    };
  });
  const AVGL = UOP.map((item, index) => {
    const sum = UOP.slice(0, index + 1).reduce(
      (acc, cur) => acc + cur.entry * cur.vol,
      0
    );
    item.avgEntry = sum / item.sumVol;
    return item;
  });
  const pointTP =
    AVGL[AVGL.length - 1].avgEntry + (type ? pip / 10 : (pip / 10) * -1);
  return AVGL.map((item, index) => {
    item.pTP = pointTP;
    return item;
  });
}
