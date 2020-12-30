const similarity = (s1, s2) => {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (
    (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
  );
};

const editDistance = (s1, s2) => {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
};

const evaluateAnswer = (userAnswer, correctAnswer) => {
  let correctness = similarity(correctAnswer, userAnswer);
  if (correctness >= 0.95) {
    return "Correct";
  } else if (correctness <= 0.94 && correctness >= 0.65) {
    return "Check For Typos";
  } else {
    let abbreviationCheck = similarity(
      correctAnswer.match(/\b([A-Z])/g) != null
        ? correctAnswer.match(/\b([A-Z])/g).join("")
        : "",
      userAnswer
    );
    if (abbreviationCheck > 0.85) {
      return "Please Type The Full Form";
    }
    var answer = userAnswer.split(" ");
    var correct = correctAnswer.split(" ");
    if (answer.length == 2 && !Number.isNaN(answer[0])) {
      if (answer[0] == correct[0] && answer[1] == correct[1]) {
        return "Correct";
      } else if (answer[0] == correct[0] && answer[1] != correct[1]) {
        return "You have got the right Number,Please Check The Unit";
      } else {
        return "Wrong";
      }
    } else if (answer.length == 1 && !Number.isNaN(answer[0])) {
      if (correct[0] == answer[0]) {
        return "You have got the right number.Please type the unit";
      }
    } else {
      return "Wrong";
    }
  }
};

module.exports.evaluateAnswer = evaluateAnswer;
