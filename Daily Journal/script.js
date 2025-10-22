const input = document.getElementById('daily-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('journal-list');

const saved = localStorage.getItem('journals');
const journals = saved ? JSON.parse(saved) : [];

function saveJournals() {
  localStorage.setItem('journals', JSON.stringify(journals));
}

function createJournalNode(journal, index) {
  const card = document.createElement('div');
  card.classList.add('journal-card');
  
  const textDiv = document.createElement('div');
  textDiv.classList.add('journal-text');
  textDiv.textContent = journal.text;
  card.appendChild(textDiv);

  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('journal-actions');
  
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.classList.add('edit-btn');
  editBtn.addEventListener('click', () => {
    const newText = prompt('Edit Journal', journal.text);
    if (newText !== null) {
      journal.text = newText.trim();
      textDiv.textContent = journal.text;
      saveJournals();
    }
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.classList.add('delete-btn');
  delBtn.addEventListener('click', () => {
    journals.splice(index, 1);
    render();
    saveJournals();
  });

  actionsDiv.appendChild(editBtn);
  actionsDiv.appendChild(delBtn);
  card.appendChild(actionsDiv);

  return card;
}

function render() {
  list.innerHTML = '';
  journals.forEach((journal, index) => {
    const node = createJournalNode(journal, index);
    list.appendChild(node);
  });
}

function addJournal() {
  const text = input.value.trim();
  if (!text) return;
  journals.push({ text, completed: false });
  input.value = '';
  render();
  saveJournals();
}

addBtn.addEventListener('click', addJournal);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addJournal();
});

render();
