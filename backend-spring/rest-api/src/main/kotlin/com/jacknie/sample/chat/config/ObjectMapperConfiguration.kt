package com.jacknie.sample.chat.config

import com.fasterxml.jackson.datatype.jdk8.Jdk8Module
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.KotlinModule
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class ObjectMapperConfiguration {

    @Bean
    fun javaTimeModule() = JavaTimeModule()

    @Bean
    fun kotlinModule() = KotlinModule.Builder().build()

    @Bean
    fun jdk8Module() = Jdk8Module()

}
