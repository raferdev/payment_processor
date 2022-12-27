const reset = "\x1b[0m";
const bright = "\x1b[1m";
const dim = "\x1b[2m";
const underscore = "\x1b[4m";
const blink = "\x1b[5m";
const reverse = "\x1b[7m";
const hidden = "\x1b[8m";

const black = "\x1b[30m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const blue = "\x1b[34m";
const magenta = "\x1b[35m";
const cyan = "\x1b[36m";
const white = "\x1b[37m";
const gray = "\x1b[90m";

const bgBlack = "\x1b[40m";
const bgRed = "\x1b[41m";
const bgGreen = "\x1b[42m";
const bgYellow = "\x1b[43m";
const bgBlue = "\x1b[44m";
const bgMagenta = "\x1b[45m";
const bgCyan = "\x1b[46m";
const bgWhite = "\x1b[47m";
const bgGray = "\x1b[100m";

const fontColor = {
  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  gray,
};
const bgColor = {
  bgBlack,
  bgBlue,
  bgCyan,
  bgGray,
  bgGreen,
  bgMagenta,
  bgRed,
  bgWhite,
  bgYellow,
};
const effect = {
  bright,
  dim,
  underscore,
  blink,
  reverse,
  hidden,
};

function terminal(
  pColor = "",
  pBgColor = "",
  pEffect = "",
  pDashed = false,
  pText = ""
) {
  const tColor = pColor !== "" ? fontColor[pColor] : "";
  const tBgColor = pBgColor !== "" ? bgColor[pBgColor] : "";
  const tEffect = pEffect !== "" ? effect[pEffect] : "";
  const tDashed = pDashed;

  function print() {
    const textConfig = tColor + tBgColor + tEffect + "%s" + reset;
    let text = pText;

    if (tDashed) {
      console.log("-------------------------------------------");
      console.log(textConfig, text);
      console.log("-------------------------------------------");
      return;
    }
    console.log(textConfig, text);
  }
  return print();
}

const __shell = { terminal };

export default __shell;
