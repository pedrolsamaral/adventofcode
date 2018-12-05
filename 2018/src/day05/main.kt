package day05

import java.io.File

fun main(args: Array<String>) {
    val input = File("src/day05/input").useLines { it.toList() }[0]
    val reacted = fullyReact(input)
    val fixedAndReacted = fixAndReact(input)

    println("Part 01: " + reacted.length)
    println("Part 02: " + fixedAndReacted.length)
}

fun fixAndReact(polymer: String): String {
    var shortestReaction: String = polymer
    for(i in 'a'..'z') {
        val fixed = polymer.replace(i.toString(), "").replace(i.toString().toUpperCase(), "")
        val reacted = fullyReact(fixed)
        if(shortestReaction.length > reacted.length) {
            shortestReaction = reacted
        }
    }
    return shortestReaction
}

fun fullyReact(polymer: String): String {
    var result = polymer
    var end = false
    var i = 0

    while (!end) {
        if (reacts(result[i], result[i + 1])) {
            result = result.substring(0, i) + result.substring(i + 2, result.length)
            i = 0
        } else {
            i++
        }
        if(i + 1 >= result.length) {
            end = true
        }
    }
    return result
}

fun reacts(s1: Char, s2: Char): Boolean {
    return s1 != s2 && (s1.toLowerCase() == s2 || s1.toUpperCase() == s2)
}
