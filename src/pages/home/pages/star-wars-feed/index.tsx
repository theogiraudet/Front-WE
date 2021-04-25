import {useLocation} from "react-router";
import {useGate, useList, useStore} from 'effector-react';
import {DetailPreview} from "pages/home/pages/star-wars-feed/DetailPreview";
import {ArticlesWrapper} from 'shared/feed';
import {Spinner} from 'ui';
import * as model from './model';
import {languageMap} from "pages/home/pages/star-wars-feed/model/types";
import {Dropdown, DropdownButton} from "react-bootstrap";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const StarWarsFeedPage: React.FC = () => {

    useGate(model.Gate);
    const loading = useStore(model.fetchMoviesFx.pending);
    const query = useQuery()
    const infos = Array.from(query.keys()).map(queryKey => languageMap.get(queryKey)).pop()
    model.$updateLanguage(infos || languageMap.get(undefined)!)

    // @ts-ignore
    return (
        <>
            <DropdownButton className="float-right" variant="success" id="dropdown-basic-button" title="Language">
                {Array.from(languageMap.entries()).sort().map(lang => (
                    <Dropdown.Item href={`star-wars-feed?${lang[0] || ""}`}>{lang[1].name}</Dropdown.Item>
                    ))}
            </DropdownButton>

            <ArticlesWrapper>
                {useList(model.$movies, {
                    getKey: (item) => item.episode_id,
                    fn: (item) => (
                        <li>
                            <DetailPreview
                                pictureUrl={model.$languageInfos.getState().imgUrl}
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
