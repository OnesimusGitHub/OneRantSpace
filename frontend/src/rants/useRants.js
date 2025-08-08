const BASE_URL = "http://localhost:3000";

import {create} from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify'; // Add this import

export const useRants = create((set,get) => ({
    rants:[],
    loading: false,
    error: null,
    currentRant: null,

    formData: {
        header: '',
        content: '',
        youtube_url: '',
    },

    setFormData: (formData) => set({formData}),
    resetFormData: () => set({formData: {header: '', content: '', youtube_url: ''}}),

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
    },

    addRant: async (e) => {
        e.preventDefault();
        set({loading: true});

        try {
            const formData = get().formData;
            const token = localStorage.getItem('jwt_token');
            const response = await axios.post(`${BASE_URL}/api/rants`, formData, {
                headers: { 'jwt_token': token }
            });
            await get().fetchRants();
            get().resetFormData();
            toast.success("Rant added successfully");
            document.getElementById('add_rant_form').close();
        } catch (error) {
            toast.error('Failed to add rant')
        } finally {
            set({loading:false})
        }
    },

    deleteRant: async (rant_id) => {
        if (!rant_id || rant_id === 'undefined') {
            toast.error('Invalid rant ID');
            return;
        }
        
        set({loading: true});

        try {
            const token = localStorage.getItem('jwt_token');
            await axios.delete(`${BASE_URL}/api/rants/${rant_id}`, {
                headers: { 'jwt_token': token }
            });
            set(state => ({rants: state.rants.filter(rant => rant.rant_id !== rant_id)}))
            toast.success("Rant deleted successfully");
        } catch (error) {
            toast.error("Failed to delete rant");
        } finally {
            set({loading: false})
        }
    },

    editRant: async (rant_id) => {
        set({loading: true});

        try {
            const formData = get().formData;
            const token = localStorage.getItem('jwt_token');
            await axios.put(`${BASE_URL}/api/rants/${rant_id}`, formData, {
                headers: { 'jwt_token': token }
            });
            await get().fetchRants();
            get().resetFormData();
            toast.success("Rant updated successfully");
            document.getElementById('edit_rant_form').close();
        } catch (error) {
            toast.error("Failed to update rant");
        } finally {
            set({loading: false})
        }
    },
    
    fetchRant: async(rant_id) => {
        if (!rant_id || rant_id === 'undefined') {
            return;
        }
        
        set({loading: true});
        try {
            const token = localStorage.getItem('jwt_token');
            const response = await axios.get(`${BASE_URL}/api/rants/${rant_id}`, {
                headers: { 'jwt_token': token }
            });
            set({
                currentRant: response.data.data,
                formData: response.data.data,
                error: null
            })
        } catch (error) {
            set({error: "Failed to fetch rant.", currentRant: null});
        } finally {
            set({loading: false});
        }
    },
}))