import {useLocation} from "react-router";
import {useGate, useList, useStore} from 'effector-react';
import {DetailPreview} from "pages/home/pages/star-wars-feed/DetailPreview";
import {ArticlesWrapper} from 'shared/feed';
import {Spinner} from 'ui';
import * as model from './model';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const StarWarsFeedPage: React.FC = () => {

    useGate(model.Gate);
    const loading = useStore(model.fetchMoviesFx.pending);
    let query = useQuery()
    console.log(query.has("wookie"))
    return (
        <>
            <ArticlesWrapper>
                {useList(model.$movies, {
                    getKey: (item) => item.episode_id,
                    fn: (item) => (
                        <li>
                            <DetailPreview
                                data={item}
                            />
                        </li>
                    ),
                })}
            </ArticlesWrapper>
            <Spinner loading={loading}/>
        </>
    );
};

export default StarWarsFeedPage;
