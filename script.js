//--------------------------facebook signin-------------------------

$(document).ready(function () {
	// add event listener on the login button

	$('#login').click(function () {
		facebookLogin();
	});

	function facebookLogin() {
		FB.getLoginStatus(function (response) {
			console.log(response);
			statusChangeCallback(response);
		});
	}

	$('#logout').click(function () {
		$('#logout').hide();
		$('#login').show();
		$('.f-container').empty();
		document.querySelector('.f-container').classList.remove('mystylef');
		facebookLogout();
	});

	function facebookLoginByDialog() {
		FB.login(
			function (response) {
				statusChangeCallback(response);
			},
			{ scope: 'public_profile,email,birthday' }
		);
	}

	const statusChangeCallback = function (response) {
		console.log(response);
		if (response.status === 'connected') {
			$('#login').hide();
			$('#logout').show();
			fetchUserProfile();
		} else {
			// Logging the user to Facebook by a Dialog Window
			facebookLoginByDialog();
		}
	};

	function fetchUserProfile() {
		console.log('Welcome!  Fetching your information.... ');
		FB.api('/me?fields=id,name,email,gender,picture', function (response) {
			console.log(response);
			console.log('Successful login for: ' + response.name);
			var fname = `Welcome ${response.name}`;
			var femail = `Your email is ${response.email}`;
			var fimage = `<img src="${response.picture.data.url}" alt="img" />`;
			$('.Fname').append(fname);
			$('.Femail').append(femail);
			$('.Fimage').append(fimage);
			document.querySelector('.f-container').classList.add('mystylef');
		});
	}

	function facebookLogout() {
		FB.logout(function (response) {
			console.log('User Loged out');
		});
	}
});

//---------------Google Signin----------------------

function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

	var gname = `Welcome ${profile.getName()}`;
	var gemail = `Your email is ${profile.getEmail()}`;
	var gimage = `<img src="${profile.getImageUrl()}" alt="img" />`;
	$('.Gname').append(gname);
	$('.Gemail').append(gemail);
	$('.Gimage').append(gimage);
	document.querySelector('.g-container').classList.add('mystyleg');

	$('#login1').hide();
	$('#logout1').show();
}

function signOut() {
	$('#logout1').hide();
	$('#login1').show();
	$('.g-container').empty();
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log('User signed out.');
		document.querySelector('.g-container').classList.remove('mystyleg');
	});
}
