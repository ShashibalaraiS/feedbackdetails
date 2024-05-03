import { ref } from 'vue';
import axios from 'axios';
export default function useApi(id) {
    const err = ref(null);
    const result = ref(null);
    const fetchFeedback = async (id) => {
        try {
            const response = await axios.get('http://localhost:3000/posts?userId=' + id);
            result.value = response.data
        } catch (error) {
            err.value = error
            console.error('Error fetching feedback:', error);
        }
    }
    return { fetchFeedback, result, err }
}