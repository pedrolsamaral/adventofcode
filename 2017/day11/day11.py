def read_path():
    result = []
    for line in open("day11/input"):
        result.extend(line.split(","))
    return result


WALK = {
    "n": lambda pos: (pos[0], pos[1] + 2),
    "ne": lambda pos: (pos[0] + 1, pos[1] + 1),
    "se": lambda pos: (pos[0] + 1, pos[1] - 1),
    "s": lambda pos: (pos[0], pos[1] - 2),
    "sw": lambda pos: (pos[0] - 1, pos[1] - 1),
    "nw": lambda pos: (pos[0] - 1, pos[1] + 1)
}


def calculate_distance(position):
    x_distance = abs(position[0])
    y_distance = (abs(position[1]) - x_distance) // 2
    return x_distance + y_distance


def calculate_walk():
    path = read_path()
    position = (0, 0)
    max = 0
    for step in path:
        position = WALK[step](position)
        curr_distance = calculate_distance(position)
        max = curr_distance if curr_distance > max else max
    return (calculate_distance(position), max)


print("Part1")
print(calculate_walk()[0])
print("Part2")
print(calculate_walk()[1])
