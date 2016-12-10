var rectRegex = /rect (\d+)x(\d+)/;
var rotateRowRegex = /rotate row y=(\d+) by (\d+)/;
var rotateColRegex = /rotate column x=(\d+) by (\d+)/;

function initializeDisplay(display, sizeX, sizeY) {
    for (var i = 0; i < sizeY; i++) {
        display.push([]);
        for (var j = 0; j < sizeX; j++) {
            display[i].push(false);
        }
    }
}

function rect(display, sizeX, sizeY) {
    for (var i = 0; i < sizeY; i++) {
        for (var j = 0; j < sizeX; j++) {
            display[i][j] = !display[i][j];
        }
    }
}

function rotateColumn(display, column, shift) {
    for (var times = 0; times < shift; times++) {
        var backup = JSON.parse(JSON.stringify(display));
        display[0][column] = backup[display.length - 1][column];
        for (var i = 0; i < (display.length - 1); i++) {
            display[i + 1][column] = backup[i][column];
        }
    }
}

function rotateRow(display, row, shift) {
    for (var times = 0; times < shift; times++) {
        var backup = display[row];
        display[row] = display[row].slice(0, display[row].length - 1);
        display[row].splice(0, 0, backup[backup.length - 1]);
    }
}

function printDisplay(display) {
    console.log("-----------");
    display.forEach(function(row) {
        var line = "";
        row.forEach(function(entry) { line += entry ? "#" : "."; });
        console.log(line);
    });
    console.log("-----------");
}

function processInputs(inputs, display) {
    inputs.forEach(function(input) {
        var info;
        if (info = rectRegex.exec(input)) {
            rect(display, info[1], info[2]);
        } else if (info = rotateRowRegex.exec(input)) {
            rotateRow(display, info[1], info[2]);
        } else if (info = rotateColRegex.exec(input)) {
            rotateColumn(display, info[1], info[2]);
        }
    });
}

function coundLitPixels(inputs, sizeX, sizeY) {
    var count = 0,
        display = [];
    initializeDisplay(display, sizeX, sizeY);
    processInputs(inputs, display);
    printDisplay(display);

    display.forEach(function(row) {
        count += row.filter(function(entry) {
            return entry
        }).length;
    });
    return count;
}
