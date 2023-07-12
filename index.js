fetch("https://api.lanyard.rest/v1/users/499592235772280842").then(e => e.json()).then(e => {
  if (e.data["listening_to_spotify"]) {
    statustext = document.getElementById("statustext");
    statustext.textContent = `${e.data.spotify.song} - ${e.data.spotify.artist}`
  }
})
webSocket = new WebSocket("wss://api.lanyard.rest/socket")
webSocket.addEventListener("message", (event) => {
  data = JSON.parse(event.data)
  /*console.log(data)*/
  if (event.data == "{\"op\":1,\"d\":{\"heartbeat_interval\":30000}}") {
    webSocket.send(JSON.stringify({
      op: 2,
      d: {
        subscribe_to_id: "499592235772280842"
      }
    }))
    setInterval(function () {
      webSocket.send("1")
    }, 30000)
  }
  if (data.d.discord_user) {
    if (data.d.listening_to_spotify) {
      statustext = document.getElementById("statustext");
      statustext.textContent = `${data.d.spotify.song} - ${data.d.spotify.artist}`
    } else {
      statustext = document.getElementById("statustext");
      statustext.textContent = `I am not listening anything right now!`
    }
  }
})

//-------------------------------------------------------------------------------------------------------------------------------------------------------------

var rain = new Howl({
    src: './assets/rain.mp3',
    volume: 0.2
  })

  var bigThunder = new Howl({
    src: './assets/thunder_start.mp3',
    volume: 0.5
  })

  function playBigThunder() {
    console.log('Playing Big Thunder')
    bigThunder.play()
  }

  var thunder = new Howl({
    src: ['./assets/thunder_sprite.mp3'],

    sprite: {
      a: [0, 8000],
      b: [8000, 16000],
      c: [16000, 24000],
      d: [24000, 32000]
    },
    volume: 0.5
  })

  function playRandomThunder() {
    console.log('Playing Random Thunder')

    var index = Math.floor(Math.random() * 4)

    var sprite = 'abcd'[index]

    thunder.play(sprite)
  }

  var body = document.body
  var flashCount = 0

  function flashOn() {
    body.style.background = 'white'
    flashCount = flashCount + 1
    console.clear()
    if (rain.play) {
      console.log('Rain Sound')
      setInterval(rain.play(), 30000)
    }
    console.log('Flash Count : ' + flashCount)
    setTimeout(flashOff, 10)
    if (Math.random() < 0.75) {
      setTimeout(flashOn, 50 + Math.random() * 450)
    }
  }

  function flashOff() {
    body.style.background = 'MidnightBlue'
  }
  flashOn()
  var firstFlash = true
  if (firstFlash = true) {
    rain.play()
    let firstFlash = false
    var randomDelay = 3000 + Math.floor(Math.random() * 6000)
    setInterval(flashOn, randomDelay)
    setTimeout(playBigThunder, 1000)
  }

  if (firstFlash = false) {
    console.log('First Flash False')
    
    var delay = 2000 + Math.floor(Math.random() * 3000)
    setTimeout(playRandomThunder, delay)
  }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------

class Rain {
    constructor(width, height, direction, posX, posY, speed, color){
        this.width = width;
        this.height = height;
        this.direction = direction;
        this.posX = posX;
        this.posY = posY;
        this.speed = speed;
        this.color = color;
    }

    move(){
        this.posX += Math.sin(this.direction * Math.PI/2)  * this.speed;
        this.posY += Math.cos(this.direction * Math.PI/2)  * this.speed;
    }

    draw(){
        canvasContext.rotate(-this.direction)
        canvasContext.fillStyle = this.color
        canvasContext.fillRect(this.posX, this.posY, this.width, this.height)
        canvasContext.rotate(+this.direction)
    }
}

let canvas = document.getElementById("canvas")
let canvasContext = canvas.getContext('2d');
let createRect = (x,y,width, height,color) => {
    canvasContext.fillStyle = color
    canvasContext.fillRect(x,y,width,height)
}

let allRains = []
let defaultRainWidth = 2
let defaultRainHeight = 15
let maximumRainCount = 1000

let maximumRainInitializationInOneFrame = 5

let fps = 120
let gameLoop = () => {
    setInterval(show, 1000/fps)
}

let show = () => {
    update();
    draw();
}

let update = () => {
    canvasContext.clearRect(0,0, canvas.width, canvas.height)
    let rainInitCountInThisFrame = 0
    while(allRains.length < maximumRainCount && maximumRainInitializationInOneFrame > rainInitCountInThisFrame) {
        let distanceFromCam = Math.random()
        let rain = new Rain( defaultRainWidth * (2-distanceFromCam)
                                ,defaultRainHeight* (2-distanceFromCam),
                                (Math.random()/20),
                                 Math.random() * canvas.width,
                                  -100, (2-distanceFromCam) * 8, 
                                  "rgba(197, 55, 230," + ((1-distanceFromCam ))+ ")")
        allRains.push(rain);
        rainInitCountInThisFrame++
    }

    for(let i = 0; i < allRains.length; i++){
        allRains[i].move()
        if(allRains[i].posY > canvas.height || allRains[i].posX > canvas.width ) {
            console.log("Raining")             //alternative Code//                ///*console.log(allRains[i].posY)*///  
            allRains.splice(i, 1)
        }
    } 
}

let draw = () => {  
    allRains.forEach(rain=>{ 
        rain.draw()
    })
}


gameLoop()