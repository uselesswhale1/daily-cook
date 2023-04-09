import React, { useState } from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { NutritionAnalysis, NutritionAnalysisElem } from '../interfaces';

export default function NutritionListItem({ nutritionAnalysis }: any) {
  const [nutritions] = useState<NutritionAnalysis>(nutritionAnalysis);
  const nutritionElems = Object.entries(nutritions).filter(([key]) => key !== 'calories');
  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '8em',
          height: '8em',
          border: '2px solid gray',
          borderRadius: '100%',
          m: 2,
        }}
      >
        <Typography variant="h4">
          {nutritions.calories.quantity}
        </Typography>
        <Typography variant="h5">
          {nutritions.calories.label}
        </Typography>
      </Box>
      {nutritionElems
        ? nutritionElems.map(
          ([nutritionName, nutritionVal]: [string, NutritionAnalysisElem]) => (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '8em',
                height: '8em',
                border: '2px solid gray',
                borderRadius: '100%',
                m: 2,
              }}
              key={nutritionName}
            >
              <Typography variant="h6">
                {nutritionVal.label}
              </Typography>
              <Typography variant="body1">
                {nutritionVal.quantity}{nutritionVal.unit} {nutritionName}
              </Typography>
            </Box>
          ),
        )
        : null}
    </Box>
  );
}
