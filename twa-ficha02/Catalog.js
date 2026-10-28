// catalog.js — funções puras sobre uma lista de itens · pure functions over a list of items.
// Sem I/O, sem console.log, sem ciclos: cada função recebe a lista e devolve um valor novo.
// No I/O, no console.log, no loops: every function takes the list and returns a new value.

export const byCategory = (list, cat) =>
  list.filter((item) => item.category === cat)

// nome OU tags, sem distinguir maiúsculas · name OR tags, case-insensitive
export const search = (list, text) => {
  const needle = text.toLowerCase()
  return list.filter(({ name, tags }) =>
    [name, ...tags].some((t) => t.toLowerCase().includes(needle)))
}

export const total = (list) =>
  list.reduce((sum, { price }) => sum + price, 0)

// os n mais caros, array novo, do mais caro para o mais barato · n most expensive, new array, desc
export const top = (list, n) =>
  list.toSorted((a, b) => b.price - a.price).slice(0, n)

// categorias únicas, ordenadas · unique categories, sorted
export const categories = (list) =>
  [...new Set(list.map((item) => item.category))].toSorted()

// itens NOVOS com desconto; os originais não mudam · NEW items with a discount; originals untouched
export const withDiscount = (list, pct) =>
  list.map((item) => ({ ...item, price: round2(item.price * (1 - pct / 100)) }))

// bónus · bonus
export const groupByCategory = (list) => Object.groupBy(list, (item) => item.category)

const round2 = (n) => Math.round(n * 100) / 100