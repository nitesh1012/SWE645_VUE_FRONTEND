import { createRouter, createWebHistory } from 'vue-router';
import SurveyForm from './components/SurveyForm.vue';
import SurveyList from './components/SurveyList.vue';

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: () => import('./components/HomePage.vue') },
    { path: '/survey-form', component: SurveyForm },
    { path: '/survey-list', component: SurveyList },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
