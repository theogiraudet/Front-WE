import {Route, Router, Switch} from 'react-router-dom';
import {useGate} from 'effector-react';
import {history, Urls} from 'router';
import {Gate} from './model';

import 'ui/main.css';
import {MainSite} from "../main_website";
import {StarWarsCrawl} from "pages/star_wars_crawl";

export const App: React.FC = () => {
  useGate(Gate);

  return (
    <Router history={history}>
      <Switch>
        <Route path={Urls.STAR_WARS_CRAWL} component={StarWarsCrawl} />
        <Route path="/" component={MainSite} />
      </Switch>
    </Router>
  );
};
