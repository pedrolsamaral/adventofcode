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
var directions = { "U": 0, "D": 1, "L": 2, "R": 3 };

function getDoorCode(input, path) {
    var md5 = CryptoJS.MD5(input + path).toString();
    return md5.substring(0, 4);
}

function isLocked(input, path) {
    var direction = path[path.length - 1];
    return !/[b-f]/.test(getDoorCode(input, path.substring(0, path.length - 1))[directions[direction]]);
}

function calculateMinSteps(input, x, y, path, targetX, targetY, best) {
    var max = 100000,
        result = max;
    if (!isLocked(input, path)) {
        if (x == targetX && y == targetY) {
            result = path.length;
            best.steps = path.length;
            best.path = path;
            console.log(path.length + ": " + path);
        } else if (path.length < best.steps) {
            var upSteps = y > 0 ? calculateMinSteps(input, x, y - 1, path + "U", targetX, targetY, best) : max;
            var downSteps = y < targetY ? calculateMinSteps(input, x, y + 1, path + "D", targetX, targetY, best) : max;
            var leftSteps = x > 0 ? calculateMinSteps(input, x - 1, y, path + "L", targetX, targetY, best) : max;
            var rightSteps = x < targetX ? calculateMinSteps(input, x + 1, y, path + "R", targetX, targetY, best) : max;

            result = Math.min(upSteps, downSteps, leftSteps, rightSteps);
        }
    }
    return result;
}

function calculateMaxSteps(input, x, y, path, targetX, targetY, best) {
    var max = 100000,
        result = max;
    if (!isLocked(input, path)) {
        if (x == targetX && y == targetY) {
            result = path.length;
            if (best.steps < path.length) {
                best.steps = path.length;
                best.path = path;
            }
        } else {
            var upSteps = y > 0 ? calculateMaxSteps(input, x, y - 1, path + "U", targetX, targetY, best) : max;
            var downSteps = y < targetY ? calculateMaxSteps(input, x, y + 1, path + "D", targetX, targetY, best) : max;
            var leftSteps = x > 0 ? calculateMaxSteps(input, x - 1, y, path + "L", targetX, targetY, best) : max;
            var rightSteps = x < targetX ? calculateMaxSteps(input, x + 1, y, path + "R", targetX, targetY, best) : max;

            result = Math.min(upSteps, downSteps, leftSteps, rightSteps);
        }
    }
    return result;
}
