import React from 'react';
import { Typography, Divider } from '@mui/material';

function MotivationFoodQuote() {
  const quotes = [
    ['John Gunther', 'All happiness depends on a leisurely breakfast.'],
    ['Paul Prudhomme', 'You don\'t need a silver fork to eat good food.'],
    ['Coco Chanel', 'I only drink Champagne on two occasions, when I am in love and when I am not.'],
    ['Barbara Johnson', 'A balanced diet is a cookie in each hand.'],
    ['Julia Child', 'People who love to eat are always the best people.'],
    ['Anna Thomas', 'We all eat, an it would be a sad waste of opportunity to eat badly.'],
    ['Voltaire', 'Ice cream is exquisite.What a pity it isn\'t illegal.'],
    ['Julia Child', 'The only time to eat diet food is while you\'re waiting for the steak to cook.'],
    ['Irish Proverb', 'Laughter is brightest where food is best.'],
    ['Federico Fellini', 'Life is a combination of magic and pasta.'],
    ['Virginia Woolf', 'One cannot think well, love well, sleep well, if not has not dined well.'],
  ];
  const randNumOfQuote = Math.floor(Math.random() * quotes.length);
  const randQuote = quotes[randNumOfQuote];
  return (
    <div>
      {!quotes.length
        ? null
        : (
          <>
            <Divider sx={{ mt: 2 }} />
            <Typography variant="body1" sx={{ fontStyle: 'italic' }} align="left">
              {randQuote[0]}: <br />&quot;{randQuote[1]}&quot;
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </>
        )}
    </div>
  );
}

export default React.memo(MotivationFoodQuote);
