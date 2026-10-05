import { items } from './data.js';

import {
  byCategory,
  search,
  top
} from './Catalog.js';

const [, , command, value] = process.argv;

let result;

if (!command) {
  result = items;
} else if (command === 'search') {
  result = search(items, value);
} else if (command === 'top') {
  result = top(items, Number(value));
} else {
  result = byCategory(items, command);
}

result.forEach(({ id, name, price }) => {
  console.log(`${id} · ${name} · ${price}€`);
});