import {Suspense} from 'react';
import {Router} from 'react-router-dom';
import {useGate} from 'effector-react';
import {AuthCosumer, AuthProvider, history} from 'router';
import {Header, Spinner} from 'ui';
import {APP_NAME} from 'config';

import 'ui/main.css';
import {Gate} from "./app/model";
import {Logo} from "./app/ui/logo";
import {LoginLinks} from "./app/ui/login-links";
import {LogoutLinks} from "./app/ui/logout-links";
import {Routes} from "./app/routes";

export const MainSite: React.FC = () => {
    useGate(Gate);

    return (
        <AuthProvider>
            <Header>
                <Logo title={APP_NAME}/>
                <ul className="nav navbar-nav pull-xs-right">
                    <AuthCosumer>
                        {({isAuth}) => (isAuth ? <LoginLinks/> : <LogoutLinks/>)}
                    </AuthCosumer>
                </ul>
            </Header>
            <Suspense fallback={<Spinner loading/>}>
                <Routes/>
            </Suspense>
        </AuthProvider>
    );
};
