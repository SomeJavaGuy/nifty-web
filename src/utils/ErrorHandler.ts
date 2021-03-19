const ErrorHandler = {
  error(msg: string, options: any) {
    if (console.error) {
      console.error(`# APP ERROR: ${msg}`, options);
    } else {
      console.log(`# APP ERROR: ${msg}`, options);
    }
  },

  warn(msg: string, options: any) {
    if (console.warn) {
      console.warn(`# APP WARNING: ${msg}`, options);
    } else {
      console.log(`# APP WARNING: ${msg}`, options);
    }
  },

  log(msg: string, options: any) {
    console.log(`# APP LOG: ${msg}`, options);
  },

  trace(msg: string, options: any) {
    if (console.trace) {
      console.trace(`# APP TRACE: ${msg}`, options);
    } else {
      console.log(`# APP TRACE: ${msg}`, options);
    }
  },
};

export default ErrorHandler;
