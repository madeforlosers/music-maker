/**
 * INSTRUCTIONS:
 * 
 * A: move note down a couple pitches
 * 
 * B: move to next line
 * 
 * A+B: play song
 * 
 * P1: switch to block 1
 * 
 * P2: switch to block 2
 * 
 * A+B+P1+P2: resets the song. or you could reset it by pressing the button on the back.
 * 
 * A+P1: 
 * 
 * it plays block 1 first, then block 2. it does not loop, unless you spam A+B a lot. 
 * 
 * going to the end of a block brings you to the beginning of the block you're on. when on an already defined note, pressing A will move the note position down from where it originally was.
 * 
 * if note is not appearing, it will not play.
 * 
 * to make a note not play, press A five times, or until it goes off the display.
 * 
 * HOW TO LISTEN TO YOUR SONG:
 * 
 * if you don't know what in the world is going on in the output thingy, I'll tell you.
 * 
 * get 2 alligator clips, hook one (we'll call it A1) to pin 0 and hook the other one (calling it  A2) to pin GND.
 * 
 * then, get some headphones and on the connector, clip the other end of  A1 to either the top layer, middle layer, or both layers (if you can manage that) and hook the other end of A2 to the bottom layer of the AUX cord. if you don't make the alligator clips to connect to both the top and middle layers, you will only hear music out of one side. (sad, I know)
 */
function clearLine () {
    led.unplot(notex, 0)
    led.unplot(notex, 1)
    led.unplot(notex, 2)
    led.unplot(notex, 3)
    led.unplot(notex, 4)
}
input.onButtonPressed(Button.A, function () {
    clearLine()
    notey += 1
    if (5 < notey) {
        notey = 0
    }
    if (0 > notey) {
        notey = 4
    }
    led.plot(notex, notey)
    if (atBlock == 1) {
        notes2[notex] = notey
    } else {
        notes[notex] = notey
    }
})
function DisplayIntro () {
    basic.showLeds(`
        . . # # .
        . . # . .
        . # # . .
        . # # . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . # # .
        . . # . .
        . # # . .
        . # # . .
        `)
    basic.showLeds(`
        . . # # .
        . . # . .
        . # # . .
        . # # . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        # . # # .
        . # # # .
        # # # . .
        . # . . .
        `)
    basic.showLeds(`
        . . # . .
        # # . # .
        # . . # .
        # # . # .
        . # # . .
        `)
    basic.showLeds(`
        # . # . #
        # . . . #
        # . . . .
        # . . . #
        # # . . #
        `)
    basic.showLeds(`
        # . # . .
        . . . . .
        . . . . .
        # . . . #
        # # . . #
        `)
    basic.showLeds(`
        # . # . .
        . . . . .
        . . . . .
        . . . . .
        # . . . #
        `)
}
function displayBlock () {
    notex = 0
    sudden_x = 0
    basic.clearScreen()
    if (atBlock == 1) {
        for (let value of notes2) {
            led.plot(sudden_x, value)
            sudden_x += 1
        }
    } else {
        for (let value of notes) {
            led.plot(sudden_x, value)
            sudden_x += 1
        }
    }
}
input.onPinPressed(TouchPin.P2, function () {
    atBlock = 1
    displayBlock()
})
input.onButtonPressed(Button.AB, function () {
    if (atBlock == 1) {
        notes2[notex] = notey
    } else {
        notes[notex] = notey
    }
    basic.showLeds(`
        . # # # .
        # . . . #
        # # . # #
        # # . # #
        . . . . .
        `)
    basic.pause(1000)
    basic.clearScreen()
    sudden_x = 0
    for (let value2 of notes) {
        if (value2 == 5) {
            continue;
        }
        music.ringTone((value2 + 1) * 131)
        led.plot(sudden_x, value2)
        basic.pause(blpm)
        music.stopAllSounds()
        sudden_x += 1
    }
    basic.clearScreen()
    sudden_x = 0
    for (let value2 of notes2) {
        if (value2 == 5) {
            continue;
        }
        music.ringTone((value2 + 1) * 131)
        led.plot(sudden_x, value2)
        basic.pause(blpm)
        music.stopAllSounds()
        sudden_x += 1
    }
})
input.onButtonPressed(Button.B, function () {
    if (atBlock == 1) {
        notes2[notex] = notey
    } else {
        notes[notex] = notey
    }
    notex += 1
    if (4 < notex) {
        notex = 1
    }
    if (0 > notex) {
        notex = 4
    }
    notey = notes[notex]
    led.plot(notex, notey)
})
input.onPinPressed(TouchPin.P1, function () {
    atBlock = 0
    displayBlock()
})
let sudden_x = 0
let notey = 0
let notex = 0
let notes2: number[] = []
let notes: number[] = []
let atBlock = 0
let blpm = 0
blpm = 200
DisplayIntro()
atBlock = 0
notes = [
0,
0,
0,
0,
0
]
notes2 = []
notex = 0
notey = 0
basic.clearScreen()
led.plot(notex, notey)
basic.forever(function () {
    if (input.buttonIsPressed(Button.AB) && (input.pinIsPressed(TouchPin.P1) && input.pinIsPressed(TouchPin.P2))) {
        atBlock = 0
        notes = [
        0,
        0,
        0,
        0,
        0
        ]
        notes2 = []
        notex = 0
        notey = 0
        basic.clearScreen()
        led.plot(notex, notey)
    }
    if (input.buttonIsPressed(Button.A) && input.pinIsPressed(TouchPin.P1)) {
        blpm = 200
        basic.showLeds(`
            # # . # #
            . # . # .
            # . . # .
            # # . # #
            . . . . .
            `)
        basic.pause(1000)
        atBlock = 0
        displayBlock()
    }
    if (input.buttonIsPressed(Button.A) && input.pinIsPressed(TouchPin.P2)) {
        blpm = 500
        basic.showLeds(`
            # # . # #
            # . . # .
            . # . # .
            # # . # #
            . . . . .
            `)
        basic.pause(1000)
        atBlock = 0
        displayBlock()
    }
})
