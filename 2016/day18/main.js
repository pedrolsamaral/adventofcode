function isTrap(row, index) {
    //Its left and center tiles are traps, but its right tile is not.
    var rule1 = index > 0 && row[index - 1] == '^' && row[index] == '^' && (index == row.length - 1 || row[index + 1] == '.');

    //Its center and right tiles are traps, but its left tile is not.
    var rule2 = index < row.length - 1 && (index == 0 || row[index - 1] == '.') && row[index] == '^' && row[index + 1] == '^';

    // Only its left tile is a trap.
    var rule3 = index > 0 && row[index - 1] == '^' && row[index] == '.' && (index == row.length - 1 || row[index + 1] == '.');

    //Only its right tile is a trap.
    var rule4 = index < row.length - 1 && (index == 0 || row[index - 1] == '.') && row[index] == '.' && row[index + 1] == '^';

    return rule1 || rule2 || rule3 || rule4;
}

function countSafeSteps(firstRow, maxRows) {
    var count = (firstRow.match(/\./g) || []).length,
        previousRow = firstRow.split(""),
        currRow;
    for (var i = 1; i < maxRows; i++) {
        currRow = [];
        for (var j = 0; j < firstRow.length; j++) {
            if (isTrap(previousRow, j)) {
                currRow.push('^');
            } else {
                currRow.push('.');
                count++;
            }
        }
        previousRow = currRow;
    }
    return count;
}
