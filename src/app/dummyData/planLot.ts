export const listLot = [
  0.01, 0.01, 0.01, 0.01, 0.02, 0.02, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.09,
  0.11, 0.13, 0.15, 0.18, 0.22, 0.27, 0.32, 0.38, 0.46, 0.55, 0.66, 0.79, 0.95,
  1.14, 1.37, 1.5,
];

// console.log(generateOPT(true, listLot, 2000, 0.5, 50));

// function calculateProfit(entry: Eprop, current: number, type: boolean): Eprop {
//   const profit =
//     (type ? current - entry.avgEntry : entry.avgEntry - current) *
//     (entry.sumVol * 100);
//   return {
//     ...entry,
//     profit: profit,
//   };
// }

// // Example usage:
// const exampleEprop: Eprop = {
//   id: 6,
//   vol: 0.02,
//   sumVol: 0.08,
//   entry: 2002.5,
//   avgEntry: 2001.5,
//   pTP: 1996.5,
// };

// const epropWithProfit: Eprop = calculateProfit(exampleEprop, 2020.75, true);
// console.log(epropWithProfit);
