// DOM element references
const noteList = document.querySelector('.list-container .list-group'); // corrected from NodeList to single element
const saveNoteBtn = document.querySelector('.save-note');
const newNoteBtn = document.querySelector('.new-note');
const clearNoteBtn = document.querySelector('.clear-note'); // corrected class
const noteForm = document.querySelector('.note-form');

// Fetch notes from the API
const getNotes = async () => {
  const response = await fetch('/api/notes');
  if (!response.ok) {
    console.error('Failed to fetch notes');
    return [];
  }
  return response.json();
};

// Render the list of note titles
const renderNoteList = async () => {
  let jsonNotes = await getNotes();
  if (window.location.pathname === '/notes') {
    noteList.innerHTML = ''; // cleared list container
  }

  let noteListItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList.append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

// Check if we are on the notes page before adding event listeners
if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  clearNoteBtn.addEventListener('click', renderActiveNote); // corrected class
  noteForm.addEventListener('input', handleRenderBtns);
}

getAndRenderNotes();

// Ensure these functions are defined somewhere in your script
function handleNoteView() {
  // Define behavior
}

function handleNoteDelete() {
  // Define behavior
}

function handleNoteSave() {
  // Define behavior
}

function handleNewNoteView() {
  // Define behavior
}

function renderActiveNote() {
  // Define behavior
}

function handleRenderBtns() {
  // Define behavior
}
