let contador = 10

document.title = contador

setInterval(() => {
  contador--
  document.title = contador
}, 1000)
