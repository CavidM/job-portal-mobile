import React from 'react';
import Svg, { Path } from 'react-native-svg';
import normalize from '../../pages/common/styles/normalize';

function LookingForEmployeeIcon({ pathProps }) {
  return (
    <Svg
      width={normalize(50)}
      height={normalize(57)}
      viewBox="0 0 50 57"
      fill="none"
    >
      <Path
        d="M34.289 6.843A2.74 2.74 0 0031.54 9.59a2.74 2.74 0 002.748 2.748c1.553 0 2.748-1.195 2.748-2.748a2.74 2.74 0 00-2.748-2.748zM0 49.615v7.288h32.318v-7.288c0-4.42-3.405-7.826-7.826-7.826H7.885C3.644 41.79 0 45.254 0 49.615zM16.13 38.563c4.958 0 9.02-4.062 9.02-9.02 0-4.958-4.062-9.02-9.02-9.02-4.958 0-9.02 4.062-9.02 9.02.06 4.958 4.061 9.02 9.02 9.02zM37.276 39.877c3.942 0 7.048-3.226 7.048-7.049 0-3.823-3.225-7.049-7.048-7.049-3.943 0-7.05 3.226-7.05 7.05 0 3.822 3.107 7.048 7.05 7.048zM43.786 42.506H31.6c2.03 1.732 3.285 4.36 3.285 7.228l.299 7.168h14.815v-8.244c0-3.464-2.748-6.152-6.213-6.152z"
        fill="white"
        {...pathProps}
      />
      <Path
        d="M45.28 7.918c-1.494-5.675-7.228-9.02-12.903-7.587-5.616 1.494-9.02 7.288-7.527 12.963a10.569 10.569 0 004.54 6.213l-2.748 4.241 11.17-2.927c5.616-1.493 8.961-7.288 7.468-12.903zm-6.034 7.049c-.12.18-.358.239-.537.239-.24 0-.419-.06-.538-.24l-1.732-1.672c-.657.359-1.374.598-2.15.598a4.283 4.283 0 01-4.302-4.301 4.283 4.283 0 014.301-4.301 4.283 4.283 0 014.301 4.3 4.215 4.215 0 01-.956 2.689l1.554 1.553a.73.73 0 01.239.537c.06.24-.06.419-.18.598z"
        fill="white"
        {...pathProps}
      />
    </Svg>
  );
}

export default LookingForEmployeeIcon;
