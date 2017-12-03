import numpy as np

def change_direction(direction: list) -> list:
    if direction[0] == -1:
        result = [0,-1]
    elif direction[1] == -1:
        result = [1, 0]
    elif direction[0] == 1:
        result = [0, 1]
    else:
        result = [-1, 0]
    return result

def calculate_position(target: int) -> list:
    position = (0, 0)
    direction = [1, 0]
    steps = 1
    steps_left = 1
    to_increase = 2

    for _ in range(1, target):
        position = (position[0] + direction[0], position[1] + direction[1])
        steps_left -= 1

        if steps_left == 0:
            to_increase -= 1
            direction = change_direction(direction)
            if to_increase == 0:
                to_increase = 2
                steps += 1
            steps_left = steps


    return position

def calculate_shortest_path(target: int):
    position = calculate_position(target)
    print(position)
    return abs(position[0]) + abs(position[1])

def sum_adjacent(arr, position):
    result = 0
    for i in range(-1, 2):
        for j in range(-1, 2):
            if i != 0 or j != 0:
                result += arr[position[0] + i, position[1] + j]
    return result

def find_next(at_least: int):
    size = 100
    arr = np.zeros((size, size))
    arr[(size//2, size//2)] = 1
    position = (size//2, size//2)
    direction = [1, 0]
    steps = 1
    steps_left = 1
    to_increase = 2

    while int(arr[position]) < at_least:
        position = (position[0] + direction[0], position[1] + direction[1])
        arr[position] = sum_adjacent(arr, position)
        steps_left -= 1

        if steps_left == 0:
            to_increase -= 1
            direction = change_direction(direction)
            if to_increase == 0:
                to_increase = 2
                steps += 1
            steps_left = steps


    return int(arr[position])

print("Part1")
print(calculate_shortest_path(347991))
print("Part2")
print(find_next(347991))
