/*
MISIJE
*/
// MISIJA 2(JAJCA NA OKO)
brick.buttonDown.onEvent(ButtonEvent.Pressed, function () {
    motors.largeBC.setInverted(true)
    pospesevanje(20)
    motors.largeBC.tank(10, 10, 2.2, MoveUnit.Rotations)
    motors.largeC.run(30, 0.7, MoveUnit.Rotations)
    motors.largeBC.tank(100, 100, -3, MoveUnit.Rotations)
})


// MISIJA 1(ORANŽNA ŽIRAFA)
brick.buttonUp.onEvent(ButtonEvent.Pressed, function () {
    motors.largeBC.setInverted(true)
    pospesevanje(20)
    motors.largeBC.steer(0, 20, 2.54, MoveUnit.Rotations)
    //for (let i = 0; i < 4; i++) {

    //}
    motors.stopAll()
})


// MISIJA 4(PUKL)
brick.buttonLeft.onEvent(ButtonEvent.Pressed, function () {
    motors.largeBC.setInverted(true)
    motors.largeBC.tank(30, 30, -3.7, MoveUnit.Rotations)
    motors.mediumA.run(100, 0.8, MoveUnit.Seconds)
    motors.largeB.run(30, 0.25, MoveUnit.Rotations)
    motors.largeBC.tank(30, 30, -0.9, MoveUnit.Rotations)
    motors.largeBC.tank(30, 1, MoveUnit.Rotations)
    do_crte(90, 30, 1)
    control.waitMicros(200000)
    motors.largeB.run(30, -0.9, MoveUnit.Rotations)
    motors.largeBC.tank(30, 30, 2.4, MoveUnit.Rotations)
})


// MISIJA 3(ORTODONT)
brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () {
    motors.largeBC.setInverted(true)
    pospesevanje(25)
    motors.largeBC.tank(25, 25, 1.8, MoveUnit.Rotations)
    motors.mediumD.run(25, 2, MoveUnit.Rotations)
    motors.largeBC.tank(10, 10, 1, MoveUnit.Rotations)
    motors.mediumD.run(25, -1, MoveUnit.Rotations)
    motors.largeBC.steer(-41, 30, 0.5, MoveUnit.Rotations)
    motors.largeBC.steer(41, 30, 0.5, MoveUnit.Rotations)
    do_crte(90, 30, 2)
    motors.mediumD.run(100, -2, MoveUnit.Rotations)
    motors.largeBC.tank(30, 30, 1, MoveUnit.Rotations)
})

sensors.color1.calibrateLight(LightIntensityMode.Reflected)

// KALIBRIRA GYRO
brick.buttonRight.onEvent(ButtonEvent.Pressed, function () {
    sensors.gyro3.calibrate()
})

/*
OD TU NAPREJ PODPROGRAMI 
*/
/*
PODPROGRAM ZA VOŽNJO NARAVNOST
*/
function vozi_ravno(cm: number) {
    popravek = 0
    sensors.gyro3.reset()
    motors.largeB.reset()
    motors.largeBC.setBrake(false)
    while (Math.abs(motors.largeB.angle()) < 360 * (cm / 29)) {
        popravek = sensors.gyro3.angle() * 1.5
        motors.largeBC.steer(popravek, 30)
        //brick.showString("Popravek", 7)
        //brick.showNumber(popravek, 8)
        //brick.showString("360*cm/29", 9)
        //brick.showNumber(Math.abs(motors.largeB.angle()), 10) 

    }
}
/*
PODPROGRAM ZA POSPEŠEVANJE
*/
function pospesevanje(maxmoc: number) {
    moc = 0
    motors.largeBC.setBrake(false)
    while (moc < maxmoc) {
        motors.largeBC.tank(moc, moc)
        moc = moc + 2
        control.waitMicros(100000)
    }
}
/*
PODPROGRAM ZA VOŽNJO DO ČRTE
*/
function do_crte(svetlost: number, moc: number, senzor: number) {
    motors.largeBC.setInverted(true)
    motors.largeBC.setBrake(true)
    // če rabimo senzor ena
    if (senzor = 1) {
        while (sensors.color1.light(LightIntensityMode.Reflected) < svetlost) {
            motors.largeBC.tank(moc, moc)
        }
        motors.stopAll()
    }
    // če rabimo senzor dva
    if (senzor = 2) {
        while (sensors.color2.light(LightIntensityMode.Reflected) < svetlost) {
            motors.largeBC.tank(moc, moc)
        }
        motors.stopAll()
    }
}
/*
PODPROGRAM ZA IZPIS POMEMBNIH VREDNOSTI SENZORJEV

forever(function () {
    brick.showString("Color 1", 1)
    brick.showNumber(sensors.color1.light(LightIntensityMode.Reflected), 2)
    brick.showString("Color 2", 3)
    brick.showNumber(sensors.color2.light(LightIntensityMode.Reflected), 4)
    brick.showString("Gyro 3", 5)
    brick.showNumber(sensors.gyro3.angle(), 6)

})


/*
SPREMENLJIVKE
*/
let moc = 0
let popravek = 0
let moc3 = 0
let senzor = 0
let i = 0
let svetlost = 0
let maxmoc = 0
sensors.color1.reflectedLight()
sensors.color2.reflectedLight()
sensors.gyro3.angle()
brick.setStatusLight(StatusLight.Orange)

//Čudovito!!
