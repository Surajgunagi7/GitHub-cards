const button = document.querySelector("#btn");
const card = document.querySelector('.github-card');
const info = document.querySelector('.info');

button.addEventListener("click", () => {
  let GitHubUserName = document.querySelector("#GitHubId").value;
  let requestUrl = "https://api.github.com/users/" + GitHubUserName;
  makeApiCall(requestUrl);
});

function makeApiCall(requestUrl) {
    // Using the legacy methods (AJAX)
  // let XHR = new XMLHttpRequest();

  // XHR.onreadystatechange = function () {
  //   if (XHR.readyState === 4 && XHR.status === 200) {
  //     let response = JSON.parse(this.responseText);
  //     updateFieldValues(response);
  //   }
  // };
  // XHR.open("GET", requestUrl);
  // XHR.send();

  // Using Fetch Api
  fetch(requestUrl)
  .then((response) => {
      return response.json()
  }) 
  .then((data) => {
      updateFieldValues(data);
  })
  .catch((error) => {
      console.log(error)
  })
}

function updateFieldValues(response) {
  document.querySelector('.github-card img').src = response.avatar_url;
  document.querySelector('.github-card img').alt = 'Profile Image';

  document.getElementById('name').innerText = response.name || 'N/A';
  document.getElementById('username').innerText = response.login || 'N/A';
  document.getElementById('bio').innerText = response.bio || 'N/A';
  document.getElementById('twitter').innerText = response.twitter_username || 'N/A';
  document.getElementById('followers').innerText = response.followers || 'N/A';
  document.getElementById('following').innerText = response.following || 'N/A';
  document.getElementById('repo').innerText = response.public_repos || 'N/A';
  document.getElementById('location').innerText = response.location || 'N/A';
  document.getElementById('viewProfile').href = response.html_url;

  card.style.display = 'flex';
  document.getElementById('capture-btn').style.display = 'inline-block';
}

document.getElementById('capture-btn').addEventListener('click', function() {
  const element = document.querySelector('.container');
  html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'github-card.png';
      link.click();
  });
});