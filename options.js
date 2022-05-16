addEventListener('DOMContentLoaded', _ => {
  chrome.storage.sync.get('days', storage => {
    const days = storage.days;

    if (days == null || typeof(days) !== 'number') {
      return;
    }

    document.getElementById('days').value = days;
  });
  chrome.storage.sync.get('search', storage => {
    const search = storage.search;

    if (search == null || typeof(search) !== 'string') {
      return;
    }

    document.getElementById('search').value = search;
  });

  const saveDays = value => {
    let days = 9999;

    try {
      days = Math.max(0, parseInt(value, 10));
      if (isNaN(days) || !isFinite(days)) {
        days = 9999;
      }
    } catch (e) {
      console.error(e);

      days = 9999;
    }

    return new Promise(resolve => {
      chrome.storage.sync.set({
        days: days
      }, () => {
        resolve();
      });
    });
  }

  const saveSearch = value => {
    return new Promise(resolve => {
      chrome.storage.sync.set({
        search: (value == null || value.trim == null) ? '' : value.trim()
      }, () => {
        resolve();
      });
    });
  }

  document.getElementById('days').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      Promise.all([saveDays(this.value), saveSearch(document.getElementById('search').value)]).then(() => {
        window.close();
      });
    }
  });

  document.getElementById('search').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      Promise.all([saveDays(document.getElementById('days').value), saveSearch(this.value)]).then(() => {
        window.close();
      });
    }
  });
});
