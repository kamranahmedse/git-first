import fetchFirstCommit from 'repo-first-commit';

/**
 * Loads and redirects user to first commit
 * @param info
 * @param tab
 */
const loadFirstCommit = (info, tab) => {
  // Remove scheme and host from the URL
  const pageUrl = info.pageUrl.replace(/.+:\/\/(www\.)?github.com\/?/, '');
  const [owner, repo, , sha] = pageUrl.split('/');

  // Fetch the first commit
  fetchFirstCommit({ owner, repo, sha })
    .then(commit => {
      chrome.tabs.update(tab.id, {
        url: commit.html_url
      });
    })
    .catch(err => {
      alert(err.message);
    });
};

// Register the context menu item
chrome.contextMenus.create({
  title: 'Initial Commit',
  documentUrlPatterns: ['*://github.com/*/*'],
  contexts: ['all'],
  onclick: loadFirstCommit
});
