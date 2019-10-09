export {};

let count = 0;
const qs = document.querySelector.bind(document) as typeof document.querySelector;

function setPopup() {
  const queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, tabs => {
    const spanUrl = qs('span#url') as HTMLSpanElement;
    spanUrl.innerText = tabs[0].url!;
    const spanTime = qs('span#time') as HTMLSpanElement;
    spanTime.innerText = '';
  });

  chrome.browserAction.setBadgeText({ text: count.toString() });
  (qs('button#countUp') as HTMLButtonElement).addEventListener('click', () => {
    chrome.browserAction.setBadgeText({ text: (++count).toString() });
  });

  (qs('button#changeBackground') as HTMLButtonElement).addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id!, { color: '#555555' }, msg => console.log('result message:', msg));
    });
  });
}

document.addEventListener('DOMContentLoaded', setPopup);
