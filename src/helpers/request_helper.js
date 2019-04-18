class RequestHelper {

  constructor(url) {
    this.url = url;
  }

  get() {
    return fetch(this.url)
      .then(res => {
        if (res.status == "404") {
          return {
              message: "No breed"
          }
        }

        return res.json()
      })
  }

}

module.exports = RequestHelper;

// console.log(res.json())
