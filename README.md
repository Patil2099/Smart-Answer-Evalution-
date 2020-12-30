# What is this ?

This is a module that works in the following way:

Correct: This is when the submitted answer is judged to be fully correct.

Close match: This is when the answer is judged to be close to the right answer, but not close enough to be marked correct. In this case, we want to send a hint to the user. e.g.

If the answer is “Mahatma Gandhi” but they submit “Mahatma Gaandhi”, it returns a hint like: “You’ve almost got the right answer, it’s just a few characters off. Check for typos or similar variations.”

If the answer is United States of America and they write “USA” or “U.S.A.” or “U. S. A.”, then it returns “Please enter the expanded form of your answer”

Wrong: This is returned when the answer is too dissimilar from the correct answer.

# What happens behind the scene ?

## Fuzzy match:

When the characters in the answer are very similar to the submitted response, e.g. in case of typos of minor differences, e.g. “beleive” instead of “believe”. If the difference is too large, then it should be considered wrong. You can take a judgement about the right threshold that should be considered “close”.

## Short forms:

When short forms like “USA,” “U S A”, “U.S.A.” or “U. S. A.” are used instead of “United States of America”. In such cases, it returns a hint saying that the full form should be used.

## Missing/wrong unit:

E.g. “50” or “50 kilo grams“ or “50 keys” instead of “50 kgs”. (If the answer looks like a number+unit but only the number matches, then it always returns a hint saying that they;ve got the right number, but the unit is not matching.

# Installation

`npm i smart-answer-eval --save`

then..

```
import {evaluateAnswer} from 'smart-answer-eval'

evaluateAnswer(userAnswer, correctAnswer)

```
