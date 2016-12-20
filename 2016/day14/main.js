var repeated5Regex = /(\w)\1{4}/;
var repeated3Regex = /(\w)\1{2}/;

function initialize(input, array, fives, max, hashTimes) {
    for (var i = 0; i < max; i++) {
        calculateNext(input, i, array, fives, hashTimes);
    }
}

function calculateNext(input, i, array, fives, hashTimes) {
    var hash = CryptoJS.MD5(input + i).toString();
    for (var j = 0; j < hashTimes; j++) {
        hash = CryptoJS.MD5(hash).toString();
    }
    var repeated5 = repeated5Regex.exec(hash);
    var repeated3 = repeated3Regex.exec(hash);
    array.push({ threes: repeated3, i: i });
    if (repeated5 != null) {
        if (!fives[repeated3[0]]) {
            fives[repeated3[0]] = [];
        }
        fives[repeated3[0]].push(i);
    }
}

function hasFives(curr, fives) {
    var currFive = fives[curr.threes[0]],
        result;
    if (currFive) {
        result = currFive.find(function(i) {
            return i > curr.i && i <= curr.i + 1000;
        });
    }
    return result;
}

function findLastValidKeyIndex(input, maxKeys, hashTimes) {
    var count = 0,
        i = 0,
        array = [],
        fives = {};
    initialize(input, array, fives, 1000, hashTimes);
    while (count < maxKeys) {
        var curr = array.splice(0, 1)[0];
        if (curr.threes) {
            for (var j = i + 1; j < i + 1000; j++) {
                if (hasFives(curr, fives)) {
                    count++;
                    break;
                }
            }
        }
        i++;
        calculateNext(input, i + 1000, array, fives, hashTimes);
    }

    return i;
}
