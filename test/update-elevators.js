import test from 'ava'
import 'babel-register'
import updateElevators from '../lib/update-elevators'

test.beforeEach((t) => {
  t.context.building = {
    numberOfLevels: 13,
    numberOfSublevels: 2
  }
})

test('will stay on wait floor', (t) => {
  let floor = 5
  let elevators = [{
    floor: floor,
    direction: 0,
    waitFloor: floor
  }]
  let newElevators = updateElevators(t.context.building, elevators, [])
  t.is(newElevators[0].floor, floor)
})

test('will go up a floor with a passenger inside', (t) => {
  let floor = 5
  let elevators = [{
    id: 1,
    floor: floor,
    direction: 1,
    waitFloor: floor
  }]
  let passengers = [{
    inElevator: 1,
    direction: 1,
    destination: 7,
    source: 1
  }]
  let newElevators = updateElevators(t.context.building, elevators, passengers)
  t.is(newElevators[0].floor, floor + 1)
})

test('will go down a floor with passenger inside', (t) => {
  let floor = 5
  let elevators = [{
    id: 1,
    floor: floor,
    direction: -1,
    waitFloor: floor
  }]
  let passengers = [{
    inElevator: 1,
    direction: 1,
    destination: 7,
    source: 1
  }]
  let newElevators = updateElevators(t.context.building, elevators, passengers)
  t.is(newElevators[0].floor, floor - 1)
})

test('will go down towards wait floor', (t) => {
  let floor = 5
  let waitFloor = 0
  let elevators = [{
    floor: floor,
    direction: 0,
    waitFloor: waitFloor
  }]
  let newElevators = updateElevators(t.context.building, elevators, [])
  t.is(newElevators[0].floor, floor - 1)
})

test('will go up towards wait floor', (t) => {
  let floor = 1
  let waitFloor = 7
  let elevators = [{
    floor: floor,
    direction: 0,
    waitFloor: waitFloor
  }]
  let newElevators = updateElevators(t.context.building, elevators, [])
  t.is(newElevators[0].floor, floor + 1)
})

test('will go up to new passenger', (t) => {
  let floor = 1
  let elevators = [{
    floor: floor,
    direction: 0,
    waitFloor: 0
  }]
  let passengers = [{
    source: 5,
    destination: 0,
    inElevator: false
  }]
  let newElevators = updateElevators(t.context.building, elevators, passengers)
  t.is(newElevators[0].floor, floor + 1)
})

test('will go down to new passenger', (t) => {
  let floor = 7
  let elevators = [{
    floor: floor,
    direction: 0,
    waitFloor: 0
  }]
  let passengers = [{
    source: 5,
    destination: 0,
    inElevator: false
  }]
  let newElevators = updateElevators(t.context.building, elevators, passengers)
  t.is(newElevators[0].floor, floor - 1)
})
