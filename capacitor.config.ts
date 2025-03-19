
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.da8600a0eebc4182a39a8d3ac6c4df16',
  appName: 'Rep Reckoner',
  webDir: 'dist',
  server: {
    url: 'https://da8600a0-eebc-4182-a39a-8d3ac6c4df16.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always'
  },
  android: {
    backgroundColor: '#121212'
  }
};

export default config;
