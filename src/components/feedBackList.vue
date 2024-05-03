<template>
    <div class="p-6">
        <h2 class="font-medium mb-4">User Feedback</h2>
        <ul class="divide-y divide-gray-200" v-if="feedBackList">
            <li class="py-3 cursor-pointer hover:bg-slate-100 px-3" v-for="item in feedBackList.feedBackList"
                :key="item.id">
                <div class="flex items-center space-x-3">
                    <img class="w-10 h-10 rounded-full" src="https://via.placeholder.com/150" alt="User Avatar">
                    <div>
                        <p class="text-md font-semibold">Title</p>
                        <p class="text-gray-500 text-sm">{{ item.title }}</p>
                    </div>
                </div>
            </li>
        </ul>
        <div v-else>No data found</div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useUserStore, useFeedbackList } from '@/stores/counter';


export default {
    setup() {
        const feedbackList = ref([]);
        const userStore = useUserStore();
        const userFeedBackList = useFeedbackList();
        const userStoreVal = computed(() => {
            return userStore
        })
        const feedBackList = computed(() => {
            return userFeedBackList
        })

        return { feedbackList, userStoreVal, feedBackList };
    }
};
</script>