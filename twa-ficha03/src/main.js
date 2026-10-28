
const state = {
  status: 'loading',
  error: null,
  items: [],
  query: '',
  category: '',
  sortDir: 'desc',
  selectedId: null,
};
const list = document.querySelector('#list');
const detail = document.querySelector('#detail');
const status = document.querySelector('#status');
const searchInput = document.querySelector('#search');
const categorySelect = document.querySelector('#category');
const sortSelect = document.querySelector('#sort');


let items = [];



function render() {
  list.replaceChildren();
  detail.replaceChildren();

  if (state.status === 'loading') {
    const message = document.createElement('p');
    message.textContent = 'A carregar artigos...';
    list.appendChild(message);
    return;
  }

  if (state.status === 'error') {
    const message = document.createElement('p');
    message.textContent = `Erro: ${state.error}`;
    list.appendChild(message);
    return;
  }

  const query = state.query.toLowerCase();

  let filtered = state.items.filter(item => {
    const matchesName = item.name
      .toLowerCase()
      .includes(query);

    const matchesCategory =
      !state.category || item.category === state.category;

    return matchesName && matchesCategory;
  });

  filtered.sort((a, b) => {
    if (state.sortDir === 'asc') {
      return a.price - b.price;
    }

    return b.price - a.price;
  });

  for (const item of filtered) {
    const li = document.createElement('li');
    const button = document.createElement('button');

    button.textContent = `${item.name} - ${item.price} €`;

    button.addEventListener('click', () => {
      state.selectedId = item.id;
      render();
    });

    li.appendChild(button);
    list.appendChild(li);
  }

  const selected = state.items.find(
    item => item.id === state.selectedId
  );

  if (selected) {
    const heading = document.createElement('h2');
    heading.textContent = selected.name;

    const price = document.createElement('p');
    price.textContent = `Preço: ${selected.price} €`;

    detail.appendChild(heading);
    detail.appendChild(price);
  } else {
    const message = document.createElement('p');
    message.textContent = 'Seleciona um artigo para ver os detalhes.';
    detail.appendChild(message);
  }
}


searchInput.addEventListener('input', () => {
  state.query = searchInput.value;
  render();
});

categorySelect.addEventListener('change', () => {
  state.category = categorySelect.value;
  render();
});

sortSelect.addEventListener('change', () => {
  state.sortDir = sortSelect.value;
  render();
});


async function load() {
 state.status = 'loading';
state.error = null;
render();

  try {
    const res = await fetch('/items.json');

    if (!res.ok) {
      throw new Error('Não foi possível carregar os artigos.');
    }

    
state.items = await res.json();

const categories = [
  ...new Set(state.items.map(item => item.category))
].filter(Boolean);

for (const category of categories) {
  const option = document.createElement('option');
  option.value = category;
  option.textContent = category;
  categorySelect.appendChild(option);
}

state.status = 'ready';
render();

  } catch (error) {
    state.status = 'error';
    state.error = error.message;

    render();
  }
}




searchInput.addEventListener('input', render);
categorySelect.addEventListener('change', render);
sortSelect.addEventListener('change', render);

load();
