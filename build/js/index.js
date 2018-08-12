(function(){
	
	load();
	handleTabClick();
	setInterval(load, 3000);

	function load(){
		getData('tweets', function(tweetsData){
			renderTweets(tweetsData);
		});
	}

	function handleTabClick(){
		var tabItem = document.getElementsByClassName('tab-item');
		for(var i=0;i<tabItem.length;i++){
			tabItem[i].addEventListener('click', function(){
				var tabItem = document.getElementsByClassName('tab-item');
				for(var i=0;i<tabItem.length;i++){
					if(tabItem[i].classList.contains('active-tab')){
						tabItem[i].classList.remove('active-tab');
					}
				}
				this.classList.add('active-tab');
			});
		}
	}

	function initRequest(){
		var xhr;
    if(window.XMLHttpRequest){
      xhr = new XMLHttpRequest();
    }
    else{
     	xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xhr;
	}

	function ajaxRequest(type, url, data, callback){
		var xhr = (typeof xhr === 'undefined') ? initRequest() : xhr;
    var url = "http://localhost:3000/" + url;
    xhr.open(type, url, true);
    xhr.setRequestHeader("Content-Type", 'application/json');
    data = JSON.stringify(data);
    xhr.send(data);
    xhr.onreadystatechange = (function(xhr, callback) {
      return function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          if (callback) {
            callback(xhr);
          }
        }
        else if (xhr.readyState == 4 && xhr.status == 0) {
          if (callback) {
            callback(404);
          }
        }
      }
    })(xhr, callback);
	}

	function getData(url, callback){
		ajaxRequest("GET", url, null, function(xhr) {
      if (xhr == 404) {
        callback(null);
      }
      else {
        required_data = JSON.parse(xhr.responseText);
        callback(required_data);
      }
	  });
	}

	function renderTweets(tweetsData){
		var data = '';
		var tweetsContainer = document.getElementById('tweets-container');
		for(var i=0;i<tweetsData.length;i++){
			data += "<div class='col-lg-12 col-md-12 col-sm-12 tweet'><div class='tweet-icon-container'><img src='./build/img/" + tweetsData[i].profile_image + "' alt='Tweet Profile Icon' class='tweet-icon'></div><div class='tweet-details'><div class='tweeter-details'><div><span class='tweeter-name'>" + tweetsData[i].name + "</span><span class='tweeter-id'>" + tweetsData[i].handle + "</span></div><div class='tweet-time'><span>" + tweetsData[i].time + "</span></div></div>";
			if(tweetsData[i].text){
				data += "<div class='tweet-text'>" + tweetsData[i].text + "</div>";
			}
			if(tweetsData[i].image){
				data += "<div class='tweet-image'><img src='./build/img/" + tweetsData[i].image + "' alt='Tweet Image' width='100%'></div>";
			}
			else if(tweetsData[i].video){
				data += "<div class='tweet-video'><video src='" + tweetsData[i].video + "' autobuffer autoloop loop controls></video></div>";
			}
			data += "<div class='tweet-action-container'><div>";
			if(tweetsData[i].comments){
				data += "<button type='button' class='tweet-action-btn tweet-forward-btn'><i class='fas fa-reply'></i><span class='tweet-action-count'>" + tweetsData[i].comments + "</span></button>";
			}
			else{
				data += "<button type='button' class='tweet-action-btn tweet-forward-btn'><i class='fas fa-reply'></i></button>";
			}
			if(tweetsData[i].likes){
				data += "<button type='button' class='tweet-action-btn tweet-like-btn'><i class='fas fa-star'></i><span class='tweet-action-count'>" + tweetsData[i].likes + "</span></button>";
			}
			else{
				data += "<button type='button' class='tweet-action-btn tweet-like-btn'><i class='fas fa-star'></i></button>";
			}
			if(tweetsData[i].retweets){
				data += "<button type='button' class='tweet-action-btn tweet-retweet-btn'><i class='fas fa-sync-alt'></i><span class='tweet-action-count'>" + tweetsData[i].retweets + "</span></button>";
			}
			else{
				data += "<button type='button' class='tweet-action-btn tweet-retweet-btn'><i class='fas fa-sync-alt'></i></button>";
			}
			data += "<button type='button' class='tweet-action-btn tweet-more-btn'><i class='fas fa-ellipsis-h'></i></button></div><div><button type='button' class='tweet-action-btn tweet-expand-btn'><i class='fas fa-arrows-alt-v'></i></button></div></div></div></div>";
		}
		tweetsContainer.innerHTML = data;
	}

})();