import { useGate, useList, useStore } from 'effector-react';
import {DetailPreview} from "pages/home/pages/star-wars-feed/DetailPreview";
import { ArticlesWrapper } from 'shared/feed';
import { Spinner } from 'ui';
import * as model from './model';

const StarWarsFeedPage: React.FC = () => {
  useGate(model.Gate);
  const loading = useStore(model.fetchMoviesFx.pending);

  return (
    <>
      <ArticlesWrapper>
        {useList(model.$movies, {
          getKey: (item) => item.episodeID,
          fn: (item) => (
            <li>
              <DetailPreview
                data={item}
              />
            </li>
          ),
        })}
      </ArticlesWrapper>
      <Spinner loading={loading} />
    </>
  );
};

export default StarWarsFeedPage;
