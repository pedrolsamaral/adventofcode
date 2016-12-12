function isAbba(input) {
    return input[0] != input[1] && input[0] == input[3] && input[1] == input[2];
}

function hasAbba(input) {
    var result = false;
    for (var i = 0; i <= input.length - 4; i++) {
        if (isAbba(input.substring(i, i + 4))) {
            result = true;
            break;
        }
    }
    return result;
}

function countTlsIps(inputs, isMax) {
    var matchInfo, result = 0;

    inputs.forEach(function(input) {
        var inputRegex = /\w+/g,
            i = 1,
            hasOutsideAbba = false, hasInsideAbba = false;
        while ((matchInfo = inputRegex.exec(input)) != null) {
            var abba = hasAbba(matchInfo[0]);
            if ((i % 2 == 0) && abba) {
                hasInsideAbba = true;
                break;
            } else if((i % 2 != 0) && abba) {
                hasOutsideAbba = true;
            }
            i++;
        }
        result += (hasOutsideAbba && !hasInsideAbba) ? 1 : 0;
    });

    return result;
}

function isAba(input) {
    return input[0] != input[1] && input[0] == input[3] && input[1] == input[2];
}

function hasAba(input) {
    var result = false;
    for (var i = 0; i <= input.length - 4; i++) {
        if (isAbba(input.substring(i, i + 4))) {
            result = true;
            break;
        }
    }
    return result;
}

function countSslIps(inputs, isMax) {
    var matchInfo, result = 0;

    inputs.forEach(function(input) {
        var inputRegex = /\w+/g,
            i = 1,
            hasOutsideAbba = false, hasInsideAbba = false;
        while ((matchInfo = inputRegex.exec(input)) != null) {
            var abba = hasAbba(matchInfo[0]);
            if ((i % 2 == 0) && abba) {
                hasInsideAbba = true;
                break;
            } else if((i % 2 != 0) && abba) {
                hasOutsideAbba = true;
            }
            i++;
        }
        result += (hasOutsideAbba && !hasInsideAbba) ? 1 : 0;
    });

    return result;
}
