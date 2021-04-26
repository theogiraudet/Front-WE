import {createEvent, createStore} from 'effector-root';
import {createGate} from 'effector-react';
import {LanguageInformations, languageMap, ReqMoviesResultEnglish} from "pages/home/pages/star-wars-feed/model/types";
import * as types from "./types";

/**
 * Classe initialisant les états de la partie Star Wars Feed
 */
export const CreateMovieModel = (): types.CreateMovieModel => {

    // Stocke le de résultat de la requête
    const $reqResult = createStore<ReqMoviesResultEnglish>({
        count: 0,
        next: undefined,
        previous: undefined,
        results: []
    })

    // Stocke la liste des films que la requête à retourner. Le .map permet d'actualiser $movies dès que $reqResult change
    const $movies = $reqResult.map(x => x.results);

    // Événement pour changer la langue
    const $updateLanguage = createEvent<LanguageInformations>()

    // Stocke les informations de la langue à afficher. Est actualisé à chaque fois que $updateLanguage est déclenché
    const $languageInfos = createStore<LanguageInformations>(languageMap.get(undefined)!)
        .on($updateLanguage, (_, infos) => infos)

    return {
        Gate: createGate(),
        $reqResult,
        $movies,
        $languageInfos,
        $updateLanguage
    };
};
