function initializeArray(number) {
    var result = [];
    for (var i = 1; i <= number; i++) {
        result.push({ present: true, index: i });
    }
    return result;
}

function findLuckyElf(number) {
    var elves = initializeArray(number);
    while (elves.length > 1) {
        var i = 0;
        while (i < elves.length - 1) {
            if (elves[i].present) {
                elves.splice(i + 1, 1);
            }
        }
        if (elves.length > 1 && elves[elves.length - 1].present) {
            elves.splice(0, 1);
        }
        elves = elves.filter(function(elf) {
            return elf.present;
        });
    }
    return elves[0].index;
}

function findMiddleLuckyElf(number) {
    var elves = initializeArray(number);
    while (elves.length > 1) {
        for (var i = 0; i < elves.length - 1; i++) {
            if (elves[i].present) {
                elves[i + 1].present = false;
            }
        }
        if (elves.length > 1 && elves[elves.length - 1].present) {
            elves[0].present = false;
        }
        elves = elves.filter(function(elf) {
            return elf.present;
        });
    }
    return elves[0].index;
}
