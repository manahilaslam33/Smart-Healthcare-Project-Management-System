import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api'
});

export const getMasterReport = () => API.get('/reports/master-report');
export const addRequirement = (data) => API.post('/requirements/add-requirement', data);
export const getRequirements = () => API.get('/requirements/get-requirements');
export const addChangeRequest = (data) => API.post('/changes/add-change', data);
export const getChangeRequests = () => API.get('/changes/get-changes');
export const addActivity = (data) => API.post('/activities/add-activity', data);
export const getActivities = () => API.get('/activities/get-activities');
export const calculateEVM = (data) => API.post('/cost/calculate-evm', data);
export const addQualityRisk = (data) => API.post('/quality/add-item', data);
export const getQualityRisks = () => API.get('/quality/get-items');
export const getCharter = () => API.get('/project/get-charter');
export const saveCharter = (data) => API.post('/project/save-charter', data);