import {Store} from "effector-root";
import { Gate } from 'effector-react';

export type MovieDetails = {
  title:        string;
  episodeID:    number;
  openingCrawl: string;
  director:     string;
  producer:     string;
  releaseDate:  Date;
  characters:   string[];
  planets:      string[];
  starships:    string[];
  vehicles:     string[];
  species:      string[];
  created:      Date;
  edited:       Date;
  url:          string;
}

export type Movies = {
  movies: readonly MovieDetails[]
}

export type CreateMovieModel = {
  Gate: Gate<unknown>;
  $feed: Store<Movies>;
  $movies: Store<Movies["movies"]>;
}
