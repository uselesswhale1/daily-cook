interface SortingItem {
  key: string,
  value: string,
}

export const sortingOptions: SortingItem[] = [
  { key: 'RM', value: 'Most rated' },
  { key: 'NAZ', value: 'Name (asc)' },
  { key: 'NZA', value: 'Name (desc)' },
  { key: 'MN', value: 'Most nutritious' },
  { key: 'LN', value: 'Less nutritious' },
];

export default sortingOptions;
