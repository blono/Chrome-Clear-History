chrome.storage.sync.get('days', storage => {
  const days = storage.days;

  if (days == null || typeof(days) !== 'number') {
    return;
  }

  chrome.history.deleteRange({
    startTime: 0,
    endTime: Date.now() - (days * 24 * 60 * 60 * 1000)
  });
});
