package day02

import java.io.File

fun main(args: Array<String>) {
    val words = File("src/day02/input").useLines { it.toList() }
    for(i in 0 until words.size - 1) {
        for(j in i + 1 until words.size) {
            val sameLetters = getSameLetters(words[i], words[j])
            if (sameLetters.length == words[i].length - 1) {
                println(sameLetters)
                break
            }
        }
    }
}

fun getSameLetters(str1: String, str2: String): String {
    var result = ""
    for(i in 0 until str1.length) {
        if(str1[i] == str2[i]) {
            result += str1[i]
        }
    }
    return result
}
