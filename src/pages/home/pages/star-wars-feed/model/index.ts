import { createEffect, forward, attach } from 'effector-root';
import { api } from '../others/api';
import * as creator from './creator';
import {convertToEnglish, LanguageInformations, ReqMoviesResultEnglish} from "./types";

export const {
  Gate,
  $movies,
  $reqResult,
  $languageInfos,
  $updateLanguage
} = creator.CreateMovieModel();


export const fetchMoviesFx = createEffect<LanguageInformations, ReqMoviesResultEnglish>(
  (infos ) => {
    return api
      .get(`films?format=${infos.queryValue}`)
      .then(({data}) => convertToEnglish(data)!);
  }
);

$reqResult.on(fetchMoviesFx.doneData, (_, payload) => payload);

forward({
  from: [Gate.open, $languageInfos],
  to: attach({
    source: $languageInfos,
    effect: fetchMoviesFx,
  }),
});
