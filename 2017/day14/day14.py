import re
from day10 import calculate_full_hash, initialize_array


def initialize_grid():
    result = []
    for _ in range(0, 128):
        result.append([])
    return result


def build_row(str_input):
    result = []
    knot_hash = list(calculate_full_hash(
        str_input, initialize_array(256)))
    for knot in knot_hash:
        result.extend(bin(int(knot, 16))[2:].zfill(4))
    return list(map(int, result))


def fill_grid(str_input):
    grid = []
    for i in range(0, 128):
        grid.append(build_row(str_input + "-" + str(i)))
    return grid


def count_zeros(str_input):
    result = 0
    grid = fill_grid(str_input)
    for row in grid:
        result += row.count(1)
    return result


def expand_region(grid, i, j, region_num):
    if i > 0 and grid[i - 1][j] == 1:
        grid[i - 1][j] = region_num
    if i < (len(grid) - 1) and grid[i + 1][j] == 1:
        grid[i + 1][j] = region_num
    if j > 0 and grid[i][j - 1] == 1:
        grid[i][j - 1] = region_num
    if j < (len(grid[i]) - 1) and grid[i][j + 1] == 1:
        grid[i][j + 1] = region_num


def count_regions(str_input):
    result = 1
    grid = fill_grid(str_input)
    for i in range(0, len(grid)):
        for j in range(0, len(grid[i])):
            if grid[i][j] == 1:
                result += 1
                grid[i][j] = result
            if grid[i][j] > 0:
                expand_region(grid, i, j, grid[i][j])
    return result


print("Part1")
# print(count_zeros("nbysizxe"))
print("Part2")
print(count_regions("flqrgnkx"))
