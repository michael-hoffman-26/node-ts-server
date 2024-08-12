import { alpheBetMapping } from "./consts";

function sortAlphaBet() {
  return (a, b) => {
    const wordALetters = a.split("");
    const wordBLetters = b.split("");

    const minLenght = Math.min(wordALetters.length, wordBLetters.length);
    let index = 0;
    while (index < minLenght - 1) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      const aLetterVal = alpheBetMapping.get(wordALetters[index].toLowerCase()) || 0
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      const bLetterVal = alpheBetMapping.get(wordBLetters[index].toLowerCase()) || 0
      if (aLetterVal < bLetterVal) {
        return -1;
      } else if (aLetterVal > bLetterVal) {
        return 1;
      }
      index++;
    }

    if (wordALetters.length < wordBLetters.length) {
      return -1;
    } else if (wordALetters.length > wordBLetters.length) {
      return 1;
    }
    return 0;
  };
}
function removePunctuation(str) {
  return str.split('').filter(char => {
      return /[a-zA-Z0-9 ]/.test(char);
  }).join('');
}

// Decided to directly set the input value in the code
const input = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`

const inputWitoutPunctuation = removePunctuation(input)
const sortedWords = inputWitoutPunctuation.split(" ").sort(sortAlphaBet())


console.log(sortedWords.join(" "));
