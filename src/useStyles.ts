import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  myBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  link: {
    p: 0,
    textDecoration: 'none',
    color: '#212121',
  },
  mdFont: {
    fontSize: '99rem',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  CardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  myContentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 4fr)',
    gridTemplateRows: '60px 12fr',
  },
  myContentSearchbar: {
    ml: 2, pr: 4, minWidth: '100%',
  },
  myContentGridItem1: {
    gridArea: '1 / 1 / 2 / 12',
  },
  myContentGridItem2: {
    gridArea: '2 / 1 / 3 / 12',
  },
  myContentGridItem3: {
    gridArea: '3 / 1 / 12 / 12',
  },
});

export default useStyles;
