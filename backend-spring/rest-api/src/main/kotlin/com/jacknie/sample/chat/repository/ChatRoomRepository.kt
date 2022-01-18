package com.jacknie.sample.chat.repository

import com.jacknie.sample.chat.model.ChatRoom
import org.springframework.data.repository.reactive.ReactiveSortingRepository

interface ChatRoomRepository : ReactiveSortingRepository<ChatRoom, Long>, ChatRoomCustomRepository
