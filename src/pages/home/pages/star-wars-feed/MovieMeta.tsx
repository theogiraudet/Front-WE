type Props = {
    name: string,
    date: string,
    pictureUrl: string
};

/**
 * Composant représentant les informations autour du film
 * @param name - le nom du réalisateur
 * @param date - la date de sortie du film
 * @param pictureUrl - l'image à afficher pour icône
 */
export const MovieMeta: React.FC<Props> = ({
    name,
    date,
    pictureUrl
}) => (
    <div className="article-meta">
        <img alt="picture" src={pictureUrl} />
        <div className="info">
            <span className="author">
                {name}
            </span>
            <span className="date">{date}</span>
        </div>
    </div>
);
