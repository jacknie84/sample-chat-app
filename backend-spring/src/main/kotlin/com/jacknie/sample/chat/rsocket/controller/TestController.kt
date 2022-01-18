package com.jacknie.sample.chat.rsocket.controller

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.stereotype.Controller

@Controller
class TestController {

    @MessageMapping("request-response")
    fun echo(request: String): String {
        return request
    }

}
