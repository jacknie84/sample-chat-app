package com.jacknie.sample.chat.handler

import com.jacknie.sample.chat.model.ChatCategory
import com.jacknie.sample.chat.model.ChatCategoryFilter
import com.jacknie.sample.chat.repository.ChatCategoryRepository
import org.springframework.stereotype.Component
import org.springframework.util.MultiValueMap
import org.springframework.web.reactive.function.server.ServerRequest
import org.springframework.web.reactive.function.server.ServerResponse
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Component
class ChatCategoryHandler(
    private val chatCategoryRepository: ChatCategoryRepository,
    private val validation: Validation,
) {

    fun postChatCategory(request: ServerRequest): Mono<ServerResponse> {
        return validation.bodyToMono<CreateChatCategory>(request)
            .map { ChatCategory(name = it.name, parentId = it.parentId) }
            .flatMap { validateParentId(it) }
            .flatMap { chatCategoryRepository.save(it) }
            .map { request.uriBuilder().path("/{id}").build(it.id) }
            .flatMap { ServerResponse.created(it).build() }
    }

    fun getChatCategories(request: ServerRequest): Mono<ServerResponse> {
        val queryParams = request.queryParams()
        return getChatCategoryFilter(queryParams)
            .flatMapMany { chatCategoryRepository.findAll(it) }
            .collectList()
            .flatMap { ServerResponse.ok().bodyValue(it) }
    }

    fun getChatCategory(request: ServerRequest): Mono<ServerResponse> {
        return request.pathVariable("id")
            .let { validation.toLong(it, "id must be integer") }
            .flatMap { chatCategoryRepository.findById(it) }
            .flatMap { ServerResponse.ok().bodyValue(it) }
            .switchIfEmpty(ServerResponse.notFound().build())
    }

    private fun getChatCategoryFilter(queryParams: MultiValueMap<String, String>): Mono<ChatCategoryFilter> {
        val ids = queryParams["ids"]?.map { validation.toLong(it, "cannot bind ids(${it})") }?: emptyList()
        return Flux.concat(ids).collectList()
            .map { ChatCategoryFilter(ids = it.toSet()) }
            .map { validation.validate(it) }
    }

    private fun validateParentId(category: ChatCategory): Mono<ChatCategory> {
        val categoryMono = Mono.just(category);
        val parentId = category.parentId
        return if (parentId != null) {
            val booleanMono = chatCategoryRepository.existsById(parentId)
            val errorMessage = "parentId(${parentId})로 ChatCategory 를 찾을 수 없습니다."
            validation.assertTrue(booleanMono, errorMessage).then(categoryMono)
        } else {
            categoryMono
        }
    }

}
