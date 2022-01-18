package com.jacknie.sample.chat.repository.impl

import com.jacknie.sample.chat.model.ChatCategory
import com.jacknie.sample.chat.model.ChatRoom
import com.jacknie.sample.chat.model.ChatRoomFilter
import com.jacknie.sample.chat.repository.ChatRoomCustomRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate
import org.springframework.data.r2dbc.core.select
import org.springframework.data.relational.core.query.Criteria
import org.springframework.data.relational.core.query.Criteria.where
import org.springframework.data.relational.core.query.Query.empty
import org.springframework.data.relational.core.query.Query.query
import reactor.core.publisher.Mono

class ChatRoomCustomRepositoryImpl(private val template: R2dbcEntityTemplate) : ChatRoomCustomRepository {

    override fun findAll(filter: ChatRoomFilter, pageable: Pageable): Mono<Page<ChatRoom>> {
        val select = template.select<ChatRoom>().from("chat_room");
        val queryMono = filter.keyword?.let { containsKeyword(it) }?.map { query(it) }?: Mono.just(empty())
        return queryMono
            .flatMap { select.matching(it).count() }
            .filter { it > 0 }
            .zipWith(queryMono
                .flatMapMany { select.matching(it.with(pageable)).all() }
                .collectList())
            .map { PageImpl(it.t2, pageable, it.t1) }
    }

    private fun containsKeyword(keyword: String): Mono<Criteria> {
        return template.select<ChatCategory>()
            .from("chat_category")
            .matching(query(where("name").like("%${keyword}%")))
            .all()
            .collectList()
            .map { it.map { category -> category.id }.toSet() }
            .map { where("subject").like("%${keyword}%").or(where("category_id").`in`(it)) }
    }

}
