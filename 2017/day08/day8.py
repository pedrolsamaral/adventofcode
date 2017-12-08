import re

class Instruction:
    letter = None
    operation = None
    left = None
    compare = None
    right = None
    number = None

def read_instructions():
    line_re = re.compile("(\\w+) (inc|dec) (-?\\d+) if (\\w+) (.+) (-?\\d+)")
    result = []
    for line in open("day08/input"):
        line = line.rstrip("\n")
        match = line_re.match(line)
        ins = Instruction()
        ins.letter = match.group(1)
        ins.operation = match.group(2)
        ins.number = int(match.group(3))
        ins.left = match.group(4)
        ins.compare = match.group(5)
        ins.right = int(match.group(6))
        result.append(ins)
    return result

def initialize_letters(instructions):
    result = {}
    for instruction in instructions:
        result[instruction.letter] = 0
    return result 

def process_instructions():
    instructions = read_instructions()
    letters = initialize_letters(instructions)
    largest = 0
    for instruction in instructions:
        if instruction.operation == "inc":
            if instruction.compare == "<":
                letters[instruction.letter] += instruction.number if letters[instruction.left] < instruction.right else 0
            elif instruction.compare == ">":
                letters[instruction.letter] += instruction.number if letters[instruction.left] > instruction.right else 0
            elif instruction.compare == "==":
                letters[instruction.letter] += instruction.number if letters[instruction.left] == instruction.right else 0
            elif instruction.compare == "!=":
                letters[instruction.letter] += instruction.number if letters[instruction.left] != instruction.right else 0                
            elif instruction.compare == ">=":
                letters[instruction.letter] += instruction.number if letters[instruction.left] >= instruction.right else 0
            elif instruction.compare == "<=":
                letters[instruction.letter] += instruction.number if letters[instruction.left] <= instruction.right else 0
        if instruction.operation == "dec":
            if instruction.compare == "<":
                letters[instruction.letter] -= instruction.number if letters[instruction.left] < instruction.right else 0
            elif instruction.compare == ">":
                letters[instruction.letter] -= instruction.number if letters[instruction.left] > instruction.right else 0
            elif instruction.compare == "==":
                letters[instruction.letter] -= instruction.number if letters[instruction.left] == instruction.right else 0
            elif instruction.compare == "!=":
                letters[instruction.letter] -= instruction.number if letters[instruction.left] != instruction.right else 0                
            elif instruction.compare == ">=":
                letters[instruction.letter] -= instruction.number if letters[instruction.left] >= instruction.right else 0
            elif instruction.compare == "<=":
                letters[instruction.letter] -= instruction.number if letters[instruction.left] <= instruction.right else 0
        curr_largest = find_largest(letters) 
        largest = curr_largest if curr_largest > largest else largest        
    return (letters, largest)

def find_largest(letters):
    largest = 0
    for letter, size in letters.items():
        largest = size if size > largest else largest
    return largest

def find_final_largest():
    return find_largest(process_instructions()[0])

def find_overall_largest():
    return process_instructions()[1]

print("Part 1")
print(find_final_largest())
print("Part 2")
print(find_overall_largest())
