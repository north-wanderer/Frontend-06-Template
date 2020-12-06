
class Animal {
  constructor (name) {
    this.name = name
  }

  bite (obj) {
    console.log(`${obj} been bite`)
  }
}

class Dog extends Animal {
  bite (obj) {
    super.bite(obj.name)
    console.log(`a dog named ${this.name} did that`)
    obj.hurt()
  }
}

class Person extends Animal {
  hurt () {
    console.log(`${this.name} been hurt`)
  }
}

const aDog = new Dog('Dog A')

const aPerson = new Person('Humam B')

aDog.bite(aPerson)
