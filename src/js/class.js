class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  constructor(na) {
    super(na);
  }

  speak() {
    console.log(this.name + ' barks.');
  }
}

var dog = new Dog('Mitzie');
dog.speak(); // Mitzie barks.
