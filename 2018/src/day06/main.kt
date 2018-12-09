package day06

import java.io.File

fun main(args: Array<String>) {
    val coordinates = readCoordinates()
    val map = calculateMap(coordinates)
    println("Part 01 : " + calculateLargest(coordinates, map))
    println("Part 02 : " + calculateLessThenArea(map, 10000))
}

fun calculateLessThenArea(map: Array<Array<Triple<Int, Int, Int>>>, max: Int): Int {
    var area = 0
    for (x in 0 until map.size) {
        for (y in 0 until map[x].size) {
            area += if (map[x][y].third < max) 1 else 0
        }
    }
    return area
}

fun calculateLargest(coordinates: List<Pair<Int, Int>>, map: Array<Array<Triple<Int, Int, Int>>>): Int {
    var largestArea = 0
    for (i in 0 until coordinates.size) {
        if(!isInfinite(i, map)) {
            var area = calculateArea(i, map)
            largestArea =  if (area > largestArea) area else largestArea
        }
    }
    return largestArea
}

fun isInfinite(id: Int, map: Array<Array<Triple<Int, Int, Int>>>): Boolean {
    var infinite = false
    for (i in 0 until map.size) {
        if (map[0][i].first == id || map[map.size - 1][i].first == id || map[i][0].first == id || map[i][map.size - 1].first == id ) {
            infinite = true
            break
        }
    }
    return infinite
}

fun calculateArea(id: Int, map: Array<Array<Triple<Int, Int, Int>>>): Int {
    var area = 0
    for (x in 0 until map.size) {
        for (y in 0 until map[x].size) {
            area += if (map[x][y].first == id) 1 else 0
        }
    }
    return area
}


fun calculateMap(coordinates: List<Pair<Int, Int>>): Array<Array<Triple<Int, Int, Int>>> {
    val infinite = 2000

    val map = Array(infinite, { Array(infinite, { Triple(-1, Int.MAX_VALUE, 0) }) })
    for (x in 0 until infinite) {
        for (y in 0 until infinite) {
            for (i in 0 until coordinates.size) {
                val distance = calculateDistance(x, y, coordinates[i])

                if (distance < map[x][y].second) {
                    map[x][y] = Triple(i, distance, map[x][y].third + distance)
                } else if (distance == map[x][y].second) {
                    map[x][y] = Triple(-1, distance, map[x][y].third + distance)
                } else {
                    map[x][y] = Triple(map[x][y].first, map[x][y].second, map[x][y].third + distance)
                }
            }
        }
    }
    return map
}

fun calculateDistance(x: Int, y: Int, place: Pair<Int, Int>): Int {
    return Math.abs(x - place.first) + Math.abs(y - place.second)
}

fun readCoordinates(): List<Pair<Int, Int>> {
    val regex = Regex("(\\d+), (\\d+)")
    val list = mutableListOf<Pair<Int, Int>>()

    File("src/day06/input").forEachLine {
        val match = regex.find(it)
        list.add(Pair(match!!.groupValues[1].toInt(), match!!.groupValues[2].toInt()))
    }

    return list
}