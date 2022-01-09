package com.jacknie.sample.chat.model

import javax.validation.constraints.NotNull
import javax.validation.constraints.Positive

data class ChatCategoryFilter(

    /**
     * 카테고리 아이디 목록
     */
    val ids: Set<@NotNull @Positive Long>

)
