function isValidTriangle(sides) {
    var valid = false;

    function sumOfOtherSides(currSide) {
        var sum = 0;
        for (var j = 0; j < sides.length; j++) {
            if (j != currSide) {
                sum += sides[j];
            }
        }
        return sum;
    }

    function findBiggestSideIndex(sides) {
        var biggest = 0,
            index = 0;
        for (var i = 0; i < sides.length; i++) {
            if (sides[i] > biggest) {
                biggest = sides[i];
                index = i;
            }
        }
        return index;
    }

    var biggestSideIndex = findBiggestSideIndex(sides);
    return sides[biggestSideIndex] < sumOfOtherSides(biggestSideIndex);
}

function scanValidTrianglesHorizontally(input) {
    var validTriangles = 0;
    input.forEach(function(sides) {
        if (isValidTriangle(sides)) {
            validTriangles++;
        }
    });
    return validTriangles;
}

function scanValidTrianglesVertically(input) {
    var sides, validTriangles = 0;
    for (var i = 0; i < input.length - 2; i += 3) {
        for (var j = 0; j < 3; j++) {
            sides = [];
            sides.push(input[i][j]);
            sides.push(input[i + 1][j]);
            sides.push(input[i + 2][j]);
            if (isValidTriangle(sides)) {
                validTriangles++;
            }
        }
    }
    return validTriangles;
}
