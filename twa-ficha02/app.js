// app.js — o único ficheiro que fala com o exterior (argumentos, consola, ficheiros).
// The only file that talks to the outside (arguments, console, files).
import { writeFile } from 'node:fs/promises'
import { items } from './data.js'
import { byCategory, categories, search, top, total } from './catalog.js'

const [cmd, arg] = process.argv.slice(2)

const line = ({ id, name, price }) => `${id} · ${name} · ${price.toFixed(2)}`
const print = (list) => console.log(list.map(line).join('\n') || '(nothing)')

switch (cmd) {
  case undefined:
    print(items)
    break
  case 'search':
    print(search(items, arg ?? ''))
    break
  case 'top':
    print(top(items, Number(arg ?? 3)))
    break
  case 'report': {
    const report = {
      count: items.length,
      total: total(items),
      categories: categories(items),
      top3: top(items, 3).map(({ name, price }) => ({ name, price })),
    }
    await writeFile('report.json', JSON.stringify(report, null, 2) + '\n')
    console.log('saved report.json')
    break
  }
  default:
    // qualquer outra palavra é uma categoria · any other word is a category
    if (!categories(items).includes(cmd)) {
      console.error(`unknown command or category: ${cmd} — try: search <text> · top <n> · report · ${categories(items).join(' · ')}`)
      process.exit(1)
    }
    print(byCategory(items, cmd))
}