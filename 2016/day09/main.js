function decompressPart(input, start, length, repetitions) {
    var result = "",
        part = input.substr(start, length);
    for (var i = 0; i < repetitions; i++) { result += part; }
    return result;
}

function decompressAndCount(input) {
    var result = "";
    var i = 0;
    while (i <= input.length) {
        var length = 1,
            repetitions = 1;
        if (input[i] === '(') {
            i++;
            length = /\d+/.exec(input.substring(i))[0];
            i += length.length + 1;
            repetitions = /\d+/.exec(input.substring(i))[0];
            i += repetitions.length + 1;
        }
        result += decompressPart(input, i, parseInt(length), parseInt(repetitions));
        i += parseInt(length);
    }
    console.log(result);
    return result.replace(/ /g, "").length;
}

function justCount(input, currCount) {
    var count = 0, i = 0;
    while (i < input.length) {
        var length = 1,
            repetitions = 1;
        if (input[i] === '(') {
            i++;
            length = /\d+/.exec(input.substring(i))[0];
            i += length.length + 1;
            repetitions = /\d+/.exec(input.substring(i))[0];
            i += repetitions.length + 1;
            count += repetitions * justCount(input.substr(i, length), count);
        } else {
            count++;
        }
        i += parseInt(length);
    }
    return count;
}