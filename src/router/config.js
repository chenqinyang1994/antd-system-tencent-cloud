import React, { lazy, Suspense } from 'react';

function getLazyComponent(name) {
    return lazy(() => import(`@views/${name}`));
}

export default [
    {
        path: '/',
        name: 'home',
        component: getLazyComponent('app'),
    },
    {
        path: '/login',
        name: 'login',
        component: getLazyComponent('login'),
    },
];
