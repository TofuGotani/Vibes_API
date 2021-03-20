const praiseTexts = [
    // 条件分岐に対して
    "条件分岐、キレてるよ！",
    // 繰り返し処理に対して
    "イエス、while！",
    "そのfor文仕上がってるよ！",
    // 変数宣言に対して
    "ナイス変数！",
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
    const ret = [];
  
    if ("if" in text) ret.push(praiseTexts[0]);
    if ("while" in text) ret.push(praiseTexts[1]);
    if ("for" in text) ret.push(praiseTexts[2]);
  
    return ret;
  };
  function chooseText(text: string[]): string {
    const candidate = commonPraiseTexts.concat(checkKeywords(text));
  
    return candidate[getRandomInt(0, candidate.length)];
  }
  
  export { chooseText };
  