import axios from "axios";
const API = "https://lead-management-system-b6q6.onrender.com/api/leads";




export const getLeads = () => axios.get(API);
export const addLead = (data) => axios.post(API, data);
export const updateLead = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteLead = (id) => axios.delete(`${API}/${id}`);