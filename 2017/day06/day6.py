def read_blocks():
    result = []
    for line in open("day06/input"):
        line = line.rstrip("\n")
        result = list(map(int, line.split("\t")))
    return result


def redistribute(blocks: list):
    value = max(blocks)
    index = blocks.index(value)
    blocks[index] = 0

    while value > 0:
        index = (index + 1) % len(blocks)
        blocks[index] += 1
        value -= 1

    return blocks


def count_cycles_and_loop_size():
    result = 0
    past = []
    blocks = read_blocks()
    previous = ""

    while previous not in past:
        past.append(previous)
        blocks = redistribute(blocks)
        previous = "".join(map(str, blocks))
        result += 1

    return (result, len(past) - past.index(previous))


CYCLES, LOOP_SIZE = count_cycles_and_loop_size()
print("Part 1")
print(CYCLES)
print("Part 2")
print(LOOP_SIZE)
