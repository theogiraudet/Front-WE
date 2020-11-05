import { createEvent, createEffect, createStore, sample } from 'effector-root';
import { createForm } from 'effector-forms';
import { createGate } from 'effector-react';
import { AxiosResponse, AxiosError } from 'axios';
import { api } from 'api';
import * as router from 'library/router';
import * as user from 'shared-modules/user';
import { Errors, changeUserDataFxArgs } from './types';

export const formSubmitted = createEvent<React.FormEvent>();
formSubmitted.watch((e) => e.preventDefault());

export const changeUserDataFx = createEffect<
  changeUserDataFxArgs,
  AxiosResponse<void>,
  AxiosError
>((payload) =>
  api.put('user', {
    user: payload,
  }),
);

export const FormGate = createGate();
export const $authUser = user.model.$user.map((x) => x);

export const form = createForm({
  fields: {
    image: {
      init: '' as user.types.User['image'],
    },
    username: {
      init: '' as user.types.User['username'],
    },
    bio: {
      init: '' as user.types.User['bio'],
    },
    email: {
      init: '' as user.types.User['email'],
    },
    password: {
      init: '' as string,
    },
  },
});

// set data form user store
sample({
  source: $authUser,
  clock: FormGate.open,
  target: form.set,
});

// submit form
sample({
  source: form.$values,
  clock: formSubmitted,
  target: changeUserDataFx,
});

changeUserDataFx.done.watch(() => {
  window.location.reload();
});

user.model.loggedOutClicked.watch(() => {
  router.model.history.push('/');
});

export const $error = createStore<Errors>({
  errors: {},
})
  .on(changeUserDataFx.failData, (_, error) => error.response?.data)
  .reset(form.$values, FormGate.close);
