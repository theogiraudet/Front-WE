type Props = {
    name: string,
    date: string
};

export const ArticleMeta: React.FC<Props> = ({
    name,
    date
}) => (
    <div className="article-meta">
        <img alt="Chewbacca" src="https://static.wikia.nocookie.net/frstarwars/images/4/48/Chewbacca_TLJ.png" />
        <div className="info">
            <span className="author">
                {name}
            </span>
            <span className="date">{date}</span>
        </div>
    </div>
);
