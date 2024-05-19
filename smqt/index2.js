const serefsizButton = document.getElementById('serefsiz-button')
const OFFSET = 100

serefsizButton.addEventListener('click', () => {
  alert('Benden Kaçamazsın')
  window.close()
})

button.addEventListener('click', () => {
    window.location.replace("https://keirnegn.dev/smqt/site2.html");
  })

document.addEventListener('mousemove', (e) => {
  const x = e.pageX
  const y = e.pageY
  const buttonBox = serefsizButton.getBoundingClientRect()
  const yatayMesafe = ortayaUzaklık(buttonBox.x, x, buttonBox.width)
  const dikeyMesafe = ortayaUzaklık(buttonBox.y, y, buttonBox.height)
  const yatayOffset = buttonBox.width / 2 + OFFSET
  const dikeyOffset = buttonBox.height / 2 + OFFSET
  if (Math.abs(yatayMesafe) <= yatayOffset && Math.abs(dikeyMesafe) <= dikeyOffset) {
    buttonPozisyonunuAyarla(
      buttonBox.x + yatayOffset / yatayMesafe * 10,
      buttonBox.y + dikeyOffset / dikeyMesafe * 10
    )
  }
})

function buttonPozisyonunuAyarla(left, top) {
  const windowBox = document.body.getBoundingClientRect()
  const buttonBox = serefsizButton.getBoundingClientRect()

  if(ortayaUzaklık(left, windowBox.left, buttonBox.width) < 0) {
    left = windowBox.right - buttonBox.width - OFFSET
  }
  if(ortayaUzaklık(left, windowBox.right, buttonBox.width) > 0) {
    left = windowBox.left + OFFSET
  }
  if(ortayaUzaklık(top, windowBox.top, buttonBox.height) < 0) {
    top = windowBox.bottom - buttonBox.height - OFFSET
  }
  if(ortayaUzaklık(top, windowBox.bottom, buttonBox.height) > 0) {
    top = windowBox.top + OFFSET
  }

  serefsizButton.style.left = `${left}px`
  serefsizButton.style.top = `${top}px`
}

function ortayaUzaklık(boxPosition, mousePosition, boxSize) {
  return boxPosition - mousePosition + boxSize / 2
}
