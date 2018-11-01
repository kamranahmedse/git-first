import repo from 'repo-first-commit';

chrome.contextMenus.create({
  title: 'Initial Commit',
  documentUrlPatterns: ['*://github.com/*/*'],
  contexts: ['all'],
  onclick: (info, tab) => {
    // Get the owner, repo and branch name from the URL
    const pageUrl = info.pageUrl.replace(/.+:\/\/(www\.)?github.com\/?/, '');
    const urlParts = pageUrl.split('/');

    repo({
      owner: urlParts[0],
      repo: urlParts[1],
      sha: urlParts[3]
    }).then(commit => {
      chrome.tabs.update(tab.id, {
        url: commit.html_url
      });
    }).catch(err => {
      alert(err.message);
    });
  }
});
