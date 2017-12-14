
def initialize_array(size):
    result = []
    for i in range(0, size):
        result.append(i)
    return result


def reverse_sub_array(array, curr_position, length):
    sub_array = []

    i = curr_position
    for _ in range(0, length):
        sub_array.append(array[i])
        i = (i + 1) % len(array)

    sub_array.reverse()

    i = curr_position
    for j in range(0, length):
        array[i] = sub_array[j]
        i = (i + 1) % len(array)

    return array


def apply_knot_hash(lengths, array, curr_position, skip):
    for length in lengths:
        array = reverse_sub_array(array, curr_position, length)
        curr_position = (curr_position + length + skip) % len(array)
        skip += 1
    return (array, curr_position, skip)


def calculate_simple_hash(lengths, array, curr_position, skip):
    result = apply_knot_hash(lengths, array, curr_position, skip)
    return result[0][0] * result[0][1]


def to_ascii(string_lengths):
    result = []
    for length in string_lengths:
        result.append(ord(str(length)))
    result.extend([17, 31, 73, 47, 23])
    return result


def apply_xor(array):
    result = []
    for i in range(0, len(array) // 16):
        xor = 0
        for j in range(0, 16):
            xor ^= array[i * 16 + j]
        result.append(xor)
    return result


def to_hexa(array):
    result = ""
    for entry in array:
        hexa = hex(entry)[2:]
        result += hexa if len(hexa) == 2 else "0" + hexa
    return result


def calculate_full_hash(lengths, array):
    ascii_lengths = to_ascii(lengths)
    curr_position = 0
    skip = 0
    for _ in range(0, 64):
        array, curr_position, skip = apply_knot_hash(
            ascii_lengths, array, curr_position, skip)
    array = apply_xor(array)
    return to_hexa(array)
