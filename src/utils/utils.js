export const pathGet = function (arr1, query) {
  // TASK 1:
  // Write a function that searches through the input array / object
  // and returns the appropriate string path leading to the input query, if found
  // Example:
  // const a = {
  //    user: {
  //      id: 1,
  //      name: {
  //        firstName: "James",
  //        lastName: "Ibori"
  //      },
  //      location: {
  //        city: "Ikoyi",
  //        state: "Lagos",
  //        address: "One expensive house like that"
  //      }
  //    }
  // }
  // `pathGet(a, 'Lagos')` = "a.user.location.state"
  // `pathGet(a, 'James')` = "a.user.name.firstName"

  // ============== CODE GOES BELOW THIS LINE :) ==============
  function search(obj, query) {
    // let path = ""
    if (obj) {
      for (let i = 0, n = Object.keys(obj); i < n.length; i++) {
        if (typeof obj[n[i]] === "object") {
          let result = search(obj[n[i]], query);
          if (result) {
            return n[i] + "." + result;
          }
        } else if (query == obj[n[i]]) {
          return n[i];
        }
      }
    }
    return "";
    // return path;
  }

  // let result = arr1.map(provider => {provider.id: search(provider, query)});
  let result = arr1.map(function (provider) {
    let visible = search(provider, query) == null ? false : true;
    return {
      id: provider.user.id,
      visible,
    };
  });
  return result;
};

// const a = [
//   {
//     user: {
//       id: 1,
//       name: {
//         firstName: "James",
//         lastName: "Ibori",
//       },
//       location: {
//         city: "Ikoyi",
//         state: "Lagos",
//         address: "One expensive house like that",
//       },
//     },
//   },
//   {
//     user: {
//       id: null,
//       name: {
//         firstName: "Jonas",
//         lastName: "Ibori",
//       },
//       location: {
//         city: "Ikoyi",
//         state: "Lagos",
//         address: "One expensive house like that",
//       },
//     },
//   },
// ];
// console.log(pathGet(a, "Jonas"));
