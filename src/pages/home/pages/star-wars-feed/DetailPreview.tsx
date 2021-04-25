import {MovieEnglishDetails} from "pages/home/pages/star-wars-feed/model/types";
import {ArticleMeta} from './ArticleMeta';

type Props = {
    data: MovieEnglishDetails,
    pictureUrl: string
};

export const DetailPreview: React.FC<Props> = ({
    data: {
        title,
        opening_crawl,
        director,
        release_date,
    },
    pictureUrl
}) => (
    <article className="article-preview">
        <ArticleMeta pictureUrl={pictureUrl} date={release_date} name={director}/>
        <span className="preview-link">
            <h1>{title}</h1>
            <p>{opening_crawl}</p>
        </span>
    </article>
);
