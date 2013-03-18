function ieHover()
{
	var _hoverEl = ["nav","three-boxs","buttons-blue"];
	var _elHoverClass = ["li","li","li"];
	var _t;
	for (var z=0; z<_hoverEl.length; z++) {
		
		var _el = document.getElementById(_hoverEl[z]);
		if (_el){
			var _nodes = _el.getElementsByTagName(_elHoverClass[z]);
			for (var i=0; i<_nodes.length; i++)
			{
				_nodes[i].onmouseover = function() 
				{
					this.className += " hover";
				}
				_nodes[i].onmouseout = function()
				{
					var _this= this;
					setTimeout(function(){_this.className = _this.className.replace("hover", "");},10);
				}
			}
		}
	}
	
}

if (window.attachEvent && !window.opera){
	window.attachEvent("onload", ieHover);
}


