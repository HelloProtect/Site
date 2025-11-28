let infiniteInterval = null;

document.getElementById('refresh').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.reload(tabs[0].id);
  });
});

document.getElementById('crazy').addEventListener('click', () => {
  const count = parseInt(document.getElementById('count').value, 10) || 1;
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const id = tabs[0].id;
    for (let i = 0; i < count; i++) chrome.tabs.reload(id);
  });
});

document.getElementById('infinite').addEventListener('click', () => {
  if (infiniteInterval) return;
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const id = tabs[0].id;
    infiniteInterval = setInterval(() => chrome.tabs.reload(id), 300);
  });
});

document.getElementById('stopInfinite').addEventListener('click', () => {
  clearInterval(infiniteInterval);
  infiniteInterval = null;
});

document.getElementById('refreshDelay').addEventListener('click', () => {
  const delay = parseInt(document.getElementById('delay').value, 10) || 500;
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const id = tabs[0].id;
    setTimeout(() => chrome.tabs.reload(id), delay);
  });
});

document.getElementById('refreshLoop').addEventListener('click', () => {
  const loops = parseInt(document.getElementById('loopCount').value, 10) || 1;
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const id = tabs[0].id;
    let i = 0;
    const run = () => {
      if (i >= loops) return;
      chrome.tabs.reload(id);
      i++;
      setTimeout(run, 400);
    };
    run();
  });
});

document.getElementById('fetchPing').addEventListener('click', () => {
  fetch('https://example.com/ping', { method: 'GET' })
    .then(() => console.log('ping envoyé'))
    .catch(() => console.log('erreur ping'));
});
