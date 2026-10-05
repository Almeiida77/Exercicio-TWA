
export function byCategory(list, cat) { //devolve apenas os jogos da categoria RPG.
  return list.filter(({ category }) => category === cat);
}

export function search(list, text) { //(toLowerCase) é case-insensitive, portanto Riot, riot e RIOT funcionam 
  const searchText = text.toLowerCase();

  return list.filter(({ name, tags }) =>
    name.toLowerCase().includes(searchText) ||
    tags.some(tag => tag.toLowerCase().includes(searchText))
  );
}

export function total(list) { //Soma todos os preços usando reduce()
  return list.reduce((sum, { price }) => sum + price, 0);
}

export function top(list, n) { //devolve os 3 mais caros, ordenados do mais caro para o mais barato.
  return list
    .toSorted((a, b) => b.price - a.price) //tosorted não altera o array original.
    .slice(0, n);
}

export function categories(list) { //devolve uma lista de categorias únicas, ordenadas alfabeticamente.
  return [...new Set(list.map(({ category }) => category))]
    .toSorted();
}

export function withDiscount(list, pct) { //devolve uma lista de jogos com o preço atualizado com o 20% de desconto, sem alterar o array original.
  return list.map(item => ({
    ...item,
    price: item.price * (1 - pct / 100)
  }));
}