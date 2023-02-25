import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'EssiviApp',
  webDir: 'www',
  bundledWebRuntime: false,
  cordova : {
    accessOrigins : ["*"],
  }, 
  server : {
    cleartext : true
  },
  plugins : {
    CapacitorHttp : {
      enabled : false
    }
  }
};

export default config;
