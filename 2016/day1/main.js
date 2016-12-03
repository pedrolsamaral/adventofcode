var currDir, currPos;
var inputRegex = /([RL])(\d+)/g;
var directions = [
    { x: 0, y: 1 }, // N
    { x: 1, y: 0 }, // W
    { x: 0, y: -1 }, // S
    { x: -1, y: 0 }, // E
];
var turn = {
    'R': function() {
        currDir = (currDir + 1) % directions.length;
    },
    'L': function() {
        currDir = currDir > 0 ? (currDir - 1) : directions.length - 1;
    }
};

function walk(steps) {
    currPos.x += directions[currDir].x * steps;
    currPos.y += directions[currDir].y * steps;
}

function calculateDistance(position) {
    return Math.abs(position.y) + Math.abs(position.x);
}

function calculateHqDistance(input, preWalk, postWalk, shouldStopWalk) {
    currDir = 0;
    currPos = { x: 0, y: 0 }

    var stepInfo = inputRegex.exec(input);
    while ((!shouldStopWalk || !shouldStopWalk()) && stepInfo != null) {
        turn[stepInfo[1]]();
        if (preWalk) {
            preWalk();
        }
        walk(stepInfo[2]);
        if (postWalk) {
            postWalk();
        }
        stepInfo = inputRegex.exec(input);
    }

    return calculateDistance(currPos);
}

function isHorizontalMove(step) {
    return step.from.y == step.to.y;
}

function findRepeated(allSteps, currStep) {
    var repeatedPosition,
        repeatedStep = allSteps.find(function(oldStep) {
            var staticCurr, staticOld, insideLine, enoughDistance;
            if (!isHorizontalMove(currStep) && isHorizontalMove(oldStep)) {
                // Vertical move
                staticCurr = currStep.from.x;
                staticOld = oldStep.from.y;
                insideLine = (staticCurr >= oldStep.from.x && staticCurr <= oldStep.to.x) || (staticCurr <= oldStep.from.x && staticCurr >= oldStep.to.x);
                enoughDistance = (staticOld >= currStep.from.y && staticOld <= currStep.to.y) || (staticOld <= currStep.from.y && staticOld >= currStep.to.y);
                return insideLine && enoughDistance;
            } else if (isHorizontalMove(currStep) && !isHorizontalMove(oldStep)) {
                // Horizontal move
                staticCurr = currStep.from.y;
                staticOld = oldStep.from.x;
                insideLine = (staticCurr >= oldStep.from.y && staticCurr <= oldStep.to.y) || (staticCurr <= oldStep.from.y && staticCurr >= oldStep.to.y);
                enoughDistance = (staticOld >= currStep.from.x && staticOld <= currStep.to.x) || (staticOld <= currStep.from.x && staticOld >= currStep.to.x);
                return insideLine && enoughDistance;
            }
            return false;
        });

    if (repeatedStep && repeatedStep !== allSteps[allSteps.length - 1]) {
        repeatedPosition = {};
        repeatedPosition.x = !isHorizontalMove(currStep) ? currStep.from.x : repeatedStep.from.x;
        repeatedPosition.y = isHorizontalMove(currStep) ? currStep.from.y : repeatedStep.from.y;
    }

    return repeatedPosition;
}



function calculateRepeatedDistance(input) {
    var allSteps = [],
        step,
        repeatedPos;

    function storeFrom() {
        step = {};
        step.from = { x: currPos.x, y: currPos.y };
    }

    function storeTo() {
        step.to = { x: currPos.x, y: currPos.y };
        repeatedPos = findRepeated(allSteps, step);
        allSteps.push(step);
    }

    function stopWalking() {
        return repeatedPos != null;
    }

    calculateHqDistance(input, storeFrom, storeTo, stopWalking);

    return calculateDistance(repeatedPos);
}
