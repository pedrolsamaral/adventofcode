// TODO: Improve code redudancy. Both parts can be resolved through a single main function. The same applies to the prints

function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}

function printLabyrinth(input, maxX, maxY, currX, currY, stack) {
    var line1 = " ";
    for (var i = 0; i < maxX; i++) {
        line1 += (i + "").length > 1 ? (i + "")[1] : (i + "")[0];
    }
    console.log(line1);
    for (var y = 0; y < maxY; y++) {
        var line = (y < 10 ? "0" + y : y) + "";
        for (var x = 0; x < maxX; x++) {
            var result = ((x * x) + (3 * x) + (2 * x * y) + y + (y * y)) + input;
            var binary = dec2bin(result);
            var value = (binary.match(/1/g) || []).length % 2 == 0 ? '.' : "#";
            line += ((x == currX && y == currY) || stack.indexOf(retrievePosId(x, y))) > -1 ? '0' : value;
        }
        console.log(line);
    }
    console.log("-----------");
}

function isWall(input, x, y) {
    if (x < 0 || y < 0 || x > 100 || y > 100) {
        return true;
    } else {
        var result = ((x * x) + (3 * x) + (2 * x * y) + y + (y * y)) + input;
        return (dec2bin(result).match(/1/g) || []).length % 2 == 0 ? false : true;
    }
}

function findMinSteps(input, steps, x, y, targetX, targetY, stack, bestSteps) {
    return steps > bestSteps[retrievePosId(x, y)] ? bestSteps[y + "" + x] : calculateMinSteps(input, steps + 1, x, y, targetX, targetY, stack, bestSteps);
}

function retrievePosId(x, y) {
    return (x < 10 ? "0" + x : x) + "" + (y < 10 ? "0" + y : y);
}

function calculateMinSteps(input, steps, x, y, targetX, targetY, stack, bestSteps) {
    var result, max = 100000;
    stack.push(retrievePosId(x, y));
    if (x == targetX && y == targetY) {
        result = steps;
    } else if (isWall(input, x, y)) {
        result = max;
    } else {
        var upSteps = stack.indexOf(retrievePosId(x, y - 1)) > -1 ? max : findMinSteps(input, steps, x, y - 1, targetX, targetY, stack, bestSteps);
        var downSteps = stack.indexOf(retrievePosId(x, y + 1)) > -1 ? max : findMinSteps(input, steps, x, y + 1, targetX, targetY, stack, bestSteps);
        var leftSteps = stack.indexOf(retrievePosId(x - 1, y)) > -1 ? max : findMinSteps(input, steps, x - 1, y, targetX, targetY, stack, bestSteps);
        var rightSteps = stack.indexOf(retrievePosId(x + 1, y)) > -1 ? max : findMinSteps(input, steps, x + 1, y, targetX, targetY, stack, bestSteps);

        result = Math.min(upSteps, downSteps, leftSteps, rightSteps);
    }
    stack.pop();
    bestSteps[retrievePosId(x, y)] = result;
    return result;
}

// PART 2
function printFullLabyrinth(input, maxX, maxY, history) {
    var line1 = " ";
    for (var i = 0; i < maxX; i++) {
        line1 += (i + "").length > 1 ? (i + "")[1] : (i + "")[0];
    }
    console.log(line1);
    for (var y = 0; y < maxY; y++) {
        var line = (y < 10 ? "0" + y : y) + "";
        for (var x = 0; x < maxX; x++) {
            var result = ((x * x) + (3 * x) + (2 * x * y) + y + (y * y)) + input;
            var binary = dec2bin(result);
            var value = (binary.match(/1/g) || []).length % 2 == 0 ? '.' : "#";
            line += history[retrievePosId(x, y)] ? '0' : value;
        }
        console.log(line);
    }
    console.log("-----------");
}

function calculateMaxCoverage(input, steps, x, y, maxSteps, stack, history) {
    stack.push(retrievePosId(x, y));
    if (!isWall(input, x, y)) {
        history[retrievePosId(x, y)] = true;
        if (steps != 50) {
            if (stack.indexOf(retrievePosId(x, y - 1)) === -1) {
                calculateMaxCoverage(input, steps + 1, x, y - 1, maxSteps, stack, history);
            }
            if (stack.indexOf(retrievePosId(x, y + 1)) === -1) {
                calculateMaxCoverage(input, steps + 1, x, y + 1, maxSteps, stack, history);
            }
            if (stack.indexOf(retrievePosId(x - 1, y)) === -1) {
                calculateMaxCoverage(input, steps + 1, x - 1, y, maxSteps, stack, history);
            }
            if (stack.indexOf(retrievePosId(x + 1, y)) === -1) {
                calculateMaxCoverage(input, steps + 1, x + 1, y, maxSteps, stack, history);
            }
        }
    }
    stack.pop();
    return Object.keys(history).length;
}
