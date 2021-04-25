import {MovieDetails} from "pages/home/pages/star-wars-feed/model/types";
import {ArticleMeta} from './ArticleMeta';

type Props = {
    data: MovieDetails
};

export const DetailPreview: React.FC<Props> = ({
    data: {
        title,
        opening_crawl,
        director,
        release_date,
    }
}) => (
    <article className="article-preview">
        <ArticleMeta date={release_date} name={director}/>
        <span className="preview-link">
            <h1>{title}</h1>
            <p>{opening_crawl}</p>
        </span>
    </article>
);
