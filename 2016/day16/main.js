function fillDisk(input, size) {
    var copyA = input,
        copyB;
    while (copyA.length < size) {
        copyB = copyA.split("").reverse().join("").replace(/1|0/gi, function(matched) {
            return matched === "1" ? "0" : "1";
        });
        copyA = copyA + "0" + copyB;
    }

    return copyA.substring(0, size);
}

function shrinkOnce(input) {
    var result = input,
        sameIndex, differentIndex, i = 0;
    while (i < result.length) {
        sameIndex = result.substr(i).search(/11|00/);
        differentIndex = result.substr(i).search(/01|10/);
        if (sameIndex > -1 && sameIndex < differentIndex) {
            result = result.replace(/11|00/, "1");
        } else if (differentIndex > -1 && sameIndex > differentIndex) {
            result = result.replace(/11|00/, "0");
        }
        i++;
    }
    return result;
}

function calculateChecksum(input, size) {
    var disk = fillDisk(input, size);
    while (disk.length % 2 == 0) {
        disk = disk.replace(/11|00|10|01/g, function(matched) {
            return matched[0] === matched[1] ? "1" : "0";
        });
    }
    return disk;
}
