const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

class Dogs {
  constructor() {
    this.data = [];
  };

  getDogs() {
    PubSub.subscribe('BreedFormView:form-submitted', (event) => {
      const inputText = event.detail;
      const url = `https://dog.ceo/api/breed/${inputText}/images`;
      console.log(url);
      const requestHelper = new RequestHelper(url);
      requestHelper.get()
        .then(data => {
          if (data.message === "No breed") {
            document.querySelector('#dog-container').textContent = data.message;
          } else {
            PubSub.publish('Dogs:dog-data-loaded', data.message);
          };
        })
        .catch(message => {
          console.error(message);
          console.log('XXXXX');
          document.querySelector('#dog-container').textContent = "XXXX";
      });
    });
  };

};

module.exports = Dogs;
