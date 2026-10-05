 import { writeFile } from 'fs/promises'
 const res = await fetch(
      'https://api.github.com/repos/nodejs/node',
 )
if (!res.ok) throw new Error(`HTTP ${res.status}`)
const repo = await res.json()
console.log(repo.name, repo.stargazers_count)

await writeFile(
  'repo.json',
  JSON.stringify({
    name: repo.name,
    stars: repo.stargazers_count
  }, null, 2)
)