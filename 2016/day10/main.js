var receiveRegex = /value (\d+) goes to bot (\d+)/;
var instructionRegex = /bot (\d+) gives low to (\w+) (\d+) and high to (\w+) (\d+)/;

function initializeBots(instructions, state) {
    instructions.forEach(function(instruction) {
        if (instruction.startsWith("bot")) {
            var instructionInfo = instructionRegex.exec(instruction);
            state.instruction[instructionInfo[1]] = {
                typeLow: instructionInfo[2],
                receiverLow: instructionInfo[3],
                typeHigh: instructionInfo[4],
                receiverHigh: instructionInfo[5]
            }
        }
    });
}

function removeLower(botInfo) {
    var index = (botInfo.length === 1 || parseInt(botInfo[0]) < parseInt(botInfo[1])) ? 0 : 1;
    return botInfo.splice(index, 1)[0];
}

function removeHigher(botInfo) {
    var index = (botInfo.length === 1 || parseInt(botInfo[0]) > parseInt(botInfo[1])) ? 0 : 1;
    return botInfo.splice(index, 1)[0];
}

function checkAllBots(state, chip1, chip2) {
    for (var botNum in state.bot) {
        if (state.bot[botNum].length === 2) {
            if (checkBotFor(state.bot[botNum], chip1, chip2)) {
                console.log("IT'S BOT NUMBER " + botNum);
            }
            processInstruction(botNum, state, chip1, chip2);
        }
    }
}

function processInstruction(giver, state, chip1, chip2) {
    var lower = removeLower(state.bot[giver]);
    var higher = removeHigher(state.bot[giver]);

    processReceive(state.instruction[giver].typeLow, state.instruction[giver].receiverLow, lower, state);
    processReceive(state.instruction[giver].typeHigh, state.instruction[giver].receiverHigh, higher, state);

    checkAllBots(state, chip1, chip2);
}

function checkBotFor(bot, chip1, chip2) {
    return (bot[0] == chip1 && bot[1] == chip2) || (bot[1] == chip1 && bot[0] == chip2);
}

function processReceive(type, receiver, value, state) {
    if (!state[type][receiver]) {
        state[type][receiver] = [];
    }
    state[type][receiver].push(value);
}

function startGiving(instructions, state, chip1, chip2) {
    for (var i in instructions) {
        if (instructions[i].startsWith("value")) {
            var receiveInfo = receiveRegex.exec(instructions[i]);
            processReceive('bot', receiveInfo[2], receiveInfo[1], state, chip1, chip2);
            checkAllBots(state, chip1, chip2);
        }
    }
}

function findBot(instructions, chip1, chip2) {
    var state = { bot: {}, output: {}, instruction: {} };
    initializeBots(instructions, state);
    startGiving(instructions, state, chip1, chip2);

    return state;
}

function checkOutputValue(instructions) {
    var state = findBot(instructions);
    return state.output["0"][0] * state.output["1"][0] * state.output["2"][0];
}