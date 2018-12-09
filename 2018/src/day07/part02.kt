package day07

const val TIME = 60
const val WORKERS_SIZE = 5

fun main(args: Array<String>) {
    val steps = readSteps()
    val time = calculateTimedOrder(steps)

    println("Part 02 : $time")
}

fun calculateTimedOrder(steps: List<Pair<Char, Char>>): Int {
    var map = buildMap(steps)
    var workers = Array(WORKERS_SIZE, { Pair<Step?, Int>(null, 0) })
    var duration = -1
    while (map.isNotEmpty()) {
        processTime(workers, map)
        duration++
    }

    return duration
}

fun processTime(workers: Array<Pair<Step?, Int>>, map: MutableMap<Char, Step>): String {
    for (i in 0 until workers.size) {
        if (workers[i].first != null && workers[i].second > 0) {
            workers[i] = Pair(workers[i].first, workers[i].second.minus(1))
        }
    }

    val result = finishWork(workers, map)
    assignWork(workers, map)
    return result
}

fun finishWork(workers: Array<Pair<Step?, Int>>, map: MutableMap<Char, Step>): String {
    var result = ""
    for(i in 0 until workers.size) {
        if (workers[i].first != null && workers[i].second == 0) {
            map.values.forEach { it2 -> it2.before.remove(workers[i].first!!) }
            map.remove(workers[i].first!!.id)
            result += workers[i].first!!.id
            workers[i] = Pair(null, 0)
        }
    }
    return result
}

fun assignWork(workers: Array<Pair<Step?, Int>>, map: MutableMap<Char, Step>) {
    var next = getNextStep(map)
    while (workersAvailable(workers) && next != null) {
        for (i in 0 until workers.size) {
            if (workers[i].first == null) {
                workers[i] = Pair(next, TIME + (next.id.toLowerCase().toInt() - 96))
                next.working = true
                break
            }
        }
        next = getNextStep(map)
    }
}

fun workersAvailable(workers: Array<Pair<Step?, Int>>): Boolean {
    return workers.count { it.first == null } > 0
}

fun getNextStep(map: MutableMap<Char, Step>): Step? {
    var steps = mutableListOf<Step>()
    for (value in map.values) {
        if (!value.working && value.before.size == 0) {
            steps.add(value)
        }
    }
    steps.sortWith(compareBy { it.id })
    return if (steps.isNotEmpty()) steps[0] else null
}