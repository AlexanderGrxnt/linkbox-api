const domain = String(window.location.origin);
let media = document.getElementsByClassName("media");
let linkArr;
let logoArr;
let profileURL;

// function fetchData(){
//     fetch(`${domain}/data`)
//     .then(response => {
//       return response.json();
//     }).then(data => {
//       // Work with JSON data here
//       profileURL = data.profileImg;
//       linkArr = data.linkArr;
//       logoArr = data.logoArr;
//       console.log(linkArr);
//       spreadURLs();
//     }).catch(err => {
//       // Do something for an error here
//       console.log("error");
//     });
    
//   }
  
//   fetchData();
  
  function spreadURLs(){
      let mediaArr = [...media];
      for(let i = 0; i < logoArr.length; i++){
        mediaArr[i].src = `${domain}/logos/${logoArr[i]}_logo.png`;
      }
      console.log(mediaArr[3].src);
  }
  