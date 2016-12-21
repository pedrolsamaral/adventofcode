var commandRegex = /(\w+ \w+) .+/,
    swapPositionRegex = /swap position (\d+) with position (\d+)/,
    swapLetterRegex = /swap letter (\w+) with letter (\w+)/,
    rotateLeftRegex = /rotate left (\d+)/,
    rotateRightRegex = /rotate right (\d+)/,
    rotatePositionRegex = /rotate based on position of letter (\w+)/,
    reversePositionsRegex = /reverse positions (\d+) through (\d+)/,
    movePositionRegex = /move position (\d+) to position (\d+)/;

function swapPosition(word, x, y) {
    var temp = word[x];
    word[x] = word[y];
    word[y] = temp;
    return word;
}

function swapLetter(word, x, y) {
    for (var i = 0; i < word.length; i++) {
        if (word[i] == x) {
            word[i] = y;
        } else if (word[i] == y) {
            word[i] = x;
        }
    }
    return word;
}

function rotateRight(word, x) {
    return word.slice(word.length - x, word.length).concat(word.slice(0, word.length - x));
}

function rotateLeft(word, x) {
    return word.slice(x, word.length).concat(word.slice(0, x));
}

function rotatePositions(word, x) {
    var indexOf = word.indexOf(x);
    var result = rotateRight(word, 1);
    result = rotateRight(result, indexOf);
    if (indexOf > 3) {
        result = rotateRight(result, 1);
    }
    return result;
}

function rotatePositionsInverse(word, x) {
    var result, max = 0;
    do {
        result = JSON.parse(JSON.stringify(word));
        for (var i = 0; i < max; i++) {
            result = rotateLeft(result, 1);
        }
        max++;
    } while (word.join("") != rotatePositions(result, x).join(""));
    return result;
}

function reversePositions(word, x, y) {
    return word.slice(0, x).concat(word.slice(x, y + 1).reverse().concat(word.slice(y + 1, word.length)));
}

function movePosition(word, x, y) {
    var result = JSON.parse(JSON.stringify(word));
    result.splice(y, 0, result.splice(x, 1)[0]);
    return result;
}

function scrambleWord(word, commands) {
    var result = word.split('');
    commands.forEach(function(command) {
        var info;
        switch (commandRegex.exec(command)[1]) {
            case 'swap position':
                info = swapPositionRegex.exec(command);
                result = swapPosition(result, parseInt(info[1]), parseInt(info[2]));
                break;
            case 'swap letter':
                info = swapLetterRegex.exec(command);
                result = swapLetter(result, info[1], info[2]);
                break;
            case 'rotate left':
                result = rotateLeft(result, parseInt(rotateLeftRegex.exec(command)[1]));
                break;
            case 'rotate right':
                result = rotateRight(result, parseInt(rotateRightRegex.exec(command)[1]));
                break;
            case 'rotate based':
                result = rotatePositions(result, rotatePositionRegex.exec(command)[1]);
                break;
            case 'reverse positions':
                info = reversePositionsRegex.exec(command);
                result = reversePositions(result, parseInt(info[1]), parseInt(info[2]));
                break;
            case 'move position':
                info = movePositionRegex.exec(command);
                result = movePosition(result, parseInt(info[1]), parseInt(info[2]));
                break;
        }
    });
    return result.join("");
}

function unscrambleWord(word, commands) {
    var result = word.split('');
    JSON.parse(JSON.stringify(commands)).reverse().forEach(function(command) {
        var info;
        switch (commandRegex.exec(command)[1]) {
            case 'swap position':
                info = swapPositionRegex.exec(command);
                result = swapPosition(result, parseInt(info[2]), parseInt(info[1]));
                break;
            case 'swap letter':
                info = swapLetterRegex.exec(command);
                result = swapLetter(result, info[2], info[1]);
                break;
            case 'rotate left':
                result = rotateRight(result, parseInt(rotateLeftRegex.exec(command)[1]));
                break;
            case 'rotate right':
                result = rotateLeft(result, parseInt(rotateRightRegex.exec(command)[1]));
                break;
            case 'rotate based':
                result = rotatePositionsInverse(result, rotatePositionRegex.exec(command)[1]);
                break;
            case 'reverse positions':
                info = reversePositionsRegex.exec(command);
                result = reversePositions(result, parseInt(info[1]), parseInt(info[2]));
                break;
            case 'move position':
                info = movePositionRegex.exec(command);
                result = movePosition(result, parseInt(info[2]), parseInt(info[1]));
                break;
        }
    });
    return result.join("");
}
