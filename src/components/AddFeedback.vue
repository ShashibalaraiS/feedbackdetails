<template>
    <div class="w-3/4 pl-5">
        <div class="bg-white rounded-xl w-full h-full">
            <div class="p-6">
                <div class="flex items-center space-x-3">
                    <img class="w-10 h-10 rounded-full" src="https://via.placeholder.com/150" alt="User Avatar">
                    <div>
                        <h3 class="font-medium text-sm">{{ userStoreVal.userData.fullName }}</h3>
                        <p class="text-gray-500 text-xs">{{ userStoreVal.userData.userName }}</p>
                    </div>
                </div>
                <!-- Feedback Form -->
                <form @submit.prevent="submitFeedback">
                    <div class="mb-4">
                        <label for="message" class="text-xs font-medium ">Private note </label>
                        <textarea v-model="feedback" id="message" name="message" rows="4"
                            class="mt-1 p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border"
                            @blur="validateMsg"></textarea>
                        <span v-if="errors" class="text-red-400 text-sm">{{ errors }}</span>
                    </div>

                    <button type="submit"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit
                    </button>
                </form>
            </div>

            <div v-if="userFlagStore.userflagShow">
                <feedbackList></feedbackList>
            </div>
        </div>
    </div>
</template>  
<script>
import { ref, computed } from 'vue';
import axios from 'axios';
import { useUserStore, useUserFlagStore, useFeedbackList } from '@/stores/counter';
import feedbackList from './feedBackList.vue'
import useApi from '../useApi';

export default {
    components: {
        feedbackList
    },
    setup() {
        const userStore = useUserStore()
        const userFlagStore = useUserFlagStore()
        const userFeedbackList = useFeedbackList();
        const feedback = ref('');
        const errors = ref('');
        const submitFeedback = async () => {
            validateMsg();
            if (feedback.value == '') {
                return;
            }

            try {
                await axios.post('http://localhost:3000/posts', {
                    title: feedback.value,
                    userId: userStore.userData.userId,
                    dates: new Date()
                });
                feedback.value = '';
                const { fetchFeedback, result } = useApi();
                fetchFeedback(userStore.userData.userId)
                userFeedbackList.storeUserFeedback(result)
            } catch (error) {
                console.error('Error submitting feedback:', error);
            }
        };
        function validateMsg() {
            if (feedback.value == '') {
                errors.value = 'Message is required.';
            } else {
                errors.value = null;
            }
        };

        const userStoreVal = computed(() => {
            return userStore
        })
        return { feedback, submitFeedback, userData: userStore.userData, userFlagStore, userStoreVal, userFeedbackList, validateMsg, errors };
    }
};
</script>
  