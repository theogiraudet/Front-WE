type Props = {
    name: string,
    date: string,
    pictureUrl: string
};

export const ArticleMeta: React.FC<Props> = ({
    name,
    date,
    pictureUrl
}) => (
    <div className="article-meta">
        <img alt="Chewbacca" src={pictureUrl} />
        <div className="info">
            <span className="author">
                {name}
            </span>
            <span className="date">{date}</span>
        </div>
    </div>
);
