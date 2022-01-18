package com.jacknie.sample.chat.config

import com.jacknie.sample.chat.handler.ChatCategoryHandler
import com.jacknie.sample.chat.handler.ChatRoomHandler
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.boot.web.codec.CodecCustomizer
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.codec.ServerCodecConfigurer
import org.springframework.web.reactive.config.EnableWebFlux
import org.springframework.web.reactive.config.WebFluxConfigurer
import org.springframework.web.reactive.function.server.router

@Configuration
@EnableWebFlux
class WebFluxConfiguration(
    @Qualifier("jacksonCodecCustomizer")
    private val codecCustomizer: CodecCustomizer,
    private val chatCategoryHandler: ChatCategoryHandler,
    private val chatRoomHandler: ChatRoomHandler,
) : WebFluxConfigurer {

    @Bean
    fun routerFunction() = router {
        "/chat".nest {
            POST("/categories", chatCategoryHandler::postChatCategory)
            GET("/categories/{id}", chatCategoryHandler::getChatCategory)
            GET("/categories", chatCategoryHandler::getChatCategories)
            POST("/rooms", chatRoomHandler::postChatRoom)
            GET("/rooms/{id}", chatRoomHandler::getChatRoom)
            GET("/rooms", chatRoomHandler::getChatRooms)
        }
    }

    override fun configureHttpMessageCodecs(configurer: ServerCodecConfigurer) {
        codecCustomizer.customize(configurer)
    }
}
