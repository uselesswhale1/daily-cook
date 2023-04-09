import generateId from '../shared/utils/generateId';

const comments = [
  {
    author: {
      name: 'Joe Johnson',
      uid: '',
      photoUrl: '#',
    },
    text: 'I liked this recipe a lot. Already cooked it twice, all my family enjoyed it a lot!! Thanks! =)) ',
    rating: 3,
    dateOfcreating: 'MON JUL 03 2022',
    id: generateId(),
  },
  {
    author: { name: 'Stan White', uid: '', photoUrl: '#' },
    text: 'I thought it was a facebook application, misswrote a comment, my apologie.It\'s wrote using React lol xD xD. 5 stars anyway!',
    rating: 4,
    dateOfcreating: 'SAT JUL 01 2022',
    id: generateId(),
  },
  {
    author: { name: 'Mike Tyson', uid: '', photoUrl: '#' },
    text: 'Man I take 3 of those after my fights, crazy dish!',
    rating: 5,
    dateOfcreating: 'TUE JUN 25 2022',
    id: generateId(),
  },
  {
    author: { name: 'Kate Peterson', uid: '', photoUrl: '#' },
    text: 'Idk it\'s too salted and chewy. Probably it\'s my fault, 3 stars.',
    rating: 3,
    dateOfcreating: 'FRI JUNL 28 2022',
    id: generateId(),
  },
];
