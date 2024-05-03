
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: null,
  }),
  actions: {
    storeUserData(userData) {
      this.userData = userData
    },
  }, 
 
});



export const useUserFlagStore = defineStore('userFlag', {
  state: () => ({
    userflagShow: false,
  }),
  actions: {
    storeUserData1(userflagShow) {
      this.userflagShow = userflagShow
    },
  },  
});


export const useFeedbackList = defineStore('feedbackList', {
  state: () => ({
    feedBackList: null,
  }),
  actions: {
    storeUserFeedback(feedBackList) {
      this.feedBackList = feedBackList
    },
  },  
});


