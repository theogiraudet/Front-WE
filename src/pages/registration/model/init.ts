import { forward } from 'effector';
import * as auth from 'features/auth';
import * as model from './model';

forward({
  from: model.formSubmitted,
  to: model.fxSignUp,
});

auth.model.$authorizedUser.on(model.fxSignUp.doneData, (_, payload) => payload);