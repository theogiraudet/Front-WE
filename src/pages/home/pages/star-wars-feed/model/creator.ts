import {
    createStore
} from 'effector-root';
import { createGate} from 'effector-react';
import {Movies} from "pages/home/pages/star-wars-feed/model/types";
import * as types from "./types";

export const CreateMovieModel = (): types.CreateMovieModel => {

    const $feed = createStore<Movies>({
        movies: []
    })


    const $movies = $feed.map((x) => x.movies);

    return {
        Gate: createGate(),
        $feed,
        $movies
    };
};
