package com.jacknie.sample.chat.handler

import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull
import javax.validation.constraints.Positive

data class CreateChatRoom(

    /**
     * 채팅방 카테고리 아이디
     */
    @field:NotNull
    @field:Positive
    var categoryId: Long,

    /**
     * 채팅방 주제
     */
    @field:NotBlank
    var subject: String,

    /**
     * 채팅방 참여 총 인원 수
     */
    @field:NotNull
    @field:Positive
    var capacity: Int,

)
