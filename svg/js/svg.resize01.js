/*!
* svg.resize.js - An extension for svg.js which allows to resize elements which are selected
* @version 1.4.1
* https://github.com/svgdotjs/svg.resize.js
*
* @copyright [object Object]
* @license MIT
*/;
;(function() {
  "use strict";

  (function () {

    function ResizeHandler(el) {

      el.remember('_resizeHandler', this);

      this.el = el;
      this.parameters = {};
      this.lastUpdateCall = null;
      this.p = el.doc().node.createSVGPoint();
    }

    ResizeHandler.prototype.transformPoint = function(x, y, m){

      this.p.x = x - (this.offset.x - window.pageXOffset);
      this.p.y = y - (this.offset.y - window.pageYOffset);

      return this.p.matrixTransform(m || this.m);

    };

    ResizeHandler.prototype._extractPosition = function(event) {
      // Extract a position from a mouse/touch event.
      // Returns { x: .., y: .. }
      return {
        x: event.clientX || event.touches[0].pageX,
        y: event.clientY || event.touches[0].pageY
      };
    };

    ResizeHandler.prototype.init = function (options) {

      var _this = this;

      this.stop();

      if (options === 'stop') {
        return;
      }

      this.options = {};

      // Merge options and defaults
      for (var i in this.el.resize.defaults) {
        this.options[i] = this.el.resize.defaults[i];
        if (typeof options[i] !== 'undefined') {
          this.options[i] = options[i];
        }
      }

      // We listen to all these events which are specifying different edges
      this.el.on('lt.resize', function(e){ _this.resize(e || window.event); });  // Left-Top
      this.el.on('rt.resize', function(e){ _this.resize(e || window.event); });  // Right-Top
      this.el.on('rb.resize', function(e){ _this.resize(e || window.event); });  // Right-Bottom
      this.el.on('lb.resize', function(e){ _this.resize(e || window.event); });  // Left-Bottom

      this.el.on('t.resize', function(e){ _this.resize(e || window.event); });   // Top
      this.el.on('r.resize', function(e){ _this.resize(e || window.event); });   // Right
      this.el.on('b.resize', function(e){ _this.resize(e || window.event); });   // Bottom
      this.el.on('l.resize', function(e){ _this.resize(e || window.event); });   // Left

      this.el.on('rot.resize', function(e){ _this.resize(e || window.event); }); // Rotation

      this.el.on('point.resize', function(e){ _this.resize(e || window.event); }); // Point-Moving

      // This call ensures, that the plugin reacts to a change of snapToGrid immediately
      this.update();

    };

    ResizeHandler.prototype.stop = function(){
      this.el.off('lt.resize');
      this.el.off('rt.resize');
      this.el.off('rb.resize');
      this.el.off('lb.resize');

      this.el.off('t.resize');
      this.el.off('r.resize');
      this.el.off('b.resize');
      this.el.off('l.resize');

      this.el.off('rot.resize');

      this.el.off('point.resize');

      return this;
    };

    ResizeHandler.prototype.resize = function (event) {

      var _this = this;

      this.m = this.el.node.getScreenCTM().inverse();
      this.offset = { x: window.pageXOffset, y: window.pageYOffset };

      var txPt = this._extractPosition(event.detail.event);
      this.parameters = {
        type: this.el.type, // the type of element
        p: this.transformPoint(txPt.x, txPt.y),
        x: event.detail.x,      // x-position of the mouse when resizing started
        y: event.detail.y,      // y-position of the mouse when resizing started
        box: this.el.bbox(),    // The bounding-box of the element
        rotation: this.el.transform().rotation  // The current rotation of the element
      };

      // Add font-size parameter if the element type is text
      if (this.el.type === "text") {
        this.parameters.fontSize = this.el.attr()["font-size"];
      }
      // console.log(this.parameters)
      if(this.el.type === "g"){
        var _this=this;
        this.parameters.transform=this.el.transform()
        this.parameters.childBox=[];
        this.el.each(function(){
          _this.parameters.childBox.push(this.bbox())
        })
        this.parameters.abbox=absolute(this.parameters.box,this.parameters.childBox)
        // console.log(this.parameters.box)
        // console.log(this.parameters.childBox)
      }

      function absolute(box,childBox){
        var abbox=[];
        for(let i=0;i<childBox.length;i++){
          var obj={};
          obj.ax=childBox[i].x-box.x
          obj.ay=childBox[i].y-box.y
          abbox.push(obj)
        }
        return abbox;
      }

      // the i-param in the event holds the index of the point which is moved, when using `deepSelect`
      if (event.detail.i !== undefined) {

        // get the point array
        var array = this.el.array().valueOf();

        // Save the index and the point which is moved
        this.parameters.i = event.detail.i;
        this.parameters.pointCoords = [array[event.detail.i][0], array[event.detail.i][1]];
      }

      // Lets check which edge of the bounding-box was clicked and resize the this.el according to this
      switch (event.type) {

        // Left-Top-Edge
        case 'lt':
          // We build a calculating function for every case which gives us the new position of the this.el
          this.calc = function (diffX, diffY) {
            // The procedure is always the same
            // First we snap the edge to the given grid (snapping to 1px grid is normal resizing)
            var snap = this.snapToGrid(diffX, diffY);

            // Now we check if the new height and width still valid (> 0)
            if (this.parameters.box.width - snap[0] > 0 && this.parameters.box.height - snap[1] > 0) {
              // ...if valid, we resize the this.el (which can include moving because the coord-system starts at the left-top and this edge is moving sometimes when resized)
              
              /*
              * but first check if the element is text box, so we can change the font size instead of
              * the width and height
              */


              if (this.parameters.type === "text") {
                // this.el.move(this.parameters.box.x + snap[0], this.parameters.box.y);
                // this.el.attr("font-size", this.parameters.fontSize - snap[0]);
                return;
              }

              if(this.parameters.type === "g"){
                var multipleW=snap[0]/this.parameters.box.width;
                var multipleH=snap[1]/this.parameters.box.height;
                var childArr=this.el.children()
                for(let i=0;i<childArr.length;i++){
                  let ax=this.parameters.childBox[i].x-(multipleW*this.parameters.abbox[i].ax)
                  let ay=this.parameters.childBox[i].y-(multipleH*this.parameters.abbox[i].ay)
                  let w=this.parameters.childBox[i].width*(1-multipleW)
                  let h=this.parameters.childBox[i].height*(1-multipleH)
                  // console.log(ax,ay,w,h)
                  childArr[i].move(ax,ay).size(w,h)
                }
                this.el.matrix(this.parameters.transform).transform({x:snap[0],y:snap[1]},true).size(this.parameters.box.width - snap[0], this.parameters.box.height - snap[1]);

              }else{
                this.el.move(this.parameters.box.x + snap[0], this.parameters.box.y + snap[1]).size(this.parameters.box.width - snap[0], this.parameters.box.height - snap[1]);
              }

            }
          };
          break;

        // Right-Top
        case 'rt':
          // s.a.
          this.calc = function (diffX, diffY) {
            var snap = this.snapToGrid(diffX, diffY, 1 << 1);
            if (this.parameters.box.width + snap[0] > 0 && this.parameters.box.height - snap[1] > 0) {
              if (this.parameters.type === "text") {
                // this.el.move(this.parameters.box.x - snap[0], this.parameters.box.y);
                // this.el.attr("font-size", this.parameters.fontSize + snap[0]);
                return;
              }

              if(this.parameters.type === "g"){
                var multipleW=snap[0]/this.parameters.box.width;
                var multipleH=snap[1]/this.parameters.box.height;
                var childArr=this.el.children()
                for(let i=0;i<childArr.length;i++){
                  let ax=this.parameters.childBox[i].x+(multipleW*this.parameters.abbox[i].ax)
                  let ay=this.parameters.childBox[i].y-(multipleH*this.parameters.abbox[i].ay)
                  let w=this.parameters.childBox[i].width*(1+multipleW)
                  let h=this.parameters.childBox[i].height*(1-multipleH)

                  childArr[i].move(ax,ay).size(w,h)

                }
                this.el.matrix(this.parameters.transform).transform({y:snap[1]},true).size(this.parameters.box.width + snap[0], this.parameters.box.height + snap[1]);

              }else{
                this.el.move(this.parameters.box.x, this.parameters.box.y + snap[1]).size(this.parameters.box.width + snap[0], this.parameters.box.height - snap[1]);
              }

            }
          };
          break;

        // Right-Bottom
        case 'rb':
          // s.a.
          this.calc = function (diffX, diffY) {
            var snap = this.snapToGrid(diffX, diffY, 0);
            if (this.parameters.box.width + snap[0] > 0 && this.parameters.box.height + snap[1] > 0) {
              if (this.parameters.type === "text") {
                // this.el.move(this.parameters.box.x - snap[0], this.parameters.box.y);
                // this.el.attr("font-size", this.parameters.fontSize + snap[0]);
                return;
              }

              if(this.parameters.type === "g"){
                var multipleW=snap[0]/this.parameters.box.width;
                var multipleH=snap[1]/this.parameters.box.height;
                var childArr=this.el.children()
                for(let i=0;i<childArr.length;i++){
                  let ax=this.parameters.childBox[i].x+(multipleW*this.parameters.abbox[i].ax)
                  let ay=this.parameters.childBox[i].y+(multipleH*this.parameters.abbox[i].ay)
                  let w=this.parameters.childBox[i].width*(1+multipleW)
                  let h=this.parameters.childBox[i].height*(1+multipleH)

                  childArr[i].move(ax,ay).size(w,h)

                }
                this.el.size(this.parameters.box.width + snap[0], this.parameters.box.height + snap[1]);

              }else{
                this.el.move(this.parameters.box.x, this.parameters.box.y).size(this.parameters.box.width + snap[0], this.parameters.box.height + snap[1]);
              }

            }
          };
          break;

        // Left-Bottom
        case 'lb':
          // s.a.
          this.calc = function (diffX, diffY) {
            var snap = this.snapToGrid(diffX, diffY, 1);
            if (this.parameters.box.width - snap[0] > 0 && this.parameters.box.height + snap[1] > 0) {
              if (this.parameters.type === "text") {
                // this.el.move(this.parameters.box.x + snap[0], this.parameters.box.y);
                // this.el.attr("font-size", this.parameters.fontSize - snap[0]);
                return;
              }

              if(this.parameters.type === "g"){
                var multipleW=snap[0]/this.parameters.box.width;
                var multipleH=snap[1]/this.parameters.box.height;
                var childArr=this.el.children()
                for(let i=0;i<childArr.length;i++){
                  let ax=this.parameters.childBox[i].x-(multipleW*this.parameters.abbox[i].ax)
                  let ay=this.parameters.childBox[i].y+(multipleH*this.parameters.abbox[i].ay)
                  let w=this.parameters.childBox[i].width*(1-multipleW)
                  let h=this.parameters.childBox[i].height*(1+multipleH)
                  // console.log(ax,ay,w,h)
                  childArr[i].move(ax,ay).size(w,h)
                }
                this.el.matrix(this.parameters.transform).transform({x:snap[0]},true).size(this.parameters.box.width - snap[0], this.parameters.box.height - snap[1]);

              }else{
                this.el.move(this.parameters.box.x + snap[0], this.parameters.box.y).size(this.parameters.box.width - snap[0], this.parameters.box.height + snap[1]);
              }

            }
          };
          break;

        // Top
        case 't':
          // s.a.
          this.calc = function (diffX, diffY) {
            var snap = this.snapToGrid(diffX, diffY, 1 << 1);
            if (this.parameters.box.height - snap[1] > 0) {
              // Disable the font-resizing if it is not from the corner of bounding-box
              if (this.parameters.type === "text") {
                return;
              }

              if(this.parameters.type === "g"){
                var multipleH=snap[1]/this.parameters.box.height;

                var childArr=this.el.children()
                for(let i=0;i<childArr.length;i++){
                  let ay=this.parameters.childBox[i].y-(multipleH*this.parameters.abbox[i].ay)
                  
                  childArr[i].move(this.parameters.childBox[i].x,ay).height(this.parameters.childBox[i].height*(1-multipleH))
                }
                
                this.el.matrix(this.parameters.transform).transform({y:snap[1]},true).height(this.parameters.box.height - snap[1])
              }else{
                this.el.move(this.parameters.box.x, this.parameters.box.y + snap[1]).height(this.parameters.box.height - snap[1]);
              }


            }
          };
          break;

        // Right
        case 'r':
          // s.a.
          this.calc = function (diffX, diffY) {
            var snap = this.snapToGrid(diffX, diffY, 0);
            if (this.parameters.box.width + snap[0] > 0) {
              
              if (this.parameters.type === "text") {
                return;
              }

              if(this.parameters.type === "g"){
                var multipleW=snap[0]/this.parameters.box.width;
                
                var childArr=this.el.children()
                for(let i=0;i<childArr.length;i++){
                  let ax=this.parameters.childBox[i].x+(multipleW*this.parameters.abbox[i].ax)
                  childArr[i].move(ax,this.parameters.childBox[i].y).width(this.parameters.childBox[i].width*(1+multipleW))
                }
                this.el.width(this.parameters.box.width + snap[0])
              }else{
                this.el.move(this.parameters.box.x, this.parameters.box.y).width(this.parameters.box.width + snap[0]);
              }

            }
          };
          break;

        // Bottom
        case 'b':
          // s.a.
          this.calc = function (diffX, diffY) {
            var snap = this.snapToGrid(diffX, diffY, 0);
            if (this.parameters.box.height + snap[1] > 0) {
              if (this.parameters.type === "text") {
                return;
              }

              if(this.parameters.type === "g"){
                var multipleH=snap[1]/this.parameters.box.height;

                // console.log(snap[1])
                var childArr=this.el.children()
                for(let i=0;i<childArr.length;i++){
                  let ay=this.parameters.childBox[i].y+(multipleH*this.parameters.abbox[i].ay)

                  childArr[i].move(this.parameters.childBox[i].x,ay).height(this.parameters.childBox[i].height*(1+multipleH))
                }
                this.el.height(this.parameters.box.height + snap[1])
              }else{
                this.el.move(this.parameters.box.x, this.parameters.box.y).height(this.parameters.box.height + snap[1]);
              }

            }
          };
          break;

        // Left
        case 'l':
          // s.a.
          this.calc = function (diffX, diffY) {
            var snap = this.snapToGrid(diffX, diffY, 1);
            if (this.parameters.box.width - snap[0] > 0) {
              if (this.parameters.type === "text") {
                return;
              }

              if(this.parameters.type === "g"){
                var multipleW=snap[0]/this.parameters.box.width;
                // console.log(snap[0])
                var childArr=this.el.children()
                for(let i=0;i<childArr.length;i++){
                  let ax=this.parameters.childBox[i].x-(multipleW*this.parameters.abbox[i].ax)

                  childArr[i].move(ax,this.parameters.childBox[i].y).width(this.parameters.childBox[i].width*(1-multipleW))
                }
                
                this.el.matrix(this.parameters.transform).transform({x:snap[0]},true).width(this.parameters.box.width - snap[0])
              }else{
                this.el.move(this.parameters.box.x + snap[0], this.parameters.box.y).width(this.parameters.box.width - snap[0]);
              }

            }
          };
          break;

        // Rotation
        case 'rot':
          // s.a.
          this.calc = function (diffX, diffY) {

            // yes this is kinda stupid but we need the mouse coords back...
            var current = {x: diffX + this.parameters.p.x, y: diffY + this.parameters.p.y};

            // start minus middle
            var sAngle = Math.atan2((this.parameters.p.y - this.parameters.box.y - this.parameters.box.height / 2), (this.parameters.p.x - this.parameters.box.x - this.parameters.box.width / 2));

            // end minus middle
            var pAngle = Math.atan2((current.y - this.parameters.box.y - this.parameters.box.height / 2), (current.x - this.parameters.box.x - this.parameters.box.width / 2));

            var angle = (pAngle - sAngle) * 180 / Math.PI;

            // We have to move the element to the center of the box first and change the rotation afterwards
            // because rotation always works around a rotation-center, which is changed when moving the element
            // We also set the new rotation center to the center of the box.

            if(this.parameters.type === "g"){
              let _this=this;
              // console.log(this.el.hasClass('tempGroup'))
              // if(this.el.hasClass('tempGroup')){
              //   return
              // }
              // console.log(this.parameters.rotation + angle - angle % this.options.snapToAngle)
              this.el.matrix(this.parameters.transform).rotate(this.parameters.rotation + angle - angle % this.options.snapToAngle, this.parameters.box.cx, this.parameters.box.cy);
              // this.el.matrix(this.parameters.transform)
              // this.el.rotate(this.parameters.rotation + angle - angle % this.options.snapToAngle, this.parameters.box.cx, this.parameters.box.cy);
              this.el.each(function(index){
                // this.rotate(angle)
                // this.matrix()
                // console.log(_this.parameters.transform)
                // this.center(_this.parameters.childBox[index].cx, _this.parameters.childBox[index].cy).rotate(_this.parameters.rotation + angle - angle % _this.options.snapToAngle, _this.parameters.childBox[index].cx, _this.parameters.childBox[index].cy);
                // this.transform({rotation:_this.parameters.rotation + angle})
              })
              // console.log(this.parameters.rotation + angle - angle % this.options.snapToAngle)
            }else{
              this.el.center(this.parameters.box.cx, this.parameters.box.cy).rotate(this.parameters.rotation + angle - angle % this.options.snapToAngle, this.parameters.box.cx, this.parameters.box.cy);
            }
            
          };
          break;

        // Moving one single Point (needed when an element is deepSelected which means you can move every single point of the object)
        case 'point':
          //
          this.calc = function (diffX, diffY) {

          // Snapping the point to the grid
          var snap = this.snapToGrid(diffX, diffY, this.parameters.pointCoords[0], this.parameters.pointCoords[1]);

          // Get the point array
          var array = this.el.array().valueOf();

          // Changing the moved point in the array
          array[this.parameters.i][0] = this.parameters.pointCoords[0] + snap[0];
          array[this.parameters.i][1] = this.parameters.pointCoords[1] + snap[1];

          // And plot the new this.el
          this.el.plot(array);
        };
      }

      this.el.fire('resizestart', {dx: this.parameters.x, dy: this.parameters.y, event: event});
      // When resizing started, we have to register events for...
      // Touches.
      SVG.on(window, 'touchmove.resize', function(e) {
        _this.update(e || window.event);
      });
      SVG.on(window, 'touchend.resize', function() {
        _this.done();
      });
      // Mouse.
      SVG.on(window, 'mousemove.resize', function (e) {
        _this.update(e || window.event);
      });
      SVG.on(window, 'mouseup.resize', function () {
        _this.done();
      });

    };

    // The update-function redraws the element every time the mouse is moving
    ResizeHandler.prototype.update = function (event) {

      if (!event) {
        if (this.lastUpdateCall) {
          this.calc(this.lastUpdateCall[0], this.lastUpdateCall[1]);
        }
        return;
      }


      // Calculate the difference between the mouseposition at start and now
      var txPt = this._extractPosition(event);
      var p = this.transformPoint(txPt.x, txPt.y);

      var diffX = p.x - this.parameters.p.x,
      diffY = p.y - this.parameters.p.y;

      this.lastUpdateCall = [diffX, diffY];

      // Calculate the new position and height / width of the element
      this.calc(diffX, diffY);

      // Emit an event to say we have changed.
      this.el.fire('resizing', {dx: diffX, dy: diffY, event: event});
    };

    // Is called on mouseup.
    // Removes the update-function from the mousemove event
    ResizeHandler.prototype.done = function () {
      this.lastUpdateCall = null;
      SVG.off(window, 'mousemove.resize');
      SVG.off(window, 'mouseup.resize');
      SVG.off(window, 'touchmove.resize');
      SVG.off(window, 'touchend.resize');
      this.el.fire('resizedone');
    };

    // The flag is used to determine whether the resizing is used with a left-Point (first bit) and top-point (second bit)
    // In this cases the temp-values are calculated differently
    ResizeHandler.prototype.snapToGrid = function (diffX, diffY, flag, pointCoordsY) {

      var temp;

      // If `pointCoordsY` is given, a single Point has to be snapped (deepSelect). That's why we need a different temp-value
      if (typeof pointCoordsY !== 'undefined') {
        // Note that flag = pointCoordsX in this case
        temp = [(flag + diffX) % this.options.snapToGrid, (pointCoordsY + diffY) % this.options.snapToGrid];
      } else {
        // We check if the flag is set and if not we set a default-value (both bits set - which means upper-left-edge)
        flag = flag == null ? 1 | 1 << 1 : flag;
        temp = [(this.parameters.box.x + diffX + (flag & 1 ? 0 : this.parameters.box.width)) % this.options.snapToGrid, (this.parameters.box.y + diffY + (flag & (1 << 1) ? 0 : this.parameters.box.height)) % this.options.snapToGrid];
      }


      diffX -= (Math.abs(temp[0]) < this.options.snapToGrid / 2 ?
        temp[0] :
        temp[0] - (diffX < 0 ? -this.options.snapToGrid : this.options.snapToGrid));
      diffY -= (Math.abs(temp[1]) < this.options.snapToGrid / 2 ?
        temp[1] :
        temp[1] - (diffY < 0 ? -this.options.snapToGrid : this.options.snapToGrid));

      return this.constraintToBox(diffX, diffY, flag, pointCoordsY);

    };

    // keep element within constrained box
    ResizeHandler.prototype.constraintToBox = function (diffX, diffY, flag, pointCoordsY) {
      //return [diffX, diffY]
      var c = this.options.constraint || {};
      var orgX, orgY;

      if (typeof pointCoordsY !== 'undefined') {
        orgX = flag;
        orgY = pointCoordsY;
      } else {
        orgX = this.parameters.box.x + (flag & 1 ? 0 : this.parameters.box.width);
        orgY = this.parameters.box.y + (flag & (1<<1) ? 0 : this.parameters.box.height);
      }

      if (typeof c.minX !== 'undefined' && orgX + diffX < c.minX) {
        diffX = c.minX - orgX;
      }

      if (typeof c.maxX !== 'undefined' && orgX + diffX > c.maxX) {
        diffX = c.maxX - orgX;
      }

      if (typeof c.minY !== 'undefined' && orgY + diffY < c.minY) {
        diffY = c.minY - orgY;
      }

      if (typeof c.maxY !== 'undefined' && orgY + diffY > c.maxY) {
        diffY = c.maxY - orgY;
      }

      return [diffX, diffY];
    };

    SVG.extend(SVG.Element, {
      // Resize element with mouse
      resize: function (options) {

        (this.remember('_resizeHandler') || new ResizeHandler(this)).init(options || {});
        // console.log(this)
        return this;

      }

    });

    SVG.Element.prototype.resize.defaults = {
      snapToAngle: 0.1,    // Specifies the speed the rotation is happening when moving the mouse
      snapToGrid: 1,       // Snaps to a grid of `snapToGrid` Pixels
      constraint: {}       // keep element within constrained box
    };

  }).call(this);
}());
