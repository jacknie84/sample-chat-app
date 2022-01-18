package com.jacknie.sample.chat.webflux.handler

import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.util.MultiValueMap
import org.springframework.web.reactive.function.server.ServerResponse
import reactor.core.publisher.Mono

fun getPageable(queryParams: MultiValueMap<String, String>): Pageable {
    val page = queryParams.getFirst("page")?.toInt() ?: 0
    val size = queryParams.getFirst("size")?.toInt() ?: 10
    return if (page >= 0 && size > 0) {
        val sort = queryParams["sort"] ?: emptyList()
        val orders = sort.filterNot { it.isNullOrBlank() }.flatMap { parseSortParam(it) }
        PageRequest.of(page, size, orders.takeIf { it.isNotEmpty() }?.let { Sort.by(it) }?: Sort.unsorted())
    } else {
        Pageable.unpaged()
    }
}

fun parseSortParam(sortParam: String): List<Sort.Order> {
    val elements = sortParam.split(",").filter { it.isNotBlank() }.map { it.trim() }
    val direction = Sort.Direction.fromString(elements.last())
    val properties = elements.subList(0, elements.size - 1).filter { it.isNotBlank() }.map { it.trim() }
    return properties.map { Sort.Order(direction, it) }
}

fun <T> paginationServerResponse(page: Page<T>): Mono<ServerResponse> {
    return ServerResponse.ok()
        .headers { it.add("X-Total-Count", page.totalElements.toString()) }
        .bodyValue(page.content)
}
