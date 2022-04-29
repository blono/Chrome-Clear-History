addEventListener('DOMContentLoaded', _ => {
  chrome.storage.sync.get('days', storage => {
    const days = storage.days;

    if (days == null || typeof(days) !== 'number') {
      return;
    }

    document.querySelector('#days').value = days;
  });

  document.querySelector('#days').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      let days = 0;

      try {
        days = parseInt(this.value, 10);
      } catch (e) {
        console.error(e);

        days = 0;
      }

      chrome.storage.sync.set({
        days: days
      }, () => {
        window.close();
      });
    }
  });
});
