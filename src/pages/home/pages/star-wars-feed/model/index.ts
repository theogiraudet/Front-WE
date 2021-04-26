import { createEffect, forward, attach } from 'effector-root';
import { api } from '../others/api';
import * as creator from './creator';
import {convertToEnglish, LanguageInformations, ReqMoviesResultEnglish} from "./types";

/* Partie du programme qui gère les requêtes à l'API */

// Création des états
export const {
  Gate,
  $movies,
  $reqResult,
  $languageInfos,
  $updateLanguage
} = creator.CreateMovieModel();

// Récupération des données de l'API
export const fetchMoviesFx = createEffect<LanguageInformations, ReqMoviesResultEnglish>(
    // Informations sur la langue choisie
  (infos ) => {
    return api
      .get(`films?format=${infos.queryValue}`)
      .then(({data}) => convertToEnglish(data)!);
  }
);

// Dès que le programme a fini de réceptionner les données de l'API, on met à jour $reqResult
$reqResult.on(fetchMoviesFx.doneData, (_, payload) => payload);

// Lorsque la Gate est montée, ou que $languageInfos est modifié, on appelle fetchMoviesFx en lui passant $languageInfos en paramètre
forward({
  from: [Gate.open, $languageInfos],
  to: attach({
    source: $languageInfos,
    effect: fetchMoviesFx,
  }),
});
