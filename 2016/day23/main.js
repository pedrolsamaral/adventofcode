var inputRegex = /\w+/g;

function findValueA(inputs, results) {
    var i = 0;
    while (i < inputs.length) {
        var info;
        if ((info = /cpy (-*)(\w+) (\w)/.exec(inputs[i]))) {
            if (results[info[3]] !== undefined) {
                if (parseInt(info[2]) >= 0) {
                    results[info[3]] = parseInt(info[2]);
                    if (info[1].length > 0) {
                        results[info[3]] = -results[info[3]];
                    }
                } else {
                    results[info[3]] = results[info[2]];
                }
            }
        } else if ((info = /inc (\w)/.exec(inputs[i]))) {
            results[info[1]]++;
        } else if ((info = /dec (\w)/.exec(inputs[i]))) {
            results[info[1]]--;
        } else if ((info = /jnz (-*)(\w+) (-*)(\w+)/.exec(inputs[i]))) {
            var jumpValue = parseInt(info[4]) >= 0 ? parseInt(info[4]) : results[info[4]];
            if (info[3].length > 0) {
                jumpValue = -jumpValue;
            }

            var compValue = parseInt(info[2]) >= 0 ? parseInt(info[2]) : results[info[2]];
            if (compValue != 0) {
                i = (i + jumpValue) - 1;
            }
        } else if ((info = /tgl (\w)/.exec(inputs[i]))) {
            var targetInput = inputs[i + results[info[1]]];
            if (targetInput) {
                var newCmd, cmd = targetInput.substring(0, 3);
                if (cmd === 'inc') {
                    newCmd = 'dec';
                } else if (cmd === 'dec' || cmd === 'tgl') {
                    newCmd = 'inc';
                } else if (cmd === 'jnz') {
                    newCmd = 'cpy';
                } else if (cmd === 'cpy') {
                    newCmd = 'jnz';
                }

                if (newCmd) {
                    inputs[i + results[info[1]]] = newCmd + inputs[i + results[info[1]]].substring(3);
                }
            }
        } else if((info = /mul/.exec(inputs[i]))) {
            results.a = results.b * results.d;
            results.d = 0;
            results.c = 0;
        }
        i++;
    }


    return results.a;
}
