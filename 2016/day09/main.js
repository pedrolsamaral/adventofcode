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

function justCount(input) {
    var count = 0, i = 0;
    while (i < input.length) {
        if (input[i] === '(') {
            var info = /\((\d+)x(\d+)\)/.exec(input.substring(i, input.indexOf(')', i) + 1));
            count += info[2] * justCount(input.substr(i + info[0].length, info[1]));
            i += info[0].length + parseInt(info[1]);
        } else {
            count++;
            i++;
        }
    }
    return count;
}