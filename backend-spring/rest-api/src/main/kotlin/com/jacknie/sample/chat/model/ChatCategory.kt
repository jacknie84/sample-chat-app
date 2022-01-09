package com.jacknie.sample.chat.model

import org.springframework.data.annotation.Id

data class ChatCategory(

    /**
     * 아이디
     */
    @Id
    var id: Long? = null,

    /**
     * 카테고리 이름
     */
    var name: String,

    /**
     * 부모 카테고리 아이디
     */
    var parentId: Long? = null,

)
