console.log("js found");
let profilePic = document.getElementById("profile-pic");
let profileModal = document.getElementsByClassName('profile-modal')[0];
let instagramBtn = document.getElementsByClassName('instagramM')[0];
let checkmark = document.getElementsByClassName('checkmark')[0];
const closePanel = document.getElementsByClassName('close-panel')[0];


function inputLength(){
	return input.value.length;
}

function getProfileInstagram(a) {
  //profileModal.style.visibility = 'hidden';
  //closePanel.style.visibility = 'hidden';
  
  //a = "alexander.grxnt";
  // validation for instagram usernames
  var regex = new RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/);
  var validation = regex.test(a);

  if (validation) {
    
    //GET URL
    //let a = "alexander.grxnt";
    let profileURL;
    let endpoint = `https://www.instagram.com/${a}/?__a=1`;

    fetch(endpoint)
      .then(response => response.json())
      .then(jsonData => {

        console.log(jsonData.graphql.user.profile_pic_url_hd);
        profileURL = jsonData.graphql.user.profile_pic_url_hd;
        document.getElementById("profile-pic").src=profileURL;  
      })
      .catch(err => alert('Username not found'));

          
    // VALIDATION FAILED
  } else {
    alert('The username is invalid');
    return;
  }
  checkmark.style.display = 'inline-block';

}

function showProfileModal(){
  profileModal.style.visibility = 'visible';
  closePanel.style.visibility = 'visible';
  let usernameInput = document.getElementById("userM");
  instagramBtn.addEventListener("click", function(){
     getProfileInstagram(usernameInput.value);
  }, false);
  closePanel.addEventListener("click", hideProfileModal);
  
}

function hideProfileModal(){
  profileModal.style.visibility = 'hidden';
  closePanel.style.visibility = 'hidden';
  checkmark.style.display = 'none';
}



//getPhoto("alexander.grxnt");

profilePic.addEventListener("click", showProfileModal);
checkmark.addEventListener("animationend", hideProfileModal);

