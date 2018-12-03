package day03

import java.io.File

fun main(args: Array<String>) {
    val map = Array(1500, { Array(1500, { mutableListOf<Int>() }) })
    var lines = 0
    File("src/day03/input").forEachLine {
        readPartition(map, it)
        lines = lines.plus(1)
    }
    println("Part1 : " + countRepetitions(map))
    println("Part2 : " + findOverlap(map, lines))

}

fun readPartition(map: Array<Array<MutableList<Int>>>, it: String) {
    val regex = Regex("#(\\d+) @ (\\d+),(\\d+): (\\d+)x(\\d+)")
    val match = regex.find(it)
    val id = match!!.groupValues.get(1).toInt()
    val x = match!!.groupValues.get(2).toInt()
    val y = match!!.groupValues.get(3).toInt()
    val width = match!!.groupValues.get(4).toInt()
    val height = match!!.groupValues.get(5).toInt()
    for (i in x until (x + width)) {
        for (j in y until (y + height)) {
            map[i][j].add(id)
        }
    }
}

fun countRepetitions(map: Array<Array<MutableList<Int>>>): Int {
    var result = 0
    for (i in 0 until map.size) {
        for (j in 0 until map[i].size) {
            if (map[i][j].size > 1) {
                result += 1
            }
        }
    }
    return result
}

fun findOverlap(map: Array<Array<MutableList<Int>>>, max: Int): Int {
    var result = 0
    for (x in 0 until max) {
        var overlap = false
        for (i in 0 until map.size) {
            for (j in 0 until map[i].size) {
                if (map[i][j].contains(x) && map[i][j].size > 1) {
                    overlap = true
                    break
                }
            }
            if(overlap) {
                break
            }
        }
        if(!overlap) {
            result = x
        }
    }
    return result
}