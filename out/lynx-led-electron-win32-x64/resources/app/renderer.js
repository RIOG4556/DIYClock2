const PixelPusher = require('node-pixel-pusher')
const dgram = require('dgram')
const server = dgram.createSocket('udp4')

// Variables holding your panel configuration
// Height must equal total height of all your panels
// Width must equal total width of all your panels
// If you're running 2 16x32 panels, your height is 16, width 64
const heightPanel = 16
const widthPanel = 64

// Settings for the UDP Server
// use 127.0.0.1 if you're running on the same machine
// use alternative IP if you're running on a different machine
// this program should be lightweight enough to run on the Lynx computer without too much issue
// Port can be customized, if needed
const PORT = 5479
// Host location varies depending on Lynx Data Location
// const HOST = '192.168.0.17'
const HOST = "127.0.0.1"
server.bind(PORT, HOST)



//  Placeholder variables - no touchie
const MAX_FPS = 3
var stepResults = '';
var finalResults = '';

//  Double checking that the UDP server is alive, use Dev Tools in Electron
server.on('listening', () => console.log('UDP Server is listening'))

// Calling the PixelPusher Service to life
const service = new PixelPusher.Service()

// Placeholder variable to hold the data info
var actualDevice;

//  This fucntion populates actualDevice variable
service.on('discover', (device) => {
  actualDevice = device
})

// UDP server fucntion, accepting time, has an error catch, just in case
server.on('message', (msg, register) => {
  if (register.size == 536) {
      console.log('incomplete datagram')
  } 
  // datagram is not correct, check settings from Lynx that you're using the correct LSS
  else {
      finalResults = stepResults + msg.toString();
    // console.log(finalResults)
      timePost(finalResults)
  }
})

// This function draws the time on the board.
const timePost = (data) => {
  const canvas = document.createElement('canvas')
  canvas.width = widthPanel
  canvas.height = heightPanel
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')

  var newTime = data.trim()

  // variables holding textSize and location info
  // you may want to tweak the setBack and textSize based on panel size
  var setBack
  var textSize
  if (newTime.length < 6) {
    setBack = 10
    textSize = "22px Arial"
  } else if (newTime.length == 9) {
    setBack = 0
    textSize = "16px Arial"
   } else if (newTime.length == 7) {
    setBack = 10
    textSize = "22px Arial"
   } else {
    setBack = 20
    textSize = "22px Arial"
  }

  // Preprocessing is done, time to "draw" 
  actualDevice.startRendering(() => {
    // Render Settings, fillStyle is customizable to your preferred color
    ctx.fillStyle = 'yellow'
    ctx.font = `${textSize}`
    ctx.fillText(`${newTime}`, setBack, 16)

    // Get data
    const ImageData = ctx.getImageData(0, 0, 64, 16)

    // Send data to LEDs
    actualDevice.setRGBABuffer(ImageData.data)
  }, MAX_FPS)
}
