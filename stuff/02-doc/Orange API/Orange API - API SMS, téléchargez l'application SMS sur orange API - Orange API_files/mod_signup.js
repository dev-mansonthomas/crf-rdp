/**
 * @author hgrx4427
 */
// Patch for defect N331
// On loading the screen, this function will initialise all input fields
// with the properties "onkeypress" and "onkeydown"
function popupcentree(page, largeur, hauteur, options)
{
	 var top = (screen.height-hauteur)/2;
	 var left = (screen.width-largeur)/2;
	 largeur += 2;
	 hauteur += 4;
	 window.open(page, 'cgu', "top=" + top + ",left=" + left + ",width=" + largeur + ",height=" + hauteur + "," + options);
}

function load_hide_errors() {
	var fields = document.getElementsByTagName('input');
	for (var i = 0; i < fields.length; i++) {
	    fields[i].onkeypress = hide_error;
	    fields[i].onkeydown = hide_error;

	    if (fields[i].getAttribute("tabindex") == '1' && !(fields[i].offsetHeight  == 0)){
		
		fields[i].focus(); // focus on the 1st field
	    }
	}

	// show the error message if the variable is set
    if (typeof error != 'undefined' && error){
		switch_visibility("error");
    }
}

window.onload = load_hide_errors;

// auto-hide error messages when filling the form (see function
// load_hide_errors)
function hide_error() {
    $$('#error span').each(function(item){
	item.removeClass('errorShow');
	item.addClass('errorPart');
    })
}

// check the email format
function check_email(email) {
    var modele = /^[a-z0-9\-_\.]+@[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+\.[a-z]{2,5}$/i;
    if (modele.test(email))
	return true;
    return false;
}

// check the password
function check_password(password) {
    // verification that caracters in password are between code octal ASCII
    // 21-7E in hexa without <,>,&,",' characters
    var modele = /^[\x21\x23-\x25\x28-\x3B\x3D\x3F-\x7E]+$/i;
    if (modele.test(password))
	return true;
    return false;
}

// check the url format
function check_url(argvalue) {
	if (argvalue.indexOf(" ") != -1)
		return false;
	else if (argvalue.indexOf("http://") == -1
			&& argvalue.indexOf("https://") == -1)
		return false;
	else if (argvalue == "http://" || argvalue == "https://")
		return false;
	else if (argvalue.indexOf("http://") > 0)
		return false;

	argvalue = argvalue.substring(7, argvalue.length);
	if (argvalue.indexOf(".") == -1)
		return false;
	else if (argvalue.indexOf(".") == 0)
		return false;
	else if (argvalue.charAt(argvalue.length - 1) == ".")
		return false;

	if (argvalue.indexOf("/") != -1) {
		argvalue = argvalue.substring(0, argvalue.indexOf("/"));
		if (argvalue.charAt(argvalue.length - 1) == ".")
			return false;
	}

	if (argvalue.indexOf(":") != -1) {
		if (argvalue.indexOf(":") == (argvalue.length - 1))
			return false;
		else if (argvalue.charAt(argvalue.indexOf(":") + 1) == ".")
			return false;
		argvalue = argvalue.substring(0, argvalue.indexOf(":"));
		if (argvalue.charAt(argvalue.length - 1) == ".")
			return false;
	}
	return true;
}

function hide(obj) {
	obj.style.display = 'none';
	obj.style.visibility = 'hidden';
}

var always_show = false;

// / -----
// / switch_visibility
// /
// / Change a div visibility
function show_Error(div){
	//alert(div);
	document.id(div).removeClass('errorPart');
	document.id(div).addClass('errorShow');
}

function switch_visibility(div) {
    if(!document.getElementById(div)){
	return;
    }
    if (document.getElementById(div).style.display != 'block' || always_show) {
	try{
	    document.getElementById(div).style.display = 'table-cell';
	}catch(e){
	    document.getElementById(div).style.display = 'block';
	}
	document.getElementById(div).style.visibility = 'visible';
    } else {
	hide(document.getElementById(div));
    }
}
function updatecaptcha(){
    document.id("imgcaptcha").fade('hide');
    var url = document.id("imgcaptcha").get('src');
	//alert("update:"+url);
    var timestamp = new Date().getTime();

    document.id("imgcaptcha").set('src', url+"&"+timestamp);
    document.id("imgcaptcha").fade('show');
}
function validate_form_signin() {
	hide_error();
	always_show = true;

	if (!document.forms.signin.login.value) {
		show_Error('missinglogin')
		switch_visibility('error');
		document.forms.signin.login.focus();
		return false;
	}
	if (!check_email(document.forms.signin.login.value)) {

		show_Error('badlogin');
		switch_visibility('error');
		document.forms.signin.login.focus();
		return false;

	}
	if (!document.forms.signin.password.value) {
		show_Error('missingpassword');
		switch_visibility('error');
		document.forms.signin.password.focus();
		return false;
	}
	if (!check_password(document.forms.signin.password.value)) {
		show_Error('badpassword');
		switch_visibility('error');
		document.forms.signin.password.focus();
		return false;
	}
	if (document.forms.signin.password.value.length < 6
			|| document.forms.signin.password.value.length > 20) {
		show_Error('limitationpassword');
		switch_visibility('error');
		document.forms.signin.password.focus();
		return false;
	}

	always_show = false;

	switch_visibility('valid_button');
	switch_visibility('wait_message');

	document.forms.signin.submit();

	//submitSignin();
}

function validate_form_signup() {
	hide_error();
	always_show = true;

	if (!document.forms.signup.cp_email.value) {
		show_Error('missingcpemail');
		switch_visibility('error');
		document.forms.signup.cp_email.focus();
		return false;
	}
	if (!check_email(document.forms.signup.cp_email.value)) {
		show_Error('badcpemail');
		switch_visibility('error');
		document.forms.signup.cp_email.focus();
		return false;
	}
	if (!document.forms.signup.password.value) {
		show_Error('missingpassword');
		switch_visibility('error');
		document.forms.signup.password.focus();
		return false;
	}
	if (!check_password(document.forms.signup.password.value)) {
		show_Error('badpassword');
		switch_visibility('error');
		document.forms.signup.password.focus();
		return false;
	}
	if (document.forms.signup.password.value.length < 6
			|| document.forms.signup.password.value.length > 20) {
		show_Error('limitationpassword');
		switch_visibility('error');
		document.forms.signup.password.focus();
		return false;
	}
	if (document.forms.signup.password.value != document.forms.signup.confirmpassword.value) {
		show_Error('diffpassword');
		switch_visibility('error');
		document.forms.signup.confirmpassword.focus();
		return false;
	}
	if (!document.forms.signup.sp_tosAgreed.checked) {
		show_Error('missingsptosagreed');
		switch_visibility('error');
		document.forms.signup.sp_tosAgreed.focus();
		return false;
	}

	always_show = false;

	switch_visibility('valid_button');
	switch_visibility('wait_message');
	switch_visibility('back');

    document.id("signup").submit();
}

function validate_form_forgot_pwd_send() {
	hide_error();
	always_show = true;

	if (!document.forms.forgot_pwd_send.login.value) {
		show_Error('missinglogin', true);
		switch_visibility('error');
		document.forms.forgot_pwd_send.login.focus();
		return false;
	}
	if (!check_email(document.forms.forgot_pwd_send.login.value)) {
		show_Error('badlogin')
		switch_visibility('error');

		document.forms.forgot_pwd_send.login.focus();
		return false;
	}

	always_show = false;

	// hide the button and display a message
	switch_visibility('valid_button');
	switch_visibility('wait_message');
	switch_visibility('back');

	document.forms.forgot_pwd_send.submit();
}

function reset_form_pwd_send(error) {
	switch_visibility('forgot_pwd_expl_2');

	if (!error || error == '0')
		switch_visibility('forgot_pwd_success');
	// else
	// switch_visibility('forgot_pwd_error');
}

function validate_form_forgot_pwd_reset() {
	hide_error();
	always_show = true;

	if (!document.forms.forgot_pwd_reset.password.value) {
		show_Error('missingpassword');
		switch_visibility('error');
		document.forms.forgot_pwd_reset.password.focus();
		return false;
	}
	if (document.forms.forgot_pwd_reset.password.value.length < 6
			|| document.forms.forgot_pwd_reset.password.value.length > 20) {
		show_Error('limitationpassword');
		switch_visibility('error');
		document.forms.forgot_pwd_reset.password.focus();
		return false;
	}
	if (!check_password(document.forms.forgot_pwd_reset.password.value)) {
		show_Error('specialcharactersfoundinpassword');
		switch_visibility('error');
		document.forms.forgot_pwd_reset.password.focus();
		return false;
	}
	if (document.forms.forgot_pwd_reset.password.value != document.forms.forgot_pwd_reset.confirmpassword.value) {
		show_Error('diffpassword');
		switch_visibility('error');
		document.forms.forgot_pwd_reset.confirmpassword.focus();
		return false;
	}

	always_show = false;

	switch_visibility('valid_button');
	switch_visibility('wait_message');

	document.forms.forgot_pwd_reset.submit();
}

function show_openid_form() {
	switch_visibility('idp_list');
	switch_visibility('openid_form');
	document.forms[0].openid_url.focus();
}

function choose_idp(url_redirect, openid) {
	if (openid) {
		always_show = true;

		if (document.forms.signin.openid_url.value) {
			if (!check_url(document.forms.signin.openid_url.value)) {
				show_Error('url_fail');
				switch_visibility('error');
				document.forms.signin.openid_url.focus();
				return;
			} else
				url_redirect += '&openid_url='
						+ document.forms.signin.openid_url.value;
		} else {
			show_Error('url_empty');
			switch_visibility('error');
			document.forms.signin.openid_url.focus();
			return;
		}
	}

	always_show = false;

	if (openid) {
		switch_visibility('valid_button2');
		switch_visibility('wait_message2');
		switch_visibility('back');
	}

	parent.location = url_redirect;
}

// -- function which USE jQuery --//
function closeSignin() {
    document.id("signinBox").addClass("ghide");
    if(document.id("signupBox")){
	document.id("signupBox").fade("hide");
	document.id("signupBox").dispose();
    }
}

function openDialog(elt){
    elt.setStyles({
	position:'fixed',
	zIndex:99999,
	top:0,
	left:'150px'});
    document.body.grab(elt);
}

function signupBoxOpen(url){
    var signupBox = document.id('signupBox');
    if(!signupBox){
	signupBox = new Element('div');
	signupBox.set('id', 'signupBox');
	document.id('globalApizone').grab(signupBox);
    }
    if(url){
	signupBox.load(url);
    }
    openDialog(signupBox);
}


function signup(){
    signupBoxOpen("/modules/mod_signup/tmpl/register.php");
}


function signupCampaign() {
    signupBoxOpen("/modules/mod_signup/tmpl/register.php?campaign=1");
}

function signin() {
    document.id("signinBox").removeClass("ghide");
    openDialog(document.id("signinBox"));
}

function backToSignin() {
	document.id("signinBox").removeClass("ghide");
	document.id("signupBox").dispose();
    openDialog(document.id("signinBox"));
	
}

function reset(token)
{
    signupBoxOpen("/modules/mod_signup/tmpl/reset.php?token="+token);
}

function validReset()
{
    signupBoxOpen("/modules/mod_signup/tmpl/reset.php?validate=success");
}

function signout() {
    new Request({
	url:"/modules/mod_signup/tmpl/control.php",
	onSuccess:function(data){
	location.href = data;
    }}).send("task=logout");
}

function confirmsignup(message){
    signupBoxOpen();
}

function resetPassword(){
    signupBoxOpen("/modules/mod_signup/tmpl/password.php");
}


function submitSignin() {
    document.id('signin').set('send', {
	method:"post",
	url:"/modules/mod_signup/tmpl/control.php",
	onSuccess: function(data){
	    document.location.href = data;
	},
	onFailure: function(){
	    document.id(data).removeClass('errorPart').addClass('errorShow');
	}
    }).send();
}

function redirectTo(url)
{
	document.cookie = "pathbkp="+url;
}
function redirect(url){

	document.location.href = url;
}

function refreshCredits(title,messageOK,messageKO) {
    LoadingShow();
    new Request({
	url:"/modules/mod_signup/tmpl/refreshCredits.php",
	onSuccess: function(result){
	    var arr = result.split('|');
	    var credits = arr[0];
	    var resharing = arr[1];
	    $$('span.userCredits').set('html', credits);
	    $$('span.userCreditsResharing').set('html', resharing);
	    popupNotify(title, messageOK);
	},
	onFailure: function(){
	    popupNotify(title, messageKO);
	},
	onComplete: function(){
	    LoadingHide();
	}
    }).send();
}

function popupNotify(title,message) {
    document.id("notifyBox").removeClass("ghide");
    document.id("popup_notify").removeClass("ghide");
    document.id("popup_background").removeClass("ghide");
    document.id("popup_notify_title").set("html", title);
    document.id("popup_notify_text").set("html", message);
    openDialog(document.id("notifyBox"));
}

function closeNotify() {
    document.id("notifyBox").addClass("ghide").setStyles({zIndex:0});
}