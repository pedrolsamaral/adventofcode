var intervalRegex = /(\d+)\-(\d+)/;

function retrieveIntervalInfo(interval) {
    var intervalInfo = intervalRegex.exec(interval);
    return { min: parseInt(intervalInfo[1]), max: parseInt(intervalInfo[2]) };
}

// PART1
function sortByMin(intervals) {
    intervals.sort(function(a, b) {
        return retrieveIntervalInfo(a).min - retrieveIntervalInfo(b).min;
    });
}

function findLowestAllowed(intervals) {
    var lowest = 0;
    sortByMin(intervals);
    intervals.forEach(function(interval) {
        var intervalInfo = retrieveIntervalInfo(interval);
        if (intervalInfo.min <= lowest && intervalInfo.max >= lowest) {
            lowest = intervalInfo.max + 1;
        }
    });

    return lowest;
}

// PART2
function reduceIntervals(intervals) {
    var reduced = [];
    intervals.forEach(function(interval) {
        var found = false;
        var curr = retrieveIntervalInfo(interval);
        for (var i = 0; i < reduced.length; i++) {
            if (reduced[i].min <= curr.min && reduced[i].min <= curr.max && reduced[i].max >= curr.min && reduced[i].max <= curr.max) {
                reduced[i].max = curr.max;
                found = true;
                break;
            } else if (reduced[i].min >= curr.min && reduced[i].min <= curr.max && reduced[i].max >= curr.min && reduced[i].max >= curr.max) {
                reduced[i].min = curr.min;
                found = true;
                break;
            } else if (reduced[i].min >= curr.min && reduced[i].min <= curr.max && reduced[i].max >= curr.min && reduced[i].max <= curr.max) {
                reduced[i].max = curr.max;
                reduced[i].min = curr.min;
                found = true;
                break;
            } else if (reduced[i].min <= curr.min && reduced[i].min <= curr.max && reduced[i].max >= curr.min && reduced[i].max >= curr.max) {
                found = true;
                break;
            }
        }
        if (!found) {
            reduced.push(curr);
        }
    });

    return reduced;
}

function findAllowedSize(intervals, max) {
    var reduced = reduceIntervals(intervals),
        count = max - reduced[reduced.length - 1].max;

    for (var i = 0; i < reduced.length - 1; i++) {
        count += reduced[i + 1].min - (reduced[i].max + 1);
    }

    return count;
}
