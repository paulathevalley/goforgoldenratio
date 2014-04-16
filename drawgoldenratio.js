(function() {
  var canvas = document.getElementById('goldenratio');

  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    drawRatio();
  }

  resizeCanvas();

  //
  // Thank you jaredwilli (http://anti-code.com) for the above
  // http://jsfiddle.net/jaredwilli/qFuDr/
  //

  function drawRatio() {
    var width = window.innerWidth;
    var height = window.innerHeight;
   
    // Find the longest side of your browser window 
    //    intialize it as var b
    if (width < height) {
      var a = parseFloat(width);
      var b = parseFloat(height);
    }
    else {
      var a = parseFloat(height);
      var b = parseFloat(width);
    }
    
    var context = canvas.getContext('2d');

    // Fill in the first square based on the smaller 
    //    side of your browser window
    // It is always visible
    context.fillStyle = RGBcolor(250,250,245);
    context.fillRect(0,0,a,a);

    calculateSquares();

    function calculateSquares() {
      var context = canvas.getContext('2d');

      // Starting color is a bright, grayish-yellow      
      var color = RGBcolor(250,250,245);
      
      // Initialize array
      // We will caluclate the next square side 
      //    with the golden ratio
      var innersquare = [];       
      var i = 1;

      // Position squares as if the browser window 
      //    width is longer than the height
      var xcord = a;             
      var ycord = 0;

      do {
        // Calculation the next square side (algebra)
        innersquare[i] = parseFloat(Math.pow(-1,i)*fibnum(i)*a + (-1)*Math.pow(-1,i)*fibnum(i-1)*b);
        
        // Make the color gradually more golden
        //    then fill the square!
        color = RGBcolor(250-i, 250-10*i, 245-30*i);
        context.fillStyle = color;

        // For every odd iteration, we need to add the 
        //    previous square side to the x position
        if (i%2 == 1 && i>1) {
          xcord = parseFloat(xcord + innersquare[i-1]);
        }
        // For every even iteration we need to add the 
        //    previous square side to the y position
        if (i%2 == 0) {
          ycord = parseFloat(ycord + innersquare[i-1]);
        }

        // If the browser window height is longer, 
        //    then switch the xcord and ycord positions 
        if (width < height) {
          context.fillRect(ycord, xcord, innersquare[i], innersquare[i]);
        }
        else {
          context.fillRect(xcord, ycord, innersquare[i], innersquare[i]);
        }

        // All done! Next!
        i++;
      }
      // Find the next square as long as the one we just 
      //    calculated is positive (and hence seen on screen)
      //    (I can only get up to 10 total squares displayed)
      while (innersquare[i-1] > 0);
    }

    
  }

  //
  // Find the nth (desiredplace) Fibonacci Number
  // nextnum[0, 1, 2]   :Initialize the Fibonacci Number sequence with an array
  // for                :Calculate the nth place of the sequence (build up the array)
  // return             :Return the nth place of the sequence (not the whole array)
  function fibnum(desiredplace) {
    var nextnum = [];
    nextnum[0] = 1;
    nextnum[1] = 1;
    nextnum[2] = 2;

    for (var i = 1; i <= desiredplace; i++)
      nextnum[i+1] = nextnum[i] + nextnum[i-1];

    return nextnum[desiredplace];
  }

  // Return a color value that the browser can use
  function RGBcolor(r,g,b) {
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  function tohex(number) {
    var hex = number.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function RGBtohex(r,g,b) {
    return tohex(r) + tohex(g) + tohex(b);
  }


})();

