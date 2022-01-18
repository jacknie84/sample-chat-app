package com.jacknie.sample.chat.webflux.handler

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import org.springframework.validation.BeanPropertyBindingResult
import org.springframework.validation.Validator
import org.springframework.web.reactive.function.server.ServerRequest
import org.springframework.web.reactive.function.server.bodyToMono
import org.springframework.web.server.ResponseStatusException
import reactor.core.publisher.Mono

@Component
class Validation(val validator: Validator) {

    fun <T> notEmpty(mono: Mono<T>, errorMessage: String): Mono<T> {
        val throwable = ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage)
        return mono.switchIfEmpty(Mono.error(throwable))
    }

    fun assertTrue(booleanMono: Mono<Boolean>, errorMessage: String): Mono<Void> {
        val throwable = ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage)
        return booleanMono.filter { it }.switchIfEmpty(Mono.error(throwable)).then()
    }

    fun toLong(value: String?, errorMessage: String): Mono<Long> {
        val throwable = ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage)
        return if (value.isNullOrBlank()) {
            Mono.error(throwable)
        } else {
            value.toLongOrNull()
                ?.let { Mono.just(it) }
                ?: return Mono.error(throwable)
        }
    }

}

inline fun <reified T : Any> Validation.bodyToMono(request: ServerRequest): Mono<T> {
    return request.bodyToMono<T>().map { validate(it, this.validator) }
}

inline fun <reified T : Any> Validation.validate(value: T): T {
    return validate(value, this.validator)
}

inline fun <reified T : Any> validate(value: T, validator: Validator): T {
    val errors = BeanPropertyBindingResult(value, T::class.java.simpleName)
    validator.validate(value, errors)
    if (errors.hasErrors()) {
        throw ResponseStatusException(HttpStatus.BAD_REQUEST, errors.allErrors.toString())
    } else {
        return value
    }
}
