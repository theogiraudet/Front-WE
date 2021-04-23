import {MovieDetails} from "pages/home/pages/star-wars-feed/model/types";
import {ArticleMeta} from './ArticleMeta';

type Props = {
    data: MovieDetails
};

export const DetailPreview: React.FC<Props> = ({
    data: {
        title,
        openingCrawl,
        director,
        releaseDate,
    }
}) => (
    <article className="article-preview">
        <ArticleMeta date={releaseDate} name={director}/>
        <span className="preview-link">
            <h1>{title}</h1>
            <p>{openingCrawl}</p>
        </span>
    </article>
);
