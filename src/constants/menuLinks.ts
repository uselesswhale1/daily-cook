import generateId from '../shared/utils/generateId';

const menuLinks = [
  {
    linkURL: 'feed',
    listText: 'User Feeds',
    linkId: generateId(),
    isDisabled: false,
  },
  {
    linkURL: 'saved',
    listText: 'Saved Recipes',
    linkId: generateId(),
    isDisabled: false,
  },
  {
    linkURL: 'list',
    listText: 'Shopping List',
    linkId: generateId(),
    isDisabled: false,
  },
];

export function getLinks() {
  return menuLinks;
}

export default {
  getLinks,
};
