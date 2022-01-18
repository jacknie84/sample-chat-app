package com.jacknie.sample.chat.handler

import javax.validation.constraints.NotBlank
import javax.validation.constraints.Positive

data class CreateChatCategory(

    /**
     * 카테고리 이름
     */
    @field:NotBlank
    var name: String,

    /**
     * 부모 카테고리 아이디
     */
    @field:Positive
    var parentId: Long? = null,

)
