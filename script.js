function openFirstCommit() {
    // @todo
}

chrome.contextMenus.create({
    title: 'Initial Commit',
    documentUrlPatterns: ['*://github.com/*/*'],
    contexts: ['all'],
    onclick: openFirstCommit
});
