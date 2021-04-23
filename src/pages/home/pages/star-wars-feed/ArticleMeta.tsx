import { Link } from 'react-router-dom';

type Props = {
    name: String,
    date: Date
};

export const ArticleMeta: React.FC<Props> = ({
    name,
    date
}) => (
    <div className="article-meta">
        <img alt="Chewbacca" src="https://static.wikia.nocookie.net/frstarwars/images/4/48/Chewbacca_TLJ.png/revision/latest?cb=20190831143844" />
        <div className="info">
            <span className="author">
                {name}
            </span>
            <span className="date">{date.toDateString()}</span>
        </div>
    </div>
);
