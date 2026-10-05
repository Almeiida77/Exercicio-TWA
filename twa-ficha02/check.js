import assert from 'node:assert/strict';

import { items } from './data.js';
import {
  byCategory,
  categories,
  search,
  top,
  total,
  withDiscount
} from './Catalog.js';

assert.deepStrictEqual(byCategory(items, 'RPG').map(({ id }) => id), [1, 8]);
assert.deepStrictEqual(search(items, 'SHOOTER').map(({ id }) => id), [2, 3]);
assert.strictEqual(total(items), 169.95);
assert.deepStrictEqual(top(items, 3).map(({ id }) => id), [5, 8, 7]);
assert.deepStrictEqual(categories(items), ['FPS', 'MOBA', 'RPG', 'Sandbox', 'Sports']);
const discountItems = [{ id: 1, price: 50 }];
assert.deepStrictEqual(
  { discounted: withDiscount(discountItems, 20), original: discountItems },
  { discounted: [{ id: 1, price: 40 }], original: [{ id: 1, price: 50 }] }
);
