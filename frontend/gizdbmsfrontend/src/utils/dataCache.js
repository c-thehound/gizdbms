class DataCache {
    cache = {};
  
    getData(url) {
      // Returns a promise for
      let result = this.cache[url];
      if (result) {
        if (result.then) {
          // Request is already in flight, just return this promise, we don't need to do anything else
          console.debug("Request already in flight for ", url);
          return result;
        } else {
          // We already have the data, wrap it in a resolved promise so the component can't
          // tell the difference
          let promise = new Promise(function(resolve, reject) {
            resolve(result);
          });
          console.debug("Returning cached copy for ", url);
          return promise;
        }
      } else {
        // We don't have the data in the cache, we need to request it.
        let promise = fetch(url).then(res => res.json());
        console.debug("Fetching ", url);
        this.cache[url] = promise;
        promise.then(res => {
          this.cache[url] = res;
          return res;
        });
        return promise;
      }
    }
}
  
let dataCache = new DataCache();
  
export { dataCache };