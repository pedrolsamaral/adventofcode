var nodeInfoRegex = /\/dev\/grid\/node-x(\d+)-y(\d+)[ ]+(\d+)T[ ]+(\d+)T[ ]+(\d+)T[ ]+(\d+)%/;

function readSystem(nodes) {
    var system = [];
    nodes.forEach(function(node) {
        var nodeInfo = nodeInfoRegex.exec(node);
        if (!system[parseInt(nodeInfo[1])]) {
            system[parseInt(nodeInfo[1])] = [];
        }
        system[nodeInfo[1]].push({ size: parseInt(nodeInfo[3]), used: parseInt(nodeInfo[4]), avail: parseInt(nodeInfo[5]), useRatio: parseInt(nodeInfo[6]) });
    });
    return system;
}

function countNodeViablePairs(system, x, y) {
    var result = 0;
    if (system[x][y].used > 0) {
        for (var i = 0; i < system.length; i++) {
            for (var j = 0; j < system[i].length; j++) {
                if (!(x == i && y == j) && system[i][j].avail > system[x][y].used) {
                    result++;
                }
            }
        }
    }
    return result;
}

function countTotalViablePairs(nodes) {
    var count = 0;
    var system = readSystem(nodes);
    for (var i = 0; i < system.length; i++) {
        for (var j = 0; j < system[i].length; j++) {
            count += countNodeViablePairs(system, i, j);
        }
    }
    return count;
}

function costToFreeData(x, y, size, system) {

}

function costToMoveData(x, y, size, system) {

}

function printSystem(system) {
    system.forEach(function(row) {
        var str = "";
        row.forEach(function(entry) {
            str += entry.used + "/" + entry.size + "  ";
        });
        console.log(str);
    });
}

function findZeroNode(system) {
    var result;
    for (var i = 0; i < system.length; i++) {
        for (var j = 0; j < system[i].length; j++) {
            if (system[i][j].used == 0) {
                result = { x: i, y: j };
                i = system.length;
                break;
            }
        }
    }
    return result;
}

function moveZeroFarRight(system) {
    var zero = findZeroNode(system);
    return zero.y + (system.length - zero.x);
}

function moveDataFarLeft(system) {
    return 1 + system.length * 5; 
}

function moveData(nodes) {
    var system = readSystem(nodes);
    var cost = moveZeroFarRight(system);
    cost += moveDataFarLeft(system);

    return cost;
}
