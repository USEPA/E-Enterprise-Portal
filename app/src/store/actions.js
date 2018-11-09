import { AppAxios, commonAppStore } from '../modules/wadk/WADK';

export default {
  ...commonAppStore.actions,
  createLocationRequest(context, location) {
    // Variable declerations
    const store = context;
    let zipcode = false;
    let url = store.state.url;

    // Input validation for URL formation
    if (/^\d{5}(-\d{4})?$/.test(location)) {
      url += 'zipcode=' + location;
      zipcode = true;
    } else if (/([A-Za-z]+(?: [A-Za-z]+)*),? ([A-Za-z]{2})/.test(location)
      || /([A-Za-z]+(?: [A-Za-z]+)*),?([A-Za-z]{2})/.test(location)) {
      const decoupled_location = location.split(",");
      url += 'city=' +
        decoupled_location[0].toUpperCase().trim() +
        '&state=' + decoupled_location[1].toUpperCase().trim();
    }
    console.log(url);

    // AppAxios.get(url).then((response) => {
    //   if (zipcode) {
    //
    //     store.commit();
    //   }
    //
    // });


    // Axios GET call that retrieves the JSON for a given zip code or city and state


  },
};
