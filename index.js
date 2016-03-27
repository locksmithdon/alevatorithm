import { constructElevators } from './lib/building'
import updateElevators from './lib/update-elevators'
import updatePassengers from './lib/update-passengers'
import createNewPassengers from './lib/create-new-passengers'

const building = {
  elevatorCount: 2,
  numberOfLevels: 13,
  numberOfSublevels: 2,
  waitFloors: [0, 7]
}
const passengerLoad = 2
const totalIterations = 50

let progress = 0
let totalArrived = 0
let totalWaitTime = 0
let totalTravelTime = 0
let passengers = [{
  source: 10,
  destination: 0,
  inElevator: false,
  arrived: false,
  waitTime: 0,
  travelTime: 0
}]
let elevators = constructElevators(building)
let simulationInterval = setInterval(runSimulation, 50)

function runSimulation () {
  passengers = createNewPassengers(passengers, passengerLoad, building)
  elevators = updateElevators(building, elevators, passengers)
  passengers = updatePassengers(elevators, passengers)
  manageProgress()
}

function manageProgress () {
  showStatus()
  progress += 1
  if (progress > totalIterations) {
    clearInterval(simulationInterval)
    showArrivalTimes()
    let passengerCount = passengers.length
    let avgWait = Math.ceil(totalWaitTime / totalArrived)
    let avgTravel = Math.ceil(totalTravelTime / totalArrived)
    console.log(`${totalArrived} of ${passengerCount} passengers arrived in ${totalIterations} cycles`)
    console.log(`average wait time: ${avgWait}, average travel time: ${avgTravel}`)
  }
}

function showArrivalTimes () {
  totalArrived = 0
  passengers.forEach((passenger) => {
    if (passenger.arrived) {
      totalArrived += 1
      let wait = passenger.waitTime
      let travel = passenger.travelTime
      let source = passenger.source
      let destination = passenger.destination
      totalWaitTime += wait
      totalTravelTime += travel
      console.log(`Arrival source: ${source}, destination: ${destination}, wait: ${wait}, travel: ${travel}`)
    }
  })
}

function showStatus () {
  elevators.forEach((elevator) => {
    let id = elevator.id
    let floor = elevator.floor
    let direction = elevator.direction
    console.log(`Floor id: ${id} floor: ${floor} direction: ${direction}`)
    passengers.forEach((passenger) => {
      if (passenger.inElevator === elevator.id) {
        let source = passenger.source
        let destination = passenger.destination
        console.log(`  Passenger source: ${source} destination: ${destination}`)
      }
    })
  })
  console.log('Waiting passengers:')
  passengers.forEach((passenger) => {
    if (!passenger.arrived && passenger.inElevator === false) {
      let source = passenger.source
      let destination = passenger.destination
      console.log(`  Passenger source: ${source} destination: ${destination}`)
    }
  })
  process.stdout.write('--------------- \n \n')
}
