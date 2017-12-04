def read_phrases():
    result = []
    for line in open("day04/input"):
        line = line.rstrip("\n")
        result.append(line.split(" "))
    return result


def has_no_duplicates(phrase: list):
    uniques = []
    for word in phrase:
        if word in uniques:
            return False
        else:
            uniques.append(word)
    return True


def is_anagram(word1: str, word2: str):
    if len(word1) != len(word2):
        return False
    for char in word1:
        if word1.count(char) != word2.count(char):
            return False
    return True


def has_no_anagrams(phrase: list):
    for i in range(0, len(phrase) - 1):
        for j in range(i + 1, len(phrase)):
            if is_anagram(phrase[i], phrase[j]):
                return False
    return True


def count_valid_phrases(function):
    valid = 0
    phrases = read_phrases()

    for phrase in phrases:
        valid += 1 if function(phrase) else 0

    return valid


print("Part 1")
print(count_valid_phrases(has_no_duplicates))
print("Part 2")
print(count_valid_phrases(has_no_anagrams))
