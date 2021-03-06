

console.log("js found");

//PROFILE PIC
let profilePic = document.getElementById("profile-pic");
let profileModal = document.getElementsByClassName('profile-modal')[0];
let instagramBtn = document.getElementsByClassName('instagramM')[0];
let checkmark = document.getElementsByClassName('checkmark')[0];
const closePanel = document.getElementsByClassName('close-panel')[0];
let profileURL;
//CREATE DELETE BUTTONS
let links = document.getElementsByClassName("link");
const previewButton = document.getElementsByClassName('preview')[0];
const saveButton = document.getElementsByClassName('save')[0];
let deleteButtons = document.getElementsByClassName("delete-button");
//SET MEDIA LINKS
let media = document.getElementsByClassName("media");
let linkModal = document.getElementsByClassName('link-modal')[0];
let logoModal = document.getElementsByClassName('logo-modal')[0];
let linkSubmit = document.getElementsByClassName('link-submit')[0];
let logoSubmit = document.getElementsByClassName('logo-submit')[0];
let linkArr = new Array(6).fill(null);
let logoArr = ['facebook', 'Instagram', 'youtube', 'twitter', 'snapchat', 'gmail'];
let previewMode = false;
let currentMedia;
const domain = String(window.location.origin);
const saved = document.getElementsByClassName('saved')[0];

//GET PROFILE PIC
function getProfileInstagram() {
  let a = document.getElementById("userM").value;
  // validation for instagram usernames
  var regex = new RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/);
  var validation = regex.test(a);

  if (validation) {

    //GET URL
    
    let endpoint = `https://www.instagram.com/${a}/?__a=1`;

    fetch(endpoint)
      .then(response => response.json())
      .then(jsonData => {

        //console.log(jsonData.graphql.user.profile_pic_url_hd);
        profileURL = jsonData.graphql.user.profile_pic_url_hd;
        document.getElementById("profile-pic").src = profileURL;
        checkmark.style.display = 'inline-block';
      })
      .catch(err => alert('Username not found'));

    // VALIDATION FAILED
  } else {
    alert('The username is invalid');
    return;
  }
  
}

//PROFILE MODAL

function showProfileModal() {
  profileModal.style.visibility = 'visible';
  closePanel.style.visibility = 'visible';
  instagramBtn.addEventListener("click", getProfileInstagram);
  closePanel.addEventListener("click", hideProfileModal);
}

function hideProfileModal() {
  profileModal.style.visibility = 'hidden';
  closePanel.style.visibility = 'hidden';
  checkmark.style.display = 'none';
}

//END OF PROFILE MODAL

//CREATE DELETE BUTTONS
function createDeleteButtonIcon() {
  for (var j = 0; j < links.length; j++) {
    var createDeleteButton = document.createElement("i");
    createDeleteButton.classList.add("far", "fa-times-circle", "delete-button");
    links[j].appendChild(createDeleteButton);
  }
}

//CREATE EDIT BUTTONS
// function createEditButtonIcon() {
//   for (var j = 0; j < links.length; j++) {
//     var createEditButton = document.createElement("i");
//     createEditButton.classList.add("fas", "fa-edit", "edit-link");
//     links[j].appendChild(createEditButton);
//   }
// }

//PREVIEW CLICKED
function previewClicked() {
  previewMode = !previewMode;
  console.log(linkArr[5]);
  let colourPickers = document.getElementsByClassName("controls")[0];
  colourPickers.style.visibility = 'hidden';
  for (var j = 0; j < deleteButtons.length; j++) {
    //let domain = String(window.location.origin);
    let source = `${domain}/logos/add_logo.png`;
    let sibling = deleteButtons[j].previousElementSibling;
    let parent = deleteButtons[j].parentElement;

    if (sibling.src === source)
      sibling.src = "./logos/circle.png";
    else if (sibling.src === `${domain}/logos/circle.png`)
      sibling.src = "./logos/add_logo.png";

    if (deleteButtons[j].style.visibility !== 'hidden')
      deleteButtons[j].style.visibility = 'hidden';
    else {
      deleteButtons[j].style.visibility = '';
      colourPickers.style.visibility = '';
    }
  }
}
//END OF PREVIEW

//MEDIA MODAL
//createEditButtonIcon();
for (let i = 0; i < media.length; i++) {
  let mediaEvent = function (){
    showLinkModal(i);
  }
  media[i].addEventListener('click', mediaEvent, false);
}

function showLinkModal(i) {
  if(previewMode) return;

  //let domain = String(window.location.origin);
  let source = `${domain}/logos/add_logo.png`;
  currentMedia = i;
  if(media[i].src !== source){
      linkModal.style.visibility = 'visible';
      closePanel.style.visibility = 'visible';
      //let linkInput = document.getElementById("linkM");
      linkSubmit.addEventListener("click", 
        saveLink);
      closePanel.addEventListener("click", hideLinkModal);
  } else {
      logoModal.style.visibility = 'visible';
      closePanel.style.visibility = 'visible';
      closePanel.addEventListener("click", hideLinkModal);
      
      //let logoInput = document.getElementById("logoM");
      logoSubmit.addEventListener("click", 
        saveLogo
      );
  }
}

function hideLinkModal() {
  linkModal.style.visibility = 'hidden';
  logoModal.style.visibility = 'hidden';
  closePanel.style.visibility = 'hidden';
}

function saveLink(){
  let linkInput = document.getElementById("linkM");
  linkArr[currentMedia] = linkInput.value;
  hideLinkModal();
  linkInput.value = "";
  console.log(linkArr);
}

function saveLogo(){
  let logoInput = document.getElementById("logoM");
  logoArr[currentMedia] = logoInput.value;
  
  media[currentMedia].src = `${domain}/logos/${logoInput.value}_logo.png`
  hideLinkModal();
}
//END MEDIA MODAL 

//DELETE MEDIA
createDeleteButtonIcon();
for (let i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener('click', function(){
    deleteButtonClicked(i, this);
  }, false);
}

function deleteButtonClicked(linkNum, self) {
  self.previousElementSibling.addEventListener('animationend', deleteMedia);
  self.previousElementSibling.className += ' media-shake';
  linkArr[linkNum] = null;
  logoArr[linkNum] = 'add';
  //self.previousElementSibling.removeEventListener('click', mediaEvent);
}

function deleteMedia() {
  this.src = "./logos/add_logo.png";
  this.classList.remove("media-shake");
}
//END OF DELETE

//SAVE BUTTON
function saveClicked(){
  fetch(`${domain}/save`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profileAddress: profileURL,
        linkArr: linkArr,
        logoArr: logoArr
      })
  })
  .then(json => {
    console.log("fetched");
    saved.style.visibility = 'visible';
  })
  .then(setTimeout("saved.style.visibility = 'hidden'", 2000))
  
}

// function signOutClicked(){
//   console.log("signout");
//   fetch(`${domain}/signout`, {
//     method: 'post',
//     headers: { 'Content-Type': 'application/json' },
//     // body: JSON.stringify({
//     //   profileAddress: profileURL
//     // })
// })
// }


profilePic.addEventListener("click", showProfileModal);
checkmark.addEventListener("animationend", hideProfileModal);
previewButton.addEventListener("click", previewClicked);
saveButton.addEventListener("click", saveClicked);


function fetchData(){
  fetch(`${domain}/data`)
  .then(response => {
    return response.json();
  }).then(data => {
    // Work with JSON data here
    profileURL = data.profileImg;
    linkArr = data.linkArr;
    logoArr = data.logoArr;
    console.log(logoArr);
    spreadURLs();
  }).catch(err => {
    // Do something for an error here
    console.log("error");
  });
  
}

fetchData();

function spreadURLs(){
    let mediaArr = [...media];
    for(let i = 0; i < logoArr.length; i++){
      mediaArr[i].src = `${domain}/logos/${logoArr[i]}_logo.png`;
    }
    console.log(mediaArr[3].src);
}

function copyURL() {
  /* Get the text field */
  var copyText = document.getElementById("urlBar");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");

}
