package com.jacknie.sample.chat.handler

import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.util.MultiValueMap

fun getPageable(queryParams: MultiValueMap<String, String>): Pageable {
    val page = queryParams.getFirst("page")?.toInt() ?: 1
    val size = queryParams.getFirst("size")?.toInt() ?: 10
    val sort = queryParams["sort"] ?: emptyList()
    val orders = sort.filterNot { it.isNullOrBlank() }.flatMap { parseSortParam(it) };
    return PageRequest.of(page, size, Sort.by(orders))
}

fun parseSortParam(sortParam: String): List<Sort.Order> {
    val elements = sortParam.split(",").filter { it.isNotBlank() }.map { it.trim() }
    val direction = Sort.Direction.fromString(elements.last())
    val properties = elements.subList(0, elements.size - 1).filter { it.isNotBlank() }.map { it.trim() }
    return properties.map { Sort.Order(direction, it) }
}
