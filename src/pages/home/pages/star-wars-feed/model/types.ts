import {Store} from "effector-root";
import { Gate } from 'effector-react';
import {ReadonlyDeep} from "type-fest";

export type MovieDetails = ReadonlyDeep<{
  title:         string;
  "episode_id":    number;
  "opening_crawl": string;
  director:      string;
  producer:      string;
  "release_date":  string;
  characters:    string[];
  planets:       string[];
  starships:     string[];
  vehicles:      string[];
  species:       string[];
  created:       string;
  edited:        string;
  url:           string;
}>

export type Movies = ReadonlyDeep<{
  count: number;
  next: any;
  previous: any;
  results: readonly MovieDetails[]
}>

export type CreateMovieModel = {
  Gate: Gate<unknown>;
  $feed: Store<Movies>;
  $movies: Store<Movies['results']>;
}
