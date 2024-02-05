let secureDb: { set?: any; get?: any };
if (typeof window === "undefined") {
  secureDb = require("secure-db");
} else {
  secureDb = {};
}
// const BrowserFS = require('browserfs');
// BrowserFS.configure({ fs: 'InMemory' }, function(err) {
//   if (err) throw err;
//   const fs = BrowserFS.BFSRequire('fs');
// });

export const setTokenToLocalDb = (token: string) => {
  if (secureDb) {
    secureDb.set("User.token", token);
  }
};

export const getTokenFromLocalDb = () => {
  return secureDb ? secureDb.get("User.token") : null;
};

export const setIdToLocalDb = (userId: string) => {
  if (secureDb) {
    secureDb.set("User.id", userId);
  }
};

export const getIdFromLocalDb = () => {
  return secureDb ? secureDb.get("User.id") : null;
};
