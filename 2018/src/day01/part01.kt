package day01

import java.io.File

fun main(args: Array<String>) {
    var sum = 0
    File("src/day01/input").forEachLine { sum += it.toInt() }
    println(sum)
}