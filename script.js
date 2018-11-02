import fetchFirstCommit from 'repo-first-commit';

/**
 * Loads and redirects user to first commit
 * @param info
 * @param tab
 */
const loadFirstCommit = (info, tab) => {
  // Remove scheme and host from the URL
  const pageUrl = info.pageUrl.replace(/.+:\/\/(www\.)?github.com\/?/, '');
  let [owner, repo, , sha] = pageUrl.split('/');

  // Only these pages have a valid sha
  if (!['commits', 'find', 'blob', 'commit'].includes(sha)) {
    sha = null;
  }

  // Fetch the first commit and redirect
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
