import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMyRooms } from '@/api/teacher.api'

export const useRoomStore = defineStore('room', () => {
  const rooms = ref([])
  const loading = ref(false)
  const fetchRooms = async () => {
    try {
      loading.value = true
      const response = await getMyRooms()
      rooms.value = response.data?.data || response.data || []
    } catch (error) {
      console.error("Error fetching rooms in store:", error)
    } finally {
      loading.value = false
    }
  }
  const addRoomToStore = (newRoom) => {
    if (newRoom) {
      rooms.value.unshift({
        id: newRoom.id,
        name: newRoom.name || newRoom.title || 'បន្ទប់គ្មានឈ្មោះ',
        student_count: 0
      })
    }
  }

  return {
    rooms,
    loading,
    fetchRooms,
    addRoomToStore
  }
})