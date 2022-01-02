package com.jacknie.sample.chat.stomp.controller

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller

@Controller
class ChatController {

    @MessageMapping("/echo")
    @SendTo("/topic/echo")
    fun echo(message: String): String {
        return message
    }

}
