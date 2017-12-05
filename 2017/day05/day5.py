def read_jumps():
    result = []
    for line in open("day05/input"):
        line = line.rstrip("\n")
        result.append(int(line))
    return result


def increase_one(jump):
    return 1


def increase_or_decrease(jump):
    return 1 if jump < 3 else -1


def calculate_steps(function):
    jumps = read_jumps()
    steps = 0
    i = 0
    try:
        while True:
            previous_i = i
            i += jumps[i]
            jumps[previous_i] += function(jumps[previous_i])
            steps += 1
    except:
        pass
    return steps


print("Part 1")
print(calculate_steps(increase_one))
print("Part 2")
print(calculate_steps(increase_or_decrease))
