package day01

import java.io.File
import kotlin.system.exitProcess

fun main(args: Array<String>) {
    var log = mutableMapOf<Int, Boolean>()
    var sum = 0
    log[sum] = true
    while(true) {
        File("src/day01/input").forEachLine {
            sum += it.toInt()
            if (log[sum] == true) {
                println("Duplicated: $sum")
                exitProcess(0)
            }
            log[sum] = true
        }
    }
}