package day08

import java.io.File

class Node(id: Int) {
    val id = id
    var parent: Node? = null
    var metadataLeft = -1
    var childrenLeft = -1
    var metadata: MutableList<Int> = mutableListOf()
    var children: MutableList<Node> = mutableListOf()
}

enum class Next {
    CHILDREN_SIZE, META_SIZE, META_ENTRY
}

fun main(args: Array<String>) {
    val root = readTree()
    val simpleMetadata = sumSimpleMetadata(root)
    val complexMetadata = sumComplexMetadata(root)
    println("Part 01 : $simpleMetadata")
    println("Part 02 : $complexMetadata")
}

fun sumComplexMetadata(node: Node): Int {
    var sum = if (node.children.isEmpty()) node.metadata.sum() else 0
    if (node.children.isNotEmpty()) {
        node.metadata.forEach {
            sum += if (node.children.size >= it) sumComplexMetadata(node.children[it - 1]) else 0
        }
    }
    return sum
}

fun sumSimpleMetadata(node: Node): Int {
    var sum = node.metadata.sum()
    if (node.children.isNotEmpty()) {
        node.children.forEach { sum += sumSimpleMetadata(it) }
    }
    return sum
}

fun readTree(): Node {
    var current = Node(-1)
    current.metadata.add(1)
    var list = mutableListOf<Int>()
    File("src/day08/input").forEachLine { it.split(" ").forEach { list.add(it.toInt()) } }

    var next = Next.CHILDREN_SIZE
    var id = 0
    list.forEach {
        when (next) {
            Next.CHILDREN_SIZE -> {
                var newNode = Node(id++)
                current.children.add(newNode)
                newNode.parent = current
                current = newNode
                current.childrenLeft = it
                next = Next.META_SIZE
            }
            Next.META_SIZE -> {
                current.metadataLeft = it
                if (current.childrenLeft > 0) {
                    next = Next.CHILDREN_SIZE
                } else {
                    next = Next.META_ENTRY
                }
            }
            Next.META_ENTRY -> {
                current.metadata.add(it)
                current.metadataLeft -= 1
                if (current.metadataLeft == 0) {
                    current = current.parent!!
                    current.childrenLeft -= 1
                    if (current.childrenLeft != 0) {
                        next = Next.CHILDREN_SIZE
                    }
                }
            }
        }
    }

    return current
}