package com.jacknie.sample.chat.repository

import com.jacknie.sample.chat.model.ChatRoom
import com.jacknie.sample.chat.model.ChatRoomFilter
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import reactor.core.publisher.Mono

interface ChatRoomCustomRepository {

    fun findAll(filter: ChatRoomFilter, pageable: Pageable): Mono<Page<ChatRoom>>

}
