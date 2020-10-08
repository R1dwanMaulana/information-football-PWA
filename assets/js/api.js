import {showStandingsAll, showTeam} from "./show.js"
const API_KEY = '3f8fba7c7b7d4b97b994182cfe8b46c6';
const BASE_URL = 'https://api.football-data.org/v2/';

const Endpoint_Ing = `${BASE_URL}competitions/2021/standings`;
const Endpoint_Jer = `${BASE_URL}competitions/2002/standings`;
const Endpoint_Spn = `${BASE_URL}competitions/2014/standings`;
const Endpoint_Prc = `${BASE_URL}competitions/2015/standings`;

 
function preload(){
	document.getElementById("preloadx").innerHTML = `
	<center>
	<div class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
	  </div> 

	  <div class="spinner-layer spinner-red">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
	  </div>

	  <div class="spinner-layer spinner-yellow">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-green">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
	  
	</center>
	  `
}
function removePrelaod() {
	document.getElementById("preloadx").innerHTML = ""
}
const fetchAPI = (url) => {
	return fetch(url, {
		headers: {
			'X-Auth-Token': "3f8fba7c7b7d4b97b994182cfe8b46c6",
		},
	})
		.then((res) => {
			if (res.status !== 200) {
				console.log('Error: ' + res.status);
				
				return Promise.reject(new Error(res.statusText));
			} else {
				return Promise.resolve(res);
			}
		})
		.then((res) => res.json())
		.catch((err) => {
			console.log(err);
		});
};

function getStandingsIng() {
	preload()
	if ('caches' in window) {
		caches.match('https://api.football-data.org/v2/competitions/2021/standings').then(function (response) {
			if (response) {
				response.json().then(function (data) {
					console.log('Competition Data: ' + data);
					removePrelaod()
					showStandingsAll(data);
				});
			}
		});
	}

	fetchAPI('https://api.football-data.org/v2/competitions/2021/standings')
		.then((data) => {
			if(data) {
				removePrelaod()
			}
			showStandingsAll(data);
		})
		.catch((error) => {
			console.log(error);
			
		});
}

function getStandingsPrc() {
	preload()
	if ('caches' in window) {
		caches.match('https://api.football-data.org/v2/competitions/2015/standings').then(function (response) {
			if (response) {
				response.json().then(function (data) {
					console.log('Competition Data: ' + data);
					removePrelaod()
					showStandingsAll(data);
				});
			}
		});
	}

	fetchAPI('https://api.football-data.org/v2/competitions/2015/standings')
		.then((data) => {
			if(data) {
				removePrelaod()
			}
			showStandingsAll(data);
		})
		.catch((error) => {
			console.log(error);
			
		});
}
function getStandingsSpn() {
	preload()
	if ('caches' in window) {
		caches.match('https://api.football-data.org/v2/competitions/2014/standings').then(function (response) {
			if (response) {
				response.json().then(function (data) {
					console.log('Competition Data: ' + data);
					removePrelaod()
					showStandingsAll(data);
				});
			}
		});
	}

	fetchAPI('https://api.football-data.org/v2/competitions/2014/standings')
		.then((data) => {
			if(data) {
				removePrelaod()
			}
			showStandingsAll(data);
		})
		.catch((error) => {
			console.log(error);
		
		});
}

function getStandingsJer() {
	preload()
	if ('caches' in window) {
		caches.match('https://api.football-data.org/v2/competitions/2002/standings').then(function (response) {
			if (response) {
				response.json().then(function (data) {
					console.log('Competition Data: ' + data);
					removePrelaod()
					showStandingsAll(data)
				});
			}
		});
	}

	fetchAPI('https://api.football-data.org/v2/competitions/2002/standings')
		.then((data) => {
			if(data) {
				removePrelaod()
			}
			showStandingsAll(data)
		})
		.catch((error) => {
			console.log(error);
		
		});
}

	// ketikaa team dari standings di pencet maka jalankan fungsi  ini
	// nanti prameter id ambil dari href nya juga...
function getAllTeam(id) {
	const url = `${BASE_URL}teams/${id}`;
	preload()
	if ('caches' in window) {
		caches.match(url).then(function (response) {
			if (response) {
				response.json().then(function (team) {
					// Ini fungsi Untuk show team nantinya
					removePrelaod()
					showTeam(team);
				});
			}
		});
	}

	fetchAPI(url)
		.then((team) => {
			if(team) {
				removePrelaod()
			}
			showTeam(team);
		})
		.catch((error) => {
			console.log(error);
		});
}

export { getAllTeam, getStandingsIng, getStandingsPrc, getStandingsSpn, getStandingsJer, preload, removePrelaod}
