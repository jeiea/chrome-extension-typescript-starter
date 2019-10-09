export {};

const qs = document.querySelector.bind(document);

// Saves options to chrome.storage.sync.
function save_options() {
  const color = (qs('#color') as HTMLSelectElement).value;
  const likesColor = (qs('#like') as HTMLInputElement).checked;
  chrome.storage.sync.set(
    {
      favoriteColor: color,
      likesColor: likesColor
    },
    () => {
      // Update status to let user know options were saved.
      const status = qs('#status') as HTMLDivElement;
      status.innerText = 'Options saved.';
      setTimeout(() => {
        status.innerText = '';
      }, 750);
    }
  );
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  const colorElem = qs('#color') as HTMLSelectElement;
  const likesElem = qs('#like') as HTMLInputElement;

  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get(
    {
      favoriteColor: 'red',
      likesColor: true
    },
    ({ favoriteColor, likesColor }: { favoriteColor?: string; likesColor?: boolean }) => {
      colorElem.value = favoriteColor!;
      likesElem.checked = likesColor!;
    }
  );
}

(qs('button#save') as HTMLButtonElement).addEventListener('click', save_options);
document.addEventListener('DOMContentLoaded', restore_options);
