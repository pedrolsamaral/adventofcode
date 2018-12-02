package day02

import java.io.File

fun main(args: Array<String>) {
    var doubles = 0
    var triples = 0
    File("src/day02/input").forEachLine {
        var count = it.chunked(1).groupingBy { by -> by }.eachCount()
        doubles = doubles.plus(if (count.containsValue(2)) 1 else 0)
        triples = triples.plus(if (count.containsValue(3)) 1 else 0)
    }
    println(doubles * triples)
}