document.addEventListener('DOMContentLoaded', () => {
  const noteList = document.getElementById('note-list');
  const noteForm = document.getElementById('note-form');
  const noteTitle = document.getElementById('note-title');
  const noteText = document.getElementById('note-text');
  const saveNoteButton = document.getElementById('save-note');
  const clearFormButton = document.getElementById('clear-form');
  const formTitle = document.getElementById('form-title');

  // Load existing notes from the API
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

          // Add delete button
          const deleteBtn = document.createElement('button');
          deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'float-right');
          deleteBtn.textContent = 'Delete';
          deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteNote(note.id);
          });

          li.appendChild(deleteBtn);
          li.addEventListener('click', () => displayNote(note));
          noteList.appendChild(li);
        });
      })
      .catch(error => console.error('Error loading notes:', error));
  };

  // Display a note in the form for editing
  const displayNote = (note) => {
    noteTitle.value = note.title;
    noteText.value = note.text;
    formTitle.textContent = 'Edit Note'; // Set form title for editing
    saveNoteButton.style.display = 'block';
    clearFormButton.style.display = 'block';
  };

  // Save a new or edited note
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
        clearForm();
      })
      .catch(error => console.error('Error saving note:', error));
  };

  // Clear the form fields
  const clearForm = (event) => {
    if (event) event.preventDefault();
    noteTitle.value = '';
    noteText.value = '';
    formTitle.textContent = 'New Note'; // Reset form title for new note
    saveNoteButton.style.display = 'none';
    clearFormButton.style.display = 'none';
  };

  // Delete a note by ID
  const deleteNote = (id) => {
    fetch(`/api/notes/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        loadNotes();
        clearForm();
      })
      .catch(error => console.error('Error deleting note:', error));
  };

  // Event listeners
  noteForm.addEventListener('submit', saveNote);
  clearFormButton.addEventListener('click', clearForm);

  // Initial load of notes
  loadNotes();
});
