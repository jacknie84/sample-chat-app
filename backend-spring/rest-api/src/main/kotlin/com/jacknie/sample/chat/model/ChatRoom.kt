package com.jacknie.sample.chat.model

import org.springframework.data.annotation.Id
import java.time.LocalDateTime

data class ChatRoom(

    /**
     * 아이디
     */
    @Id
    var id: Long? = null,

    /**
     * 채팅방 카테고리 아이디
     */
    var categoryId: Long,

    /**
     * 채팅방 주제
     */
    var subject: String,

    /**
     * 채팅방 참여 총 인원 수
     */
    var capacity: Int,

    /**
     * 채팅방 생성 일시
     */
    var createdDate: LocalDateTime? = null,

    /**
     * 채팅방 소유자 정보
     */
    var createdBy: String = "system",

)
