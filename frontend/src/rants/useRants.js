const BASE_URL = "http://localhost:3000";

import {create} from 'zustand';
import axios from 'axios';

export const useRants = create((set,get) => ({
    rants:[],
    loading: false,
    error: null,



    fetchRants: async () => {
        set({ loading: true});
        try {
            const response = await axios.get(`${BASE_URL}/api/rants`);
            set({rants: response.data.data, error: null});
        } catch (err) {
            if (err.status == 429) set({error: "Rate limit exceeded"})
                else set({error: "An error occurred while fetching rants"});
        } finally {
            set({ loading: false })
        }
    }
}))