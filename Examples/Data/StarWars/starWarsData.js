{
  humans: {
    1000: {
      id: '1000',
      name: 'Luke Skywalker',
      friends: [ '1002', '1003', '2000', '2001' ],
      appearsIn: [ 4, 5, 6 ],
      homePlanet: 'Tatooine',
    },
    1001: {
      id: '1001',
      name: 'Darth Vader',
      friends: [ '1004' ],
      appearsIn: [ 4, 5, 6 ],
      homePlanet: 'Tatooine',
    },
    1002: {
      id: '1002',
      name: 'Han Solo',
      friends: [ '1000', '1003', '2001' ],
      appearsIn: [ 4, 5, 6 ],
    },
    1003: {
      id: '1003',
      name: 'Leia Organa',
      friends: [ '1000', '1002', '2000', '2001' ],
      appearsIn: [ 4, 5, 6 ],
      homePlanet: 'Alderaan',
    },
    1004: {
      id: '1004',
      name: 'Wilhuff Tarkin',
      friends: [ '1001' ],
      appearsIn: [ 4 ],
    },
  },
  droids: {
    2000: {
      id: '2000',
      name: 'C-3PO',
      friends: [ '1000', '1002', '1003', '2001' ],
      appearsIn: [ 4, 5, 6 ],
      primaryFunction: 'Protocol',
    },
    2001: {
      id: '2001',
      name: 'R2-D2',
      friends: [ '1000', '1002', '1003' ],
      appearsIn: [ 4, 5, 6 ],
      primaryFunction: 'Astromech',
    },
  },
  characters: function() { 
    return Object.assign({},
      droids,
      humans
    );
  },
}
