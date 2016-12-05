var currPos;

function move(direction, keypad) {
	var oldPos = {x: currPos.x, y: currPos.y};
    switch (direction) {
        case 'U':
            currPos.y = currPos.y > 0 ? currPos.y - 1 : currPos.y;
            break;
        case 'R':
            currPos.x = currPos.x < (keypad[currPos.y].length - 1) ? currPos.x + 1 : currPos.x;
            break;
        case 'D':
            currPos.y = currPos.y < (keypad.length - 1) ? currPos.y + 1 : currPos.y;
            break
        case 'L':
            currPos.x = currPos.x > 0 ? currPos.x - 1 : currPos.x;
            break;
    }
    if(keypad[currPos.y][currPos.x] === '0') {
    	currPos = oldPos;
    }
}

function findCode(startPos, input, keypad) {
    currPos = startPos;
    var code = "";
    for (var i = 0; i < input.length; i++) {
    	if(input[i] === ',') {
    		code = code.concat(keypad[currPos.y][currPos.x]);
    	} else {
    		move(input[i], keypad);
    	}
    }

    return code.concat(keypad[currPos.y][currPos.x]);
}