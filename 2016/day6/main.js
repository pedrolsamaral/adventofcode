var inputRegex = /\w+/g;

function findCorrectLetter(letterInfo, isMax) {
    var bestLetter, bestSize = isMax ? 0 : Number.MAX_SAFE_INTEGER;
    for (var letter in letterInfo) {
        if (letterInfo[letter] > bestSize === isMax) {
            bestLetter = letter;
            bestSize = letterInfo[letter];
        }
    }
    return bestLetter;
}

function retrieveRealWord(input, isMax) {
    var stepInfo, result = "",
        realWordInfo = [];

    while ((stepInfo = inputRegex.exec(input)) != null) {
        for (var i = 0; i < stepInfo[0].length; i++) {
            if (!realWordInfo[i]) {
                realWordInfo.push({});
            }
            var currCount = realWordInfo[i][stepInfo[0][i]];
            realWordInfo[i][stepInfo[0][i]] = currCount ? (currCount + 1) : 1;
        }
    }

    realWordInfo.forEach(function(letterInfo) {
        result += findCorrectLetter(letterInfo, isMax);
    });
    return result;
}

function retrieveMaxRealWord(input) {
    return retrieveRealWord(input, true);
}

function retrieveMinRealWord(input) {
    return retrieveRealWord(input, false);
}
