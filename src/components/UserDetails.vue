<!-- AddFeedback.vue -->
<template>
  <div class="flex bg-slate-300 p-5 min-h-screen">
    <div class="w-1/4 bg-white rounded-xl overflow-hidden">
      <div class="p-6">
        <h2 class="text-gray-500 font-semibold mb-4">User Name</h2>
        <!-- User List -->
        <ul class="divide-y divide-gray-200">
          <li @click="storeUserDetail(item)" class="py-3 cursor-pointer hover:bg-slate-100 px-3" v-for="item in items"
            :key="item.userId" :class="selectedId == item.userId ? 'bg-slate-100' : ''">
            <div class="flex items-center space-x-3">
              <img class="w-10 h-10 rounded-full" src="https://via.placeholder.com/150" alt="User Avatar">
              <div>
                <p class="text-sm font-semibold">{{ item.fullName }}</p>
                <p class="text-gray-500 text-xs">{{ item.userName }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <AddFeedback v-if="userStoreFlag.userflagShow" />
  </div>
</template>
  
<script>
import { useUserStore, useUserFlagStore, useFeedbackList } from '@/stores/counter';
import { ref, computed, onMounted } from 'vue';
import AddFeedback from './AddFeedback.vue';
import useApi from '../useApi';
export default {
  components: {
    AddFeedback
  },
  setup() {
    const items = ref([
      { userId: 1, fullName: "Shashibala", userName: '@shashi' },
      { userId: 2, fullName: "Vivek", userName: '@vivek' },
      { userId: 3, fullName: "Raman", userName: '@raman' }
    ]);
    let selectedId = ref("")
    const showData = ref(false)
    const userStore = useUserStore();
    const userStoreFlag = useUserFlagStore();
    const userFeedbackList = useFeedbackList();
    function storeUserDetail(data) {
      showData.value = true
      userStoreFlag.storeUserData1(showData.value);
      const userData = data
      userStore.storeUserData(userData)
      selectedId.value = data.userId
      const { fetchFeedback, result } = useApi();
      fetchFeedback(data.userId)
      userFeedbackList.storeUserFeedback(result)
    }
    const userStoreVal = computed(() => {
      return userStore
    })
    onMounted(() => {
      storeUserDetail(items.value[0])
      selectedId.value = items.value[0].userId
    })
    return { items, storeUserDetail, AddFeedback, showData, userStoreFlag, userStore, userFeedbackList, userStoreVal, selectedId };
  }
};
</script>
  