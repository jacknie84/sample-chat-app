package com.jacknie.sample.chat.webflux.handler

import com.jacknie.sample.chat.model.ChatRoom
import com.jacknie.sample.chat.model.ChatRoomFilter
import com.jacknie.sample.chat.repository.ChatCategoryRepository
import com.jacknie.sample.chat.repository.ChatRoomRepository
import org.springframework.stereotype.Component
import org.springframework.util.MultiValueMap
import org.springframework.web.reactive.function.server.ServerRequest
import org.springframework.web.reactive.function.server.ServerResponse
import reactor.core.publisher.Mono

@Component
class ChatRoomHandler(
    private val chatRoomRepository: ChatRoomRepository,
    private val chatCategoryRepository: ChatCategoryRepository,
    private val validation: Validation,
) {

    fun postChatRoom(request: ServerRequest): Mono<ServerResponse> {
        return validation.bodyToMono<CreateChatRoom>(request)
            .map { ChatRoom(subject = it.subject, capacity = it.capacity, categoryId = it.categoryId) }
            .flatMap { validateCategoryId(it) }
            .flatMap { chatRoomRepository.save(it) }
            .map { request.uriBuilder().path("/{id}").build(it.id) }
            .flatMap { ServerResponse.created(it).build() }
    }

    fun getChatRoom(request: ServerRequest): Mono<ServerResponse> {
        return request.pathVariable("id")
            .let { validation.toLong(it, "id must be integer") }
            .flatMap { chatRoomRepository.findById(it) }
            .flatMap { ServerResponse.ok().bodyValue(it) }
            .switchIfEmpty(ServerResponse.notFound().build())
    }

    fun getChatRooms(request: ServerRequest): Mono<ServerResponse> {
        val queryParams = request.queryParams()
        val filter = getChatRoomFilter(queryParams)
        val pageable = getPageable(queryParams)
        return chatRoomRepository.findAll(filter, pageable).flatMap { paginationServerResponse(it) }
    }

    private fun getChatRoomFilter(queryParams: MultiValueMap<String, String>): ChatRoomFilter {
        val keyword = queryParams.getFirst("keyword")
        return ChatRoomFilter(keyword)
    }

    private fun validateCategoryId(room: ChatRoom): Mono<ChatRoom> {
        val roomMono = Mono.just(room)
        val categoryId = room.categoryId
        val booleanMono = chatCategoryRepository.existsById(categoryId)
        val errorMessage = "categoryId(${categoryId})로 ChatCategory 를 찾을 수 없습니다."
        return validation.assertTrue(booleanMono, errorMessage).then(roomMono)
    }

}
