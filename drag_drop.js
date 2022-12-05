var get = function(el) {
    if (typeof el === 'string') {
      return document.querySelector(el);
    }
    return el;
  };
  var dragable = function(parentEl, dragEl) {
    var parent = get(parentEl);
    var target = get(dragEl);
    var drag = false;
    offsetX = 0;
    offsetY = 0;
    // offsetX = dragEl.offsetLeft;
    // offsetY = dragEl.offsetTop;

    var mousemoveTemp = null;
  
    if (target) {
      var mouseX = function(e) {
        if (e.pageX) {
          return e.pageX;
        }
        if (e.clientX) {
          return e.clientX + (document.documentElement.scrollLeft ?
            document.documentElement.scrollLeft :
            document.body.scrollLeft);
        }
        return null;
      };
  
      var mouseY = function(e) {
        if (e.pageY) {
          return e.pageY;
        }
        if (e.clientY) {
          return e.clientY + (document.documentElement.scrollTop ?
            document.documentElement.scrollTop :
            document.body.scrollTop);
        }
        return null;
      };
      
      var move = function (x, y) {        
          var xPos = parseInt(target.style.left) || target.offsetLeft || 0;
          var yPos = parseInt(target.style.top) || target.offsetTop|| 0;
        
        // var xPos = parseInt(target.offsetLeft) || 0;
        // var yPos = parseInt(target.offsetTop) || 0;
  
        // console.log(parent.offsetWidth , xPos + x);
        if(0 < xPos + x && (parent.offsetWidth-target.offsetWidth) > xPos + x && yPos + y >-15  && (parent.offsetHeight-target.offsetHeight) > yPos + y){
         
            target.style.left = (xPos + x) + 'px';
            target.style.top  = (yPos + y) + 'px';
    
        }else{
          if(xPos + x + target.offsetWidth > parent.offsetWidth +10)
            target.style.left =0;
          // console.log( xPos + x, parent.offsetWidth,target.offsetWidth)
        }
        // console.log(xPos + x + target.offsetWidth + 10 , parent.offsetWidth)
        
      };
      
      var mouseMoveHandler = function (e) {
        e = e || window.event;
        if(!drag){return true};
  
        var x = mouseX(e);
        var y = mouseY(e);
        // console.log(x,y, offsetX, offsetY);
        if (x != offsetX || y != offsetY) {
          move(x - offsetX, y - offsetY);
          offsetX = x;
          offsetY = y;
        }
        return false;
      };
      
      var start_drag = function (e) {
        e = e || window.event;
  
        offsetX=mouseX(e);
        offsetY=mouseY(e);
        drag=true; // basically we're using this to detect dragging
  
        // save any previous mousemove event handler:
        if (document.body.onmousemove) {
          mousemoveTemp = document.body.onmousemove;
        }
        document.body.onmousemove = mouseMoveHandler;
        return false;
      };
      
      var stop_drag = function () {
        drag=false;      
  
        // restore previous mousemove event handler if necessary:
        if (mousemoveTemp) {
          document.body.onmousemove = mousemoveTemp;
          mousemoveTemp = null;
        }
        return false;
      };
      
      parent.onmousedown = start_drag;
      parent.onmouseup = stop_drag;
    }
  }
  
  // dragable('.container', '.draggable');
  dragable('#ImageContainer', '#ImageContainer p');