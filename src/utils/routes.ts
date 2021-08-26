import CallbackPage from '../pages/Callback';
import DashboardPage from '../pages/Dashboard';
import IndexPage from '../pages/Index';
import { Route, RouteResult } from './interfaces';

const routes: Route[] = [
    { component: IndexPage, path: '/' },
    { component: DashboardPage, path: '/dashboard' },
    { component: CallbackPage, path: '/callback' }
];

export function initializeRouteProps(route: Route): JSX.Element {
    const prop = route.props ? { ...route.props } : {};
    return (route.component as (props: any) => JSX.Element)(prop);
}

export function getRouteResults(): RouteResult[] {
    const results: RouteResult[] = [];
    routes.forEach(route => getRouteResult(route).forEach(result => results.push(result)));
    return results;
}

function getRouteResult(route: Route): RouteResult[] {
    const results: RouteResult[] = [];
    results.push({ path: route.path, route: route });
    if (Array.isArray(route.children) && route.children.length)
        route.children.forEach(child => {
            const resultFromChild = getRouteResult(child);
            resultFromChild.forEach(result => results.push({ path: route.path + result.path, route: result.route }));
        });
    return results;
}
