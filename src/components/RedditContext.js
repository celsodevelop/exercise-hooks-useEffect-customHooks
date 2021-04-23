import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getPostsBySubreddit } from '../services/redditAPI';

const Context = createContext();
const { Provider, Consumer } = Context;

const initialState = {
  postsBySubreddit: {
    frontend: {},
    reactjs: {},
  },
  selectedSubreddit: 'reactjs',
  shouldUpdate: true,
};

function RedditProvider({ children }) {
  const [postsBySubreddit, setPostsBySubreddit] = useState(
    initialState.postsBySubreddit
  );
  const [selectedSubreddit, setSelectedSubreddit] = useState(
    initialState.selectedSubreddit
  );
  const [shouldUpdate, setShouldUpdate] = useState(
    initialState.shouldUpdate
  );
  useEffect(() => {
    const handleFetchSuccess = (json) => {
      const lastUpdated = Date.now();
      const items = json.data.children.map((child) => child.data);
      setPostsBySubreddit((prevState) => {
        const responsePostItem = {
          ...prevState,
          [selectedSubreddit]: {
            items,
            lastUpdated,
          },
        };
        setShouldUpdate(false)
        return responsePostItem;
      });
    };
  
    const handleFetchError = ({ message }) => {
      setPostsBySubreddit((prevState) => {
        const errorPostItem = {
          ...prevState,
          [selectedSubreddit]: {
            error: message,
            items: [],
          },
        };
        return errorPostItem;
      });
    };

    getPostsBySubreddit(selectedSubreddit).then(
      handleFetchSuccess,
      handleFetchError,
    );
  }, [selectedSubreddit, shouldUpdate]);


  const handleSubredditChange = (selectedSubreddit) => {
    setSelectedSubreddit(selectedSubreddit);
  };
    const context = {
      shouldUpdate,
      setShouldUpdate,
      selectedSubreddit,
      postsBySubreddit,
      setPostsBySubreddit,
      selectSubreddit: handleSubredditChange,
      availableSubreddits: Object.keys(postsBySubreddit),
      posts: postsBySubreddit[selectedSubreddit].items,
    };
    return <Provider value={ {...context} }>{children}</Provider>;
}

RedditProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { RedditProvider as Provider, Consumer, Context };
