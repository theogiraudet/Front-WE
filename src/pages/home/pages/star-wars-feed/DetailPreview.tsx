import {MovieEnglishDetails} from "pages/home/pages/star-wars-feed/model/types";
import {MovieMeta} from './MovieMeta';
import {Link} from "react-router-dom";
import {Tag, TagList} from "ui";

type Props = {
    data: MovieEnglishDetails,
    pictureUrl: string,
    episodeTranslation: string,
    introTranslation: string
};

/**
 * @param number un nombre
 * @return ce nombre converti en chiffres romains
 */
function romanize(number: number) {
    if (isNaN(number))
        return NaN;
    var digits = String(+number).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
            "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
            "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop()! + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

/**
 * @param title - le titre du film
 * @param opening_crawl - le texte déroulant en intro du film
 * @param director - le directeur du film
 * @param release_date - la date de sortie du film
 * @param episode_id - le numéro du film
 * @param pictureUrl - le lien vers l'image de profil associé au Preview
 * @param episodeTranslation - le texte "Episode" traduit dans la langue sélectionnée
 * @param introTranslation - le texte "A long time ago[...]" traduit dans la langue sélectionnée
 */
export const DetailPreview: React.FC<Props> = ({
    data: {
        title,
        opening_crawl,
        director,
        release_date,
        episode_id
    },
    pictureUrl,
    episodeTranslation,
    introTranslation
}) => {
    // Préparation des textes pour être passé en paramètre de l'URL vers lequel pointe "Read more..."
    const text = opening_crawl.replaceAll(" ", "+").replaceAll("\r\n", "\\r\\n")
    const intro = introTranslation.replaceAll("\n", "\\n")

    // Le texte à afficher en preview, tronqué à 250 caractères
    const dispText = opening_crawl.substring(0, 250) + (opening_crawl.length > 250 ? "[...]" : "")

    return (
    <article className="article-preview">
        <MovieMeta pictureUrl={pictureUrl} date={release_date} name={director}/>
        <span className="preview-link">
            <h1>{title}</h1>
            <p>{dispText}</p>
            <Link className="preview-link" to={`/star-wars-crawl?title=${title}&text=${text}&episode=${episodeTranslation}+${romanize(episode_id)}&intro=${intro}`}>Read more...</Link>
        </span>
    </article>
)};
