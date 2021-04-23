import React, { useContext } from 'react';
import Posts from './components/Posts';
import Selector from './components/Selector';
import { Context } from './components/RedditContext';

function App() {
  const {
    selectedSubreddit,
    postsBySubreddit,
    setShouldUpdate,
    shouldUpdate,
    posts,
  } = useContext(Context);

  const renderLastUpdatedAt = () => {
    const { lastUpdated } = postsBySubreddit[selectedSubreddit];
    if (!lastUpdated) return null;

    return (
      <span>
        {`Last updated at ${new Date(lastUpdated).toLocaleTimeString()}.`}
      </span>
    );
  };
  

  const context = useContext(Context);
  const renderRefreshButton = () => {
    console.log(context);
    return (
      <>
        <button
          type="button"
          onClick={setShouldUpdate}
          disabled={shouldUpdate}
        >
          Refresh
        </button>
      </>
    );
  };

  return (
    <div>
      <Selector />
      <div>
        {renderLastUpdatedAt()}
        {renderRefreshButton()}
      </div>
      {posts && <Posts />}
    </div>
  );
}

export default App;
