import {createEvent, createStore} from 'effector-root';
import {createGate} from 'effector-react';
import {LanguageInformations, languageMap, ReqMoviesResultEnglish} from "pages/home/pages/star-wars-feed/model/types";
import * as types from "./types";

export const CreateMovieModel = (): types.CreateMovieModel => {

    const $reqResult = createStore<ReqMoviesResultEnglish>({
        count: 0,
        next: undefined,
        previous: undefined,
        results: []
    })

    const $movies = $reqResult.map(x => x.results);

    const $updateLanguage = createEvent<LanguageInformations>()

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
