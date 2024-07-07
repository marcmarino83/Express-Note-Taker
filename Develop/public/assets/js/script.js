document.addEventListener('DOMContentLoaded', (event) => {
    const noteList = document.getElementById('note-list');
    const noteForm = document.getElementById('note-form');
    const noteTitle = document.getElementById('note-title');
    const noteText = document.getElementById('note-text');
    const saveNoteButton = document.getElementById('save-note');
    const clearFormButton = document.getElementById('clear-form');
    const formTitle = document.getElementById('form-title');
  
    // Function to load existing notes
    const loadNotes = () => {
      fetch('/api/notes')
        .then(response => response.json())
        .then(notes => {
          noteList.innerHTML = '';
          notes.forEach(note => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = note.title;
            li.dataset.id = note.id;
            li.addEventListener('click', () => displayNote(note));
            noteList.appendChild(li);
          });
        });
    };
  
    // Function to display a note in the form
    const displayNote = (note) => {
      noteTitle.value = note.title;
      noteText.value = note.text;
      formTitle.textContent = 'Edit Note';
      saveNoteButton.style.display = 'block';
      clearFormButton.style.display = 'block';
    };
  
    // Function to save a new note
    const saveNote = (event) => {
      event.preventDefault();
      const newNote = {
        title: noteTitle.value,
        text: noteText.value,
      };
  
      fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      })
        .then(response => response.json())
        .then(note => {
          loadNotes();
          noteTitle.value = '';
          noteText.value = '';
          formTitle.textContent = 'New Note';
          saveNoteButton.style.display = 'none';
          clearFormButton.style.display = 'none';
        });
    };
  
    // Function to clear the form
    const clearForm = (event) => {
      event.preventDefault();
      noteTitle.value = '';
      noteText.value = '';
      formTitle.textContent = 'New Note';
      saveNoteButton.style.display = 'none';
      clearFormButton.style.display = 'none';
    };
  
    // Event listeners
    noteForm.addEventListener('submit', saveNote);
    clearFormButton.addEventListener('click', clearForm);
  
    // Initial load of notes
    loadNotes();
  });