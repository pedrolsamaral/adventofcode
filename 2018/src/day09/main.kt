package day09

const val PLAYERS = 403
const val LAST_MARBLE = 71920

fun main(args: Array<String>) {
    var part1 = findWinningScore(LAST_MARBLE)
    var part2 = findWinningScore(LAST_MARBLE * 100)
    println("Part 01 : $part1")
    println("Part 02 : $part2")
}

fun findWinningScore(last: Int): Int {
    var players = Array(PLAYERS, { 0 })
    var circle = mutableListOf(0)
    var current = 0
    for (i in 1..last) {
        if (i % 23 == 0) {
            current = if ((current - 7) > 0) (current - 7) else (circle.size - Math.abs(current - 7))
            var removed = circle.removeAt(current)
            players[i % players.size] += i + removed
        } else {
            current = ((current + 1) % (circle.size)) + 1
            circle.add(current, i)
        }
    }
    return players.max()!!
}