import re


def read_programs():
    result = {}
    line_regex = re.compile("(\\d+) <-> (.+)")
    for line in open("day12/input"):
        line_match = line_regex.match(line)
        result[line_match.group(1)] = line_match.group(2).split(", ")
    return result


def calculate_group_size(child_programs: list, all_programs: dict, groups: list):
    size = 0
    for child in child_programs:
        if child not in groups and child in all_programs:
            groups.append(child)
            size += 1 + calculate_group_size(
                all_programs.pop(child), all_programs, groups)
    return size


def calculate_zero_group_size():
    programs = read_programs()
    return 1 + calculate_group_size(programs['0'], programs, ['0'])


def calculate_all_groups():
    programs = read_programs()
    all_groups = []
    while programs:
        index = next(iter(programs))
        all_groups.append(index)
        calculate_group_size(programs.pop(index), programs, [index])

    return len(all_groups)


print("Part1")
print(calculate_zero_group_size())
print("Part1")
print(calculate_all_groups())
