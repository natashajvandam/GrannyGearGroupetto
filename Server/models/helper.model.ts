"use strict";

import client from "./index.model.js";
import { QueryResult } from "pg";

// ----global-helper-------------------------------->
function convertToPgDate() {
  // takes current date and converts to a database-compatible date.
  const date: Date = new Date();
  const year: number = date.getFullYear();
  const month: string = ("0" + (date.getMonth() + 1)).slice(-2);
  const day: string = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

// ----update-helpers------------------------------->
const getRoster = async (user: number) => {
  const roster: QueryResult = await client.query(`
    SELECT rider, end_date, start_date FROM roster_table
    WHERE roster = ${user};`);
  return roster;
};

const fetchRiderScores = async (rider: RiderDates) => {
  const startScore: QueryResult = await client.query(`
    SELECT score FROM score_table WHERE rider='${rider.rider}'
    AND updated_at <= TO_DATE('${rider.start_date}', 'Dy Mon DD YYYY');`);
  let endScore: QueryResult;
  if (rider.end_date) {
    endScore = await client.query(`
      SELECT score FROM score_table WHERE rider='${rider.rider}'
      AND updated_at <= TO_DATE('${rider.end_date}', 'Dy Mon DD YYYY');`);
  } else {
    const today: string = convertToPgDate();
    endScore = await client.query(`
      SELECT score FROM score_table WHERE rider='${rider.rider}'
      AND updated_at <= '${today}';`);
  }
  const startingScore: number =
    startScore.rows[startScore.rows.length - 1].score;
  const endingScore: number = endScore.rows[endScore.rows.length - 1].score;
  return endingScore - startingScore;
};

const updateUserScore = async (newScore: number, user: number) => {
  const res: QueryResult = await client.query(`
    UPDATE user_table SET score = ${newScore} WHERE id = ${user};`);
  return res;
};

const findPrice = (rank: any) => {
  if (rank >= 100) {
    return 10;
  }
  return valueLibrary[rank];
};

const valueLibrary = [
  "buffer",
  300,
  260,
  220,
  180,
  170,
  160,
  150,
  140,
  135,
  130,
  125,
  120,
  115,
  110,
  105,
  100,
  95,
  90,
  88,
  85,
  80,
  78,
  76,
  74,
  72,
  70,
  68,
  66,
  64,
  62,
  60,
  59,
  58,
  56,
  55,
  54,
  53,
  52,
  51,
  50,
  49,
  48,
  47,
  46,
  45,
  44,
  43,
  42,
  41,
  40,
  39,
  38,
  37,
  36,
  35,
  34,
  33,
  32,
  31,
  30,
  29,
  28,
  28,
  27,
  27,
  26,
  25,
  25,
  24,
  24,
  23,
  23,
  22,
  22,
  21,
  21,
  20,
  20,
  19,
  19,
  18,
  18,
  17,
  17,
  16,
  16,
  15,
  15,
  14,
  14,
  13,
  13,
  12,
  12,
  12,
  11,
  11,
  10,
  10,
];

export {
  getRoster,
  fetchRiderScores,
  updateUserScore,
  findPrice,
  convertToPgDate,
};
