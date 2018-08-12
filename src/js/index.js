(function(){
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
})();