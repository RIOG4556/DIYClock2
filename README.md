# DIY-Lynx-Running-Clock
 Editable Lynx Scoreboard Files
 
 This repo contains the basic files necessary to customize your output file from Electron.  You will need to have nodejs installed on the computer you clone this repo to.
 
  <b>Why use this over "Lynx-Running-Clock---Ready"?  </b>
    -The other repo has an already disributable Electron application that allows for customization of the several functions within the renderer.js file, such as: Panel Height, Width, Typeface, Font Size, Font Color.
 
  <b>Basic Settings for the scoreboard/softare: </b>
  
  The program runs on the same computer as FinishLynx, and uses the included "DIY - 2 Board" lss file which needs to be placed in your Lynx folder. (c:/Lynx, by default)

Lynx scoreboard settings: Network (UDP) Port: 5479 IP Address: 127.0.0.1 Running Time: Normal

This code outputs to a Raspberry Pi running on the same LAN (Pi simply needs to be on the same network range, ie: "192.168.0.xxx" as Lynx.

<b>To properly edit these files:</b>

  From your terminal, "NPM RUN MAKE" when you are done editing to create your distributable Electron app.
  
  This project uses Henner Zeller's great Pixel-Pusher library to send data to the clock. It requires a Raspberry Pi with ethernet (3B+) and an Adafruit RGB Matrix Hat to output to boards. You may need to play with your board settings through the RGB library examples to figure things out, as all panels are different.
  
  For someone with ZERO coding experience, you will want to adjust settings within the Renderer.js file ONLY.  Edits to other files could lead to poor results.
  <b>Step-by-step walkthrough</b>
  1. Clone repo
  2. Make sure you have node.js installed on machine.
  3. Edit specific things in renderer.js, use commented areas to determine what can be modified
  4. from terminal, in folder "DIY Lynx Running Clock" type "npm run make"
  5. new folders should appear with program folders, specifically, out/make/squirrel.windows/x64
  6. from that folder, grab lynx-led-electron-1.0.0-setup, and drag to desktop for easier use.
  7. Double click and enjoy
