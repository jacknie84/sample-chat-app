package com.jacknie.sample.chat.repository.impl

import com.jacknie.sample.chat.model.ChatCategory
import com.jacknie.sample.chat.model.ChatCategoryFilter
import com.jacknie.sample.chat.repository.ChatCategoryCustomRepository
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate
import org.springframework.data.r2dbc.core.select
import org.springframework.data.relational.core.query.Criteria.where
import org.springframework.data.relational.core.query.Query.empty
import org.springframework.data.relational.core.query.Query.query
import reactor.core.publisher.Flux

class ChatCategoryCustomRepositoryImpl(private val template: R2dbcEntityTemplate) : ChatCategoryCustomRepository {

    override fun findAll(filter: ChatCategoryFilter): Flux<ChatCategory> {
        val query = filter.ids.takeIf { it.isNotEmpty() }
            ?.let { query(where("id").`in`(it)) }
            ?: empty()
        return template.select<ChatCategory>().matching(query).all()
    }

}
