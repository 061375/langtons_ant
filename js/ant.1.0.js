/**
 * Langtons Ant
 * 
 * @author Jeremy Heminger 2015 <j.heminger@061375.com>
 * @requires html5CanvasHandler : by Jeremy Heminger
 * @requires jQuery
 *
 */

// Initialize

/**
 * @param {Object}
 * */
var CANVAS;
/**
 * @param {Int}
 * */
var FPS =  5;
/**
 * @param {Int}
 * */
var LOOPID;
/**
 * @param {Int}
 * */
var GRID;
/**
 * @param {Int}
 * */
var GRID_SIZE = 800;
/**
 * @param {Int}
 * */
var GRID_POINT_SIZE = 5;
/**
 * @param {String}
 * */
var GRID_COLOR = '#89b1f6';
/**
 * @param {Int}
 * */
var iii = 0;
/**
 * @param {Int}
 * */
var nodei = 101;
/**
 * @param {Object}
 * */
var Ant;
// get ready
(function ( $ , window , document , undefined) {
    $(document).ready(function(){
        // create the background grid
        GRID_SIZE = $(window).height();
        
        var obj = new Object();
            obj.id = 'grid';
            obj.height = GRID_SIZE;
            obj.width = GRID_SIZE;
            obj.node = $('#'+obj.id);
        
        // create a canvas layer
        GRID = new html5CanvasHandler(obj);
        GRID.makeCanvasGetContext();
        for(var x = 0; x < obj.width; x+=GRID_POINT_SIZE) {
            GRID.makeLine(x,0,x,obj.height,GRID_COLOR);
        }
        for(var y = 0; y < obj.height; y+=GRID_POINT_SIZE) {
            GRID.makeLine(0,y,obj.width,y,GRID_COLOR);
        }
        // init the main array that will hold all the grid positions
        /**
        * @param {Array}
        * */
        var grid = [];
        /**
        * @param {Boolean}
        * */
        var startX = false;
        /**
        * @param {Boolean}
        * */
        var startY = false;
        
        for(var x = 0; x <= obj.width; x+=GRID_POINT_SIZE) {
            grid[x] = [];
            if (false === startX && x > (obj.width / 2)) {
                startX = x;
            }
            for(var y = 0; y <= obj.height; y+=GRID_POINT_SIZE) {
                if (false === startY && y > (obj.height / 2)) {
                    startY = y;
                }
                //
                var obj = new Object();
                obj.id = 'ant';
                obj.height = GRID_SIZE;
                obj.width = GRID_SIZE;
                obj.node = $('#'+obj.id);
                var canvas = new html5CanvasHandler(obj);
                canvas.makeCanvasGetContext();
                // add the current canvas object to the grid object 
                grid[x][y] = {
                    b:0,
                    c:canvas
                }
            }
        }
        /**
         * Langdon's Ant
         * */
        Ant = {
            grid:grid,
            dir:Math.floor(Math.random() * 4),
            x:startX,
            y:startY,
            c_on:'#ffff00',
            c_off:'#0000ff',
            move: function() {
                // this is the algorithm
                // localize the variables
                var x = this.x;
                var y = this.y;
                this.grid[x][y].c.clearCanvas();
                var dir = this.dir;
                // check what color square the ant is on
                if (this.grid[x][y].b == 0) {
                    // if blue square turn right
                    dir++;
                    if (dir > 3)dir = 0;
                    // change the current square color
                    this.grid[x][y].c.makeRectangle(x,y,GRID_POINT_SIZE,GRID_POINT_SIZE,this.c_off);
                    this.grid[x][y].b = 1;
                }else{
                    // if yellow square turn left
                    dir--;
                    if (dir < 0)dir = 3;
                    // change the current square color
                    this.grid[x][y].c.makeRectangle(x,y,GRID_POINT_SIZE,GRID_POINT_SIZE,this.c_on);
                    this.grid[x][y].b = 0;
                }
                // move the ant in direction of 'dir'
                switch(dir) {
                    case 0:y-=GRID_POINT_SIZE;break;
                    case 1:x+=GRID_POINT_SIZE;break;
                    case 2:y+=GRID_POINT_SIZE;break;
                    case 3:x-=GRID_POINT_SIZE;break;
                }
                // update the object variables with the new values
                this.x = x;
                this.y = y;
                this.dir = dir;
                
                // this is just for debugging
                nodei++;
                if (nodei > 10) {
                    nodei = 0;
                    var a = $('body').find('canvas');
                    $('#nodes').val(a.length); 
                }
            }
        }
    });
    // if the window has focus ... run
    $(window).focus(function () {
        var nodei = 101;
        clearInterval(LOOPID); // clear the interval
        // run the loop
        LOOPID = setInterval(function() 
        {
            Ant.move();
            $('#iterations').val(iii++); // update iterations text field
        }, 100);
    }).blur(function () {
        clearInterval(LOOPID); // clearing interval on window blur
    });
} ( jQuery , window, document));