import { lazy } from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import { Paths, AuthBranch, PrivateRoute } from 'router';

const YourFeed = lazy(() => import('./pages/your-feed'));
const GlobalFeed = lazy(() => import('./pages/global-feed'));
const FeedByTab = lazy(() => import('./pages/feed-by-tag'));
const NoMatch = lazy(() => import('pages/not-match'));

export const Routes: React.FC = () => {
  const { path } = useRouteMatch<{ path: string }>();

  return (
    <Switch>
      <Route exact path="/home">
        <AuthBranch check="auth">
          <Redirect to={`${path}${Paths.YOUR_FEED}`} />
        </AuthBranch>
        <AuthBranch check="anon">
          <Redirect to={`${path}${Paths.GLOBAL_FEED}`} />
        </AuthBranch>
      </Route>
      <Route component={GlobalFeed} path={`${path}${Paths.GLOBAL_FEED}`} />
      <PrivateRoute component={YourFeed} path={`${path}${Paths.YOUR_FEED}`} />
      <Route component={FeedByTab} path={`${path}${Paths.FEED_BY_TAG}`} />
      <Route component={NoMatch} path="*" />
    </Switch>
  );
};