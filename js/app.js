dialog = document.getElementById('content-dialog');
modalClicks = document.querySelectorAll('button.loader-btn');
document.addEventListener('DOMContentLoaded', () => {

});

let dialogTitle = document.getElementById('dialog-title');
let dialogContent = document.getElementById('dialog-content');

modalClicks.forEach((btn) => {
  btn.addEventListener('click', (evt) => {
    let slug = evt.currentTarget.getAttribute('data-load');
    fetch('https://api.mattgraham.ca/wp-json/wp/v2/pages/?slug=' + slug)
      .then(response => response.json())
      .then(json => {
        if (json.length === 0) {
          dialogTitle.innerHTML = 'Error';
          dialogContent.innerHTML = 'No content found';
          dialog.showModal();
          return;
        }
        dialogTitle.innerHTML = json[0].title.rendered;
        dialogContent.innerHTML = json[0].content.rendered;
        dialog.showModal();
      });
  });
});

document.getElementById('dialog-close').addEventListener('click', () => {
  dialog.close();

  setTimeout(() => {
    dialogTitle.innerHTML = '';
    dialogContent.innerHTML = '';
  }, 500);
})
