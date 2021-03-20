import { text } from "express";
import { MACADDR } from "sequelize/types";

const praiseTexts = [
  // 条件分岐に対して
  "条件分岐、キレてるよ！",
  // 繰り返し処理に対して
  "イエス、while！",
  "そのfor文仕上がってるよ！",
  // 変数宣言に対して
  // { name: "ナイス変数！", weight: 10 },
];

// 万能セリフ
const commonPraiseTexts = [
  "ナイスコード！",
  "指先に鬼神が宿ってる！",
  "脳にちっちゃいコンパイラ乗せてんのかい！",
  "賢さの大洪水！",
  "コーディングの鬼！",
];

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

const checkKeywords = (text: string[]): string[] => {
  const ret: string[] = [];

  if (text.includes("if")) ret.push(praiseTexts[0]);
  if (text.includes("while")) ret.push(praiseTexts[1]);
  if (text.includes("for")) ret.push(praiseTexts[2]);

  return ret;
};

const getCats = (text: string[]): number => {
  const numberOfTexts = text.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  ).length;
  return Math.min(Math.max(Math.floor(numberOfTexts / 1000), 1), 3);
};

function chooseText(text: string[]): { text: string; cats: number } {
  // const candidate = commonPraiseTexts.concat(checkKeywords(text));

  const getItem = (commonPraiseTexts: string[], checkedKeywords: string[]) => {
    console.log(commonPraiseTexts.concat(checkedKeywords));
    if (checkedKeywords.length <= 0) {
      return commonPraiseTexts[getRandomInt(0, commonPraiseTexts.length)];
    } else {
      if (Math.random() < 0.3) {
        return commonPraiseTexts[getRandomInt(0, commonPraiseTexts.length)];
      } else {
        return checkedKeywords[getRandomInt(0, checkedKeywords.length)];
      }
    }
  };

  return {
    text: getItem(commonPraiseTexts, checkKeywords(text)),
    cats: getCats(text),
  };
}

export { chooseText };
