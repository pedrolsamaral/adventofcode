def read_stream():
    result = ""
    for line in open("day09/input"):
        result += line
    return result


def count_total_score(string: str):
    points = 0
    points_per_group = 1
    skip = False
    garbage = False
    characters = 0
    for next_char in string:
        if skip:
            skip = False
        elif next_char == "!":
            skip = True
        elif garbage is False and next_char == "<":
            garbage = True
        elif next_char == ">":
            garbage = False
        elif garbage is False and next_char == "{":
            points += points_per_group
            points_per_group += 1
        elif garbage is False and next_char == "}":
            points_per_group -= 1
        elif garbage is True:
            characters += 1
    return (points, characters)


RESULT = count_total_score(read_stream())
print("Part 1")
print(RESULT[0])
print("Part 1")
print(RESULT[1])
