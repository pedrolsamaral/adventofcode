def read_sheet():
    result = []
    for line in open("./input"):
        result.append(list(map(int, line.split("\t"))))
    return result


def sheet_checksum():
    result = 0
    for row in read_sheet():
        result += max(row) - min(row)
    return result


def sheet_divibles():
    result = 0
    for row in read_sheet():
        for i in row:
            for j in row:
                result += (i // j) if (i != j and i % j == 0) else 0
    return result


print(sheet_checksum())
print(sheet_divibles())
