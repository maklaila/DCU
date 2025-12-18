import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { ForumListPage } from './forum/forum-list.page';
import { ForumDetailPage } from './forum/forum-detail.page';
import { BookingPage } from './booking/booking.page';
import { GradesPage } from './organization/grades.page';
import { CalendarPage } from './organization/calendar.page';
import { ChatPage } from './study/chat.page';

export const routes: Routes = [
    {
        path: 'home',
        component: HomePage,
    },
    {
        path: 'booking',
        component: BookingPage,
    },
    {
        path: 'grades',
        component: GradesPage,
    },
    {
        path: 'calendar',
        component: CalendarPage,
    },
    {
        path: 'chat',
        component: ChatPage,
    },
    {
        path: 'forum',
        component: ForumListPage,
    },
    {
        path: 'forum/:id',
        component: ForumDetailPage,
    },
    {
        path: 'shop',
        loadComponent: () => import('./shop/shop.page').then(m => m.ShopPage)
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
    },
    {
        path: 'profile',
        loadComponent: () => import('./profile/profile.page').then(m => m.ProfilePage)
    },
    {
        path: 'subject/math',
        loadComponent: () => import('./subject-detail/subject-detail.page').then(m => m.SubjectDetailPage)
    },
    {
        path: '',
        redirectTo: 'login', // Default to login
        pathMatch: 'full',
    },
];
