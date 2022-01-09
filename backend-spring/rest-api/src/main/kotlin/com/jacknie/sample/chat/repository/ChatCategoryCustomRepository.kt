package com.jacknie.sample.chat.repository

import com.jacknie.sample.chat.model.ChatCategory
import com.jacknie.sample.chat.model.ChatCategoryFilter
import reactor.core.publisher.Flux

interface ChatCategoryCustomRepository {

    fun findAll(filter: ChatCategoryFilter): Flux<ChatCategory>

}
