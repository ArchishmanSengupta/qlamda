import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Loader() {
  return (
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '5rem' }} />
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="rectangular" width={770} height={200} />
      <Skeleton variant="rectangular" width={770} height={200} />
      <Skeleton variant="rectangular" width={770} height={200} />
      {/* <Skeleton variant="rounded" width={770} height={200} /> */}
    </Stack>
  );
}