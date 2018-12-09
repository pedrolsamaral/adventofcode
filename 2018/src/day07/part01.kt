package day07

import java.io.File

fun main(args: Array<String>) {
    val steps = readSteps()
    val order = calculateOrder(steps)

    println("Part 01 : $order")
}

fun calculateOrder(steps: List<Pair<Char, Char>>): String {
    var map = buildMap(steps)
    var order = ""
    while (map.isNotEmpty()) {
        order += processNextStep(map)
    }

    return order
}


fun processNextStep(map: MutableMap<Char, Step>): Char {
    var steps = mutableListOf<Step>()
    for (value in map.values) {
        if (value.before.size == 0) {
            steps.add(value)
        }
    }
    steps.sortWith(compareBy { it.id })
    map.remove(steps[0].id)
    steps[0].after.forEach { it.before.remove(steps[0]) }
    return steps[0].id
}
