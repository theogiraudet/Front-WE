import {Store} from "effector-root";
import {Event} from "effector";
import { Gate } from 'effector-react';
import {ReadonlyDeep} from "type-fest";

//Représentation des informations d'un film
export type MovieEnglishDetails = ReadonlyDeep<{
  title:           string
  "episode_id":    number
  "opening_crawl": string
  director:        string
  producer:        string
  "release_date":  string
  characters:      string[]
  planets:         string[]
  starships:       string[]
  vehicles:        string[]
  species:         string[]
  created:         string
  edited:          string
  url:             string
}>

export type MovieDetailsWookie = ReadonlyDeep<{
  aoahaoanwo:                  string
  "woakahcoowawo_ahwa":        number
  "ooakwowhahwhrr_oarcraohan": string
  waahrcwooaaooorc:            string
  akrcoowahuoaworc:            string
  "rcwoanworacwo_waraaowo":    string
  oaacrarcraoaaoworcc:         string[]
  akanrawhwoaoc:               string[]
  caorarccacahakc:             string[]
  howoacahoaanwoc:             string[]
  cakwooaahwoc:                string[]
  oarcworaaowowa:              string
  wowaahaowowa:                string
  hurcan:                      string
}>

//Représentation des informations retournées par la requête à l'API
export type ReqMoviesResultEnglish = ReadonlyDeep<{
  count:    number
  next:     any
  previous: any
  results:  readonly MovieEnglishDetails[]
}>

export type ReqMoviesResultWookiee = ReadonlyDeep<{
  oaoohuwhao:      number
  whwokao:         any
  akrcwohoahoohuc: any
  rcwochuanaoc:    readonly MovieDetailsWookie[]
}>

// Représentation des états retournés par creator.ts
export type CreateMovieModel = {
  Gate:            Gate<unknown>
  $reqResult:      Store<ReqMoviesResultEnglish>
  $movies:         Store<ReqMoviesResultEnglish['results']>
  $languageInfos:  Store<LanguageInformations>
  $updateLanguage: Event<LanguageInformations>
}

export type LanguageInformations = {
  name: string
  queryValue: string
  imgUrl: string
  episodeTranslation: string
  introTranslation: string
}

function wookieToEnglishDetailObj(wookie: MovieDetailsWookie): MovieEnglishDetails {
  return {
    title:           wookie.aoahaoanwo,
    "episode_id":    wookie.woakahcoowawo_ahwa,
    "opening_crawl": wookie.ooakwowhahwhrr_oarcraohan,
    director:        wookie.waahrcwooaaooorc,
    producer:        wookie.akrcoowahuoaworc,
    "release_date":  wookie.rcwoanworacwo_waraaowo,
    characters:      wookie.oaacrarcraoaaoworcc,
    planets:         wookie.akanrawhwoaoc,
    starships:       wookie.caorarccacahakc,
    vehicles:        wookie.howoacahoaanwoc,
    species:         wookie.cakwooaahwoc,
    created:         wookie.oarcworaaowowa,
    edited:          wookie.wowaahaowowa,
    url:             wookie.hurcan
  }
}

function wookieToEnglishObj(wookie: ReqMoviesResultWookiee): ReqMoviesResultEnglish {
  return {
    count: wookie.oaoohuwhao,
    next: wookie.whwokao,
    previous: wookie.akrcwohoahoohuc,
    results: wookie.rcwochuanaoc.map(x => wookieToEnglishDetailObj(x))
  }
}

export type ReqMoviesResult = ReqMoviesResultEnglish | ReqMoviesResultWookiee

export function convertToEnglish(movie: string | ReqMoviesResult): ReqMoviesResultEnglish | undefined {
  if((movie as ReqMoviesResultEnglish).count)
    return movie as ReqMoviesResultEnglish

  if(typeof movie === "string" && movie.includes("oaoohuwhao"))
      return wookieToEnglishObj(JSON.parse(movie.replaceAll("whhuanan", "null").replaceAll("\\rc\\wh", "\\r\\n")))
  if((movie as ReqMoviesResultWookiee).whwokao)
    return wookieToEnglishObj(movie as ReqMoviesResultWookiee)

  return undefined
}

export const languageMap = new Map<string | undefined, LanguageInformations>([
  ["wookiee", {
    name: "Wookiee",
    queryValue: "wookiee",
    imgUrl: "https://avatarfiles.alphacoders.com/131/thumb-1920-131312.jpg",
    episodeTranslation: "woakahcoowawo",
    introTranslation: "Ra anoowhrr aoahscwo rarroo, ahwh ra rrraanrakro wwrarc,\n wwrarc raohraro...."
  }],
  [undefined, {
    name: "English",
    queryValue: "",
    imgUrl: "https://avatarfiles.alphacoders.com/184/thumb-1920-184808.jpg",
    episodeTranslation: "Episode",
    introTranslation: "A long time ago, in a galaxy far,\nfar away...."
  }]
])

