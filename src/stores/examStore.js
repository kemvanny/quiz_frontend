import { defineStore } from 'pinia';

export const useExamStore = defineStore('exam', {
  state: () => ({
    currentExamTitle: '',
    currentRoomName: '',
    currentQuestionCount: 0
  }),
  actions: {
    setExamTitle(title) { this.currentExamTitle = title; },
    setRoomName(name) { this.currentRoomName = name; },
    setQuestionCount(count) { this.currentQuestionCount = count; }
  }
});