chrome.windows.onRemoved.addListener(async _ => {
  await chrome.storage.sync.get('search', storage => {
    let search = storage.search;

    if (search == null || typeof(search) !== 'string') {
      return;
    }

    search = search.trim();
    if (search == '') {
      return;
    }

    search = search.split(',');
    if (search.length == null || search.length <= 0) {
      return;
    }

    search.forEach(subSearch => {
      chrome.history.search({
        startTime: 0,
        endTime: Date.now(),
        maxResults: 0,
        text: subSearch.trim()
      }).then(searchResult => {
        searchResult.forEach(history => {
          chrome.history.deleteUrl({
            url: history.url
          });
        });
      }).catch(error => {
        console.error(error);
      });
    });
  });

  await chrome.storage.sync.get('days', storage => {
    const days = storage.days;

    if (days == null || typeof(days) !== 'number') {
      return;
    }

    chrome.history.deleteRange({
      startTime: 0,
      endTime: Date.now() - (days * 24 * 60 * 60 * 1000)
    });
  });
});
