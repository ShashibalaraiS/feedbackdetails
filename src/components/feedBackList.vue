<template>
    <div class="p-6">
        <h2 class="font-medium mb-4 text-gray-500">Product List</h2>
        <table class="min-w-full border-collapse border border-gray-200">
            <thead>
                <tr class="bg-gray-200">
                    <th class="border border-gray-300 px-4 py-2 text-left text-xs font-medium">Product </th>
                    <th class="border border-gray-300 px-4 py-2 text-left text-xs font-medium">Date</th>

                </tr>
            </thead>
            <tbody 
             v-if="feedBackList.feedBackList != ''">
                <tr v-for="(row, index) in feedBackList.feedBackList" :key="index" class="odd:bg-white even:bg-gray-50">
                    <td class="border border-gray-300 px-4 py-2 text-xs font-medium text-gray-500">{{ row.title }}</td>
                    <td class="border border-gray-300 px-4 py-2 text-xs font-medium text-gray-500">{{ row.dates  ?
                        getCurrentFormattedDate(row.dates) : '-' }}</td>

                </tr>
            </tbody>
            <p class="p-3 text-gray-500" v-else>No records found</p>
        </table>
      
    </div>
</template>

<script>
import { ref,  computed } from 'vue';
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

        function getCurrentFormattedDate(dates1) {
            let date = new Date(dates1);           
            // Define the month names
            const monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            // Get the day of the month
            const day = date.getDate();

            // Get the month name
            const month = monthNames[date.getMonth()];

            // Get the year
            const year = date.getFullYear();
            return `${day} ${month} ${year}`;
        }

        return { feedbackList, userStoreVal, feedBackList, getCurrentFormattedDate };
    }
};
</script>