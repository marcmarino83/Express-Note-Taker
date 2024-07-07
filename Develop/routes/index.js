document.addEventListener('DOMContentLoaded', () => {
  const saveNoteBtn = document.querySelector('.save-note');
  const newNoteBtn = document.querySelector('.new-note');
  const clearBtn = document.querySelector('.clear-btn');
  const noteTitle = document.querySelector('.note-title');
  const noteText = document.querySelector('.note-textarea');
  const noteList = document.querySelector('#list-group');

  let activeNote = {};

  const getNotes = async () => {
    const response = await fetch('/api/notes');
    return response.json();
  };

  const saveNote = async (note) => {
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    return response.json();
  };

  const deleteNote = async (id) => {
    const response = await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  };

  const renderNoteList = (notes) => {
    noteList.innerHTML = '';
    notes.forEach((note) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.dataset.id = note.id;
      li.innerHTML = `
        <span>${note.title}</span>
        <button class="btn btn-sm btn-outline-danger float-end delete-note">
          <span class="fas fa-trash-alt"></span>
        </button>
      `;
      noteList.appendChild(li);
    });
  };

  noteList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-note') || event.target.parentElement.classList.contains('delete-note')) {
      const noteId = event.target.closest('li').dataset.id;
      deleteNote(noteId).then(() => {
        loadNotes();
      });
    } else {
      const noteId = event.target.closest('li').dataset.id;
      getNotes().then((notes) => {
        activeNote = notes.find((note) => note.id === noteId);
        renderActiveNote();
      });
    }
  });

  saveNoteBtn.addEventListener('click', () => {
    const newNote = {
      title: noteTitle.value,
      text: noteText.value,
    };
    saveNote(newNote).then(() => {
      loadNotes();
      clearForm();
    });
  });

  newNoteBtn.addEventListener('click', () => {
    clearForm();
  });

  clearBtn.addEventListener('click', () => {
    clearForm();
  });
  
  const renderActiveNote = () => {
    if (activeNote.id) {
      noteTitle.value = activeNote.title;
      noteText.value = activeNote.text;
    } else {
      clearForm();
    }
  };

  const clearForm = () => {
    activeNote = {};
    noteTitle.value = '';
    noteText.value = '';
  };

  const loadNotes = () => {
    getNotes().then((notes) => {
      renderNoteList(notes);
    });
  };

  loadNotes();
});