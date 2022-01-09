package com.jacknie.sample.chat.repository

import com.jacknie.sample.chat.model.ChatCategory
import org.springframework.data.repository.reactive.ReactiveSortingRepository

interface ChatCategoryRepository : ReactiveSortingRepository<ChatCategory, Long>, ChatCategoryCustomRepository
