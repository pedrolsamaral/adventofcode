import re


def read_firewall():
    result = []
    line_regex = re.compile("(\\d+): (\\d+)")
    i = 0
    for line in open("day13/input"):
        line_match = line_regex.match(line)
        while i < int(line_match.group(1)):
            result.append(0)
            i += 1
        result.append(int(line_match.group(2)))
        i += 1
    return result


def is_detected(time, depth):
    return depth != 0 and time % ((depth - 1) * 2) == 0


def calculate_severity():
    severity = 0
    firewall = read_firewall()
    for i in range(0, len(firewall)):
        if is_detected(i, firewall[i]):
            severity += (firewall[i] * i)
    return severity


def calculate_if_caught(delay, firewall):
    for i in range(0, len(firewall)):
        if is_detected(i + delay, firewall[i]):
            return True
    return False


def calculate_non_detection_time():
    delay = 0
    firewall = read_firewall()
    while calculate_if_caught(delay, firewall):
        delay += 1

    return delay


print("Part1")
print(calculate_severity())
print("Part2")
print(calculate_non_detection_time())
