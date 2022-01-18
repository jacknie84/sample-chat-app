package com.jacknie.sample.chat.repository.impl

import com.jacknie.sample.chat.model.ChatCategory
import com.jacknie.sample.chat.model.ChatCategoryFilter
import com.jacknie.sample.chat.repository.ChatCategoryCustomRepository
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate
import org.springframework.data.r2dbc.core.select
import org.springframework.data.relational.core.query.Criteria.where
import org.springframework.data.relational.core.query.Query.query
import reactor.core.publisher.Flux

class ChatCategoryCustomRepositoryImpl(private val template: R2dbcEntityTemplate) : ChatCategoryCustomRepository {

    override fun findAll(filter: ChatCategoryFilter): Flux<ChatCategory> {
        val ids = filter.ids
            ?.takeIf { it.isNotEmpty() }
            ?.let { where("id").`in`(it) }
        val keyword = filter.keyword
            ?.takeIf { it.isNotBlank() }
            ?.let { where("name").like("%$it%") }
        val criteriaList = listOfNotNull(ids, keyword)
        return if (criteriaList.isEmpty()) {
            template.select<ChatCategory>().all()
        } else {
            val criteria = listOfNotNull(ids, keyword).reduce { c1, c2 -> c1.and(c2) }
            template.select<ChatCategory>().matching(query(criteria)).all()
        }
    }

}
