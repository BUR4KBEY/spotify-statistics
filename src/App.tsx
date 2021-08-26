import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PageNotFoundPage from './pages/PageNotFound';
import { getRouteResults, initializeRouteProps } from './utils/routes';

export default function App() {
    return (
        <Router>
            <Switch>
                {getRouteResults()
                    .filter(result => result.route.component !== null)
                    .map((result, id) => (
                        <Route key={id} exact path={result.path} component={() => initializeRouteProps(result.route)} />
                    ))}
                <PageNotFoundPage />
            </Switch>
        </Router>
    );
}
