var inputRegex = /\w+/g;

function findValueA(inputs, results) {
    var i = 0;
    while (i < inputs.length) {
        var info;
        if ((info = /cpy (-*)(\w+) (\w)/.exec(inputs[i]))) {
            if (parseInt(info[2]) > 0) {
                results[info[3]] = parseInt(info[2]);
            } else {
                results[info[3]] = results[info[2]];
            }
            if (info[1].length > 0) {
                results[info[3]] = -results[info[3]];
            }
            i++;
        } else if ((info = /inc (\w)/.exec(inputs[i]))) {
            results[info[1]]++;
            i++;
        } else if ((info = /dec (\w)/.exec(inputs[i]))) {
            results[info[1]]--;
            i++;
        } else if ((info = /jnz (\w) (-*)(\d+)/.exec(inputs[i]))) {
            var jumpValue = parseInt(info[3]);
            if (info[2].length > 0) {
                jumpValue = -jumpValue;
            }

            var compValue = parseInt(info[1]) > 0 ? parseInt(info[1]) : results[info[1]];
            if (compValue != 0) {
                i = i + jumpValue;
            } else {
                i++;
            }
        }
    }


    return results.a;
}
