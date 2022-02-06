import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import Notifications from 'notiwind';
import App from './App.vue';
import Navigation from './components/Navigation';
import Button from './components/Button';
import PageSpinner from './components/PageSpinner';
import ButtonSpinner from './components/ButtonSpinner';
import Home from './views/Home';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: Home },
        {
            path: '/add-product',
            name: 'AddProduct',
            component: () => import('./views/Product.vue'),
        },
        {
            path: '/cart',
            name: 'Cart',
            component: () => import('./views/Cart.vue'),
        },
        {
            path: '/listings',
            name: 'Listings',
            component: () => import('./views/Listings.vue'),
        },
        {
            path: '/products/:id',
            name: 'ProductDetails',
            component: () => import('./views/ProductDetails.vue'),
        },
    ],
});

const app = createApp(App);

app.use(router);
app.use(Notifications);

app.component('Navigation', Navigation);
app.component('Button', Button);
app.component('PageSpinner', PageSpinner);
app.component('ButtonSpinner', ButtonSpinner);

app.mount('#app');
