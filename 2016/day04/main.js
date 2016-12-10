var inputRegex = /([a-z\-]+)(\d+)\[([a-z]{5})\]/g;

function retrieveNameMetadata(roomName) {
    var result = {};
    for (var i = 0; i < roomName.length; i++) {
        if (roomName[i] !== '-') {
            result[roomName[i]] = result[roomName[i]] ? result[roomName[i]] + 1 : 1;
        }
    }
    return result;
}

function isBiggestLetter(letter, roomNameMetadata) {
    var letterSize = roomNameMetadata[letter];
    var result = true;
    for (var currLetter in roomNameMetadata) {
        if (roomNameMetadata[currLetter] > letterSize || (roomNameMetadata[currLetter] === letterSize && letter > currLetter)) {
            result = false;
            break;
        }
    }
    return result;
}

function isValidRoom(roomNameMetadata, checksum) {
    var result = true;
    for (var i = 0; i < checksum.length; i++) {
        if (!roomNameMetadata[checksum[i]] || !isBiggestLetter(checksum[i], roomNameMetadata)) {
            result = false;
        } else {
            delete roomNameMetadata[checksum[i]];
        }
    }
    return result;
}

function retrieveRealRooms(input) {
    var result = [];
    var roomInfo = inputRegex.exec(input);
    while (roomInfo != null) {
        var roomNameMetadata = retrieveNameMetadata(roomInfo[1]),
            id = roomInfo[2],
            checksum = roomInfo[3];

        if (isValidRoom(roomNameMetadata, checksum)) {
            result.push({ id: parseInt(id), info: roomInfo });
        }
        roomInfo = inputRegex.exec(input);
    }

    return result;
}

function calculateRealIdSum(input) {
    var result = retrieveRealRooms(input),
        sum = 0;

    result.forEach(function(realRoom) {
        sum += realRoom.id;
    });

    return sum;
}

function retrieveRealName(name, id) {
    var letters = 26,
        zCode = 122,
        aCode = 97,
        result = "",
        realSum = id % letters;
    for (var i = 0; i < name.length; i++) {
        if (name[i] !== '-') {
            var newCharCode = name.charCodeAt(i) + realSum;
            if (newCharCode > zCode) {
                newCharCode = aCode + newCharCode - zCode - 1;
            }
            result += String.fromCharCode(newCharCode);
        } else {
            result += " ";
        }

    }
    return result;
}

function findHqId(input) {
    var rooms = retrieveRealRooms(input);
    rooms.forEach(function(room) {
        console.log(retrieveRealName(room.info[1], room.id) + " -> " + room.id);
    });
}
