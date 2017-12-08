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
    return map(lambda x: x.total_weight, program.children)


def get_wrong_child(program):
    counter = collections.Counter(get_children_weight(program)).most_common()
    wrong_weight = counter[1][0]
    for child in program.children:
        if child.total_weight == wrong_weight:
            return (child, counter[0][0] - wrong_weight)
    return None

def find_wrong_program(program):
    if len(collections.Counter(get_children_weight(program)).keys()) == 1:
        return None
    else:
        wrong_child = get_wrong_child(program)
        found = find_wrong_program(wrong_child[0])
        if found is None:
            return (wrong_child[0], wrong_child[1])
        else:
            return found

def find_wrong_weight():
    programs = read_programs()
    parent_node = sum_all_child(build_sub_tree(find_root(programs), programs))
    wrong_weight = find_wrong_program(parent_node)
    return int(wrong_weight[0].weight) + wrong_weight[1]


print(find_root(read_programs()).name)
print(find_wrong_weight())
