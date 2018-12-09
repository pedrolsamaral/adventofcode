package day07

import java.io.File

class Step(id: Char) {
    val id = id
    var after = mutableListOf<Step>()
    var before = mutableListOf<Step>()
    var working = false
}


fun buildMap(steps: List<Pair<Char, Char>>): MutableMap<Char, Step> {
    var map = mutableMapOf<Char, Step>()
    steps.forEach {
        var first = map.getOrPut(it.first, { Step(it.first) })
        var second = map.getOrPut(it.second, { Step(it.second) })
        first.after.add(second)
        second.before.add(first)
    }
    return map
}


fun readSteps(): List<Pair<Char, Char>> {
    val regex = Regex("Step (\\w) must be finished before step (\\w) can begin")
    val list = mutableListOf<Pair<Char, Char>>()

    File("src/day07/input").forEachLine {
        val match = regex.find(it)
        list.add(Pair(match!!.groupValues[1].toCharArray()[0], match!!.groupValues[2].toCharArray()[0]))
    }

    return list
}