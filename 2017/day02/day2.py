def read_sheet():
    result = []
    for line in open("./input"):
        result.append(list(map(int, line.split("\t"))))
    return result

def sheet_checksum():
    sum = 0
    for row in read_sheet():
        sum += max(row) - min(row)
    return sum

def sheet_divibles():
    sum = 0
    for row in read_sheet():
        for i in row:
            for j in row:
                sum += (i // j) if (i != j and i%j == 0) else 0    
    return sum


print(sheet_checksum())
print(sheet_divibles())
