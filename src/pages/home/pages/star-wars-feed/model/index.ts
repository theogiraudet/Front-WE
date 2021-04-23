import { createEffect, forward, attach } from 'effector-root';
import { api } from '../others/api';
import * as feed from './creator';
import {Movies} from "./types";

export const {
  Gate,
  $movies,
  $feed,
} = feed.CreateMovieModel();

export const fetchMoviesFx = createEffect<void, Movies>(
  () => {
    return api
      .get(`films`)
      .then(({ data }) => data);
  }
);

$feed.on(fetchMoviesFx.doneData, (_, payload) => payload);

forward({
  from: [Gate.open],
  to: attach({
    effect: fetchMoviesFx,
  }),
});
