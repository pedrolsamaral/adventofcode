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

/*0: > 1 -> 1 
1: > 1 + 1 -> 3 
2: > 1 + 2 -> 5 % 5 = 0 
3: > 1 + 3 -> 7 % 5 = 2 
4: > 1 + 4 + 1 -> 10 % 5 = 0

0: > 1 -> 1
1: > 1 + 1 -> 3
2: > 1 + 2 -> 5 = 5
3: > 1 + 3 -> 7 = 7
4: > 1 + 4 + 1 -> 10 % 8 = 2
5: > 1 + 5 + 1 -> 12 % 8 = 4
6: > 1 + 6 + 1 -> 14 % 8 = 6
7: > 1 + 6 + 1 -> 16 % 8 = 0*/

function rotatePositionsInverse(word, x) {
    var possibleRotations = { 5: [2, 0, 3, 1, null], 8: [1, 3, 5, 7, 2, 4, 6, 0] };
    var indexOf = possibleRotations[word.length][word.indexOf(x)];
    var result = rotateLeft(word, 1);
    if (indexOf > 3) {
        result = rotateLeft(result, 1);
    }
    result = rotateLeft(result, indexOf);
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
    commands.reverse().forEach(function(command) {
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
                result = rotatePositions(result, rotatePositionRegex.exec(command)[1]);
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
