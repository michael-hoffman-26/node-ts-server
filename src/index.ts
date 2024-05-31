console.log('Hello World')

enum WordleStatus {
    GREEN = 'GREEN',
    YELLOW = 'YELLOW',
    GRAY = 'GRAY',
}
interface WordleResult {
    letter: string;
    status: WordleStatus
}
const CORRECT_WORD = 'ABADE'
// const CORRECT_WORD = 'ABID'
// L -> 2, H -> 1 ...
const guess = 'EAASE'
/**
 * [c, gray]
 * [h,
 *
 * */
const wordle = (inputTest: string): WordleResult[] => {
    const inputLetters: string[] = inputTest.toUpperCase().split('')
    const COORECT_WORD_MAPPED: Map<string, number> = CORRECT_WORD.split('').reduce(
        (currentLettersMap, currentLeter) => {
            if (currentLettersMap.has(currentLeter)){
                const currentApperens = currentLettersMap.get(currentLeter)
                currentLettersMap.set(currentLeter, currentApperens + 1)
            } else {
                currentLettersMap.set(currentLeter, 1)
            }

            return currentLettersMap
        }, new Map())

    const wordleResult: WordleResult[] = []
    inputLetters.forEach((letter: string, index: number) => {
        /**
         * for each letter to check.
         * 1. if it exists,
         * 2. if so, check the position
         * */
        if (COORECT_WORD_MAPPED.has(letter)) {
            if (inputTest[index] === CORRECT_WORD[index]) {
                wordleResult[index] = ({ letter, status: WordleStatus.GREEN})
                const corretWordNum  = COORECT_WORD_MAPPED.get(letter)
                if (corretWordNum === 1) {
                    COORECT_WORD_MAPPED.delete(letter)
                } else {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    COORECT_WORD_MAPPED.set(letter, corretWordNum -1)
                }
            }
        } else {
            wordleResult[index] = ({ letter, status: WordleStatus.GRAY})
        }

    })

    inputLetters.forEach((letter: string, index: number) => {
        /**
         * for each letter to check.
         * 1. if it exists,
         * 2. if so, check the position
         * */
        if (!wordleResult[index]) {
            if (COORECT_WORD_MAPPED.has(letter)) {
                wordleResult[index] = ({letter, status: WordleStatus.YELLOW})
                const corretWordNum  = COORECT_WORD_MAPPED.get(letter)
                if (corretWordNum === 1) {
                    COORECT_WORD_MAPPED.delete(letter)
                } else {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    COORECT_WORD_MAPPED.set(letter, corretWordNum -1)
                }
            } else {
                wordleResult[index] = ({letter, status: WordleStatus.GRAY})
            }
        }
    })

    return wordleResult
}

console.group(`Hello World: ${JSON.stringify(wordle(guess))}`)


