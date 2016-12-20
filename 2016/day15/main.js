var inputRegex = /Disc #\d+ has (\d+) positions; at time=0, it is at position (\d+)./;

function readInputs(inputs) {
    var result = [];
    inputs.forEach(function(input) {
        var match = inputRegex.exec(input);
        result.push({ i: parseInt(match[2]), size: parseInt(match[1]) });
    });
    return result;
}

function doStep(state) {
    state.forEach(function(disc) {
        disc.i = (disc.i + 1) % disc.size;
    });
}

function checkSequence(state, time) {
    var result = true;
    for(var i = 0; i < state.length; i++) {
        if(((state[i].i + time + i) % state[i].size) != 0) {
            result = false;
            break;
        }
    }
    return result;
}

function findTimeToPress(inputs) {
    var i = 0,
        state = readInputs(inputs), passed = false;
    while (!passed) {
        i++;
        passed = checkSequence(state, i);
    }

    return i - 1;
}
