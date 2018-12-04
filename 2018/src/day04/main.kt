package day04

import java.io.File
import java.util.*
import java.util.Calendar
import java.text.SimpleDateFormat

class Guard(id: Int) {
    private val minutes = 60
    private var sleepingSince: Date? = null
    val minutesTracker = IntArray(60)
    var slept = 0L
    val id = id

    fun startSleeping(startedSleeping: Date) {
        if (sleepingSince == null) {
            sleepingSince = startedSleeping
        }
    }

    fun wakeUp(wakeUp: Date) {
        if (sleepingSince != null) {
            val duration = Math.abs((sleepingSince!!.time - wakeUp.time) / 1000 / minutes)
            var startingMinute = startingMinute()
            for (i in 0 until duration) {
                minutesTracker[startingMinute] += 1
                startingMinute = (startingMinute + 1) % minutes
            }
            slept += duration
            sleepingSince = null
        }
    }

    private fun startingMinute(): Int {
        val calendar = Calendar.getInstance()
        calendar.time = sleepingSince
        return calendar.get(Calendar.MINUTE)
    }
}

class ShiftAnalyzer {
    private val guards = mutableMapOf<Int, Guard>()
    private var currentGuard: Guard? = null

    private var started = Date(System.currentTimeMillis())

    fun changeGuard(newGuard: Int) {
        if (!guards.contains(newGuard)) {
            guards[newGuard] = Guard(newGuard)
        }
        currentGuard = guards[newGuard]
    }

    fun startSleeping(date: Date) {
        currentGuard?.startSleeping(date)
    }

    fun wakeUp(date: Date) {
        currentGuard?.wakeUp(date)
    }

    fun findSleepyGuard(): Pair<Int, Int> {
        var guard = guards.maxBy({ it.value.slept })!!.value
        var minute = guard.minutesTracker!!.indices.maxBy { guard.minutesTracker!![it] }!!
        return Pair(guard.id, minute)
    }

    fun findCoherentGuard(): Pair<Int, Int> {
        var biggestCoherence = 0
        var biggestMinute = 0
        var biggestGuard = -1
        for ((id, guard) in guards) {
            var guardCoherence = guard.minutesTracker!!.maxBy { it }!!
            if(guardCoherence > biggestCoherence) {
                biggestCoherence = guardCoherence
                biggestMinute = guard.minutesTracker!!.indices.maxBy { guard.minutesTracker!![it] }!!
                biggestGuard = id
            }
        }

        return Pair(biggestGuard, biggestMinute)
    }
}

fun main(args: Array<String>) {
    val analyzer = ShiftAnalyzer()
    val dateRegex = Regex("\\[(\\d\\d\\d\\d-\\d\\d-\\d\\d \\d\\d:\\d\\d)\\] .+")
    var events = File("src/day04/input").useLines { it.toList() }

    events = events.sortedWith(compareBy { convertToDate(dateRegex.find(it)!!.groupValues[1]) })
    events.forEach { readEvent(analyzer, it) }

    val sleepyGuard = analyzer.findSleepyGuard()
    val coherentGuard = analyzer.findCoherentGuard()
    println("Part 01 " + sleepyGuard.first * sleepyGuard.second)
    println("Part 02 " + coherentGuard.first * coherentGuard.second)
}

fun readEvent(analyzer: ShiftAnalyzer, change: String) {
    val dateRegex = "\\[(\\d\\d\\d\\d-\\d\\d-\\d\\d \\d\\d:\\d\\d)\\] "
    val shiftRegex = Regex(dateRegex + "Guard #(\\d+) begins shift")
    val sleepRegex = Regex(dateRegex + "falls asleep")
    val wakesRegex = Regex(dateRegex + "wakes up")

    when {
        shiftRegex.matches(change) -> analyzer.changeGuard(shiftRegex.find(change)!!.groupValues[2].toInt())
        sleepRegex.matches(change) -> analyzer.startSleeping(convertToDate(sleepRegex.find(change)!!.groupValues[1]))
        wakesRegex.matches(change) -> analyzer.wakeUp(convertToDate(wakesRegex.find(change)!!.groupValues[1]))
    }
}

fun convertToDate(str: String): Date {
    val formatter = SimpleDateFormat("yyyy-MM-dd HH:mm")
    return formatter.parse(str)
}
