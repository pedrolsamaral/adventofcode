import re
import collections


class Program:
    children = None
    weight = None
    name = None
    total_weight = 0


def read_programs():
    name_weight_re = re.compile("(\w+) \((\d+)\)")
    children_re = re.compile(".+ -> (.+)")
    result = []
    for line in open("day07/input"):
        line = line.rstrip("\n")
        name_weight = name_weight_re.match(line + "")
        children = children_re.match(line + "")

        program = Program()
        program.name = name_weight.group(1)
        program.weight = name_weight.group(2)
        if children != None:
            program.children = children.group(1).split(", ")
        result.append(program)
    return result


def find_node(name, programs):
    return next(x for x in programs if x.name == name)


def build_sub_tree(program, programs):
    if program.children != None:
        node = Program()
        node.name = program.name
        node.weight = find_node(program.name, programs).weight
        node.children = []
        for child in program.children:
            node.children.append(build_sub_tree(
                find_node(child, programs), programs))
        return node
    else:
        return program


def find_root(programs):
    for program in programs:
        if program.children != None:
            found = False
            for other_program in programs:
                if other_program.children != None and program.name in other_program.children:
                    found = True
                    break

            if found is False:
                return program
    return None


def sum_all_child(program):
    program.total_weight = int(program.weight)
    if program.children != None:
        for child in program.children:
            program.total_weight += sum_all_child(child).total_weight
    return program


def get_children_weight(program):
    return map(lambda x: x.weight, program.children)


def get_wrong_child(program):
    counter = collections.Counter(get_children_weight(program))
    for c in counter.elements
        if c.


def find_wrong_program(program, parent):
    if len(collections.Counter(get_children_weight(program)).keys()) == 1:
        return (program, parent)
    else:
        # TODO: fIND WRONG
        found = find_wrong_program(child, program)
    return None


def find_wrong_weight():
    programs = read_programs()
    parent_node = sum_all_child(build_sub_tree(find_root(programs), programs))
    curr_node = parent_node
    return find_wrong_program(tree, None)


# print(find_root(read_programs()).name)
print(find_wrong_weight())
