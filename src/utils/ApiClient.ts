export const DEFAULT_OPTS = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  credentials: "include" as RequestCredentials,
};

export default class ApiClient {
  get = (url: string, opts = {}) => this.fetch(url, { ...opts, method: "GET" });
  post = (url: string, opts = {}) =>
    this.fetch(url, { ...opts, method: "POST" });
  put = (url: string, opts = {}) => this.fetch(url, { ...opts, method: "PUT" });
  patch = (url: string, opts = {}) =>
    this.fetch(url, { ...opts, method: "PATCH" });
  del = (url: string, opts = {}) =>
    this.fetch(url, { ...opts, method: "DELETE" });

  fetch = (url: string, customOpts: Object) =>
    new Promise((resolve, reject) => {
      const opts = { ...DEFAULT_OPTS, ...customOpts };

      window
        .fetch(url, opts)
        .then(async (res) => {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            if (res.status === 204) {
              return {
                response: res,
                body: null,
              };
            }

            const jsonResponse = await res
              .json()
              .then((json) => ({ response: res, body: json }));

            return res.ok
              ? Promise.resolve(jsonResponse)
              : Promise.reject(jsonResponse);
          }

          const textResponse = res
            .text()
            .then((text) => ({ response: res, body: text }));
          return res.ok
            ? Promise.resolve(textResponse)
            : Promise.reject(textResponse);
        })
        .then(resolve, reject);
      // .catch(err => {
      //   ErrorHandler.error(`** API request failed for ${url}:`, err)
      //   return reject({ response: err })
      // })
    });
}
