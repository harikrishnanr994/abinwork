(function () {
    'use strict';

    window.onload = function () {
        var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
        var h =  document.getElementsByTagName('body')[0].offsetHeight + 50;

        if (isSafari) {
            h = window.innerHeight;
        }
        // Canvas things
        var canvas = document.getElementById('canvas'),
            ctx = canvas.getContext('2d'),
            canvasWidth = canvas.width = window.innerWidth,
            canvasHeight = canvas.height = h;

        if (isSafari) {
            canvas.style.position = 'fixed';
        }

        // Used for randomizing everything
        var randomNum = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        // Used for changing settings with a random number
        var changeSettings = function (setting, min, max, prob) {
            var chance = randomNum(0, prob);

            if (setting < min || chance === 1) {
                return 1;
            } else if (setting > max || chance === 2) {
                return -1;
            } else {
                return 0;
            }
        };

        // Bubble config
        var bubbles = [], // Holds all the bubbles as objects
            count = 0, // Bubble count
            maxCount = isSafari ? 20 : 75, // Max bubbles to render on start
            maxSize = 100,
            minSize = 5,
            minSpeed = 5,
            maxSpeed = 10,
            bgcolor = '#0b1f23', // Canvas bg
            colors = [ // Color palette
                {color1: '#b062fa', color2: '#72d8ff'},
                {color1: '#71ffc0', color2: '#ce50ff'},
                {color1: '#5b0cfa', color2: '#0bfcff'},
                {color1: '#ff4081', color2: '#651fff'}
            ];

        // Bubble constructor
        var Bubble = function (x, y, size) {
            this.id = count + 1;
            this.x = x || randomNum(0, canvasWidth);
            this.y = y || randomNum(0, canvasHeight);
            this.radius = size || randomNum(minSize, maxSize);
            this.color = colors[randomNum(0, colors.length - 1)];

            this.speed = randomNum(minSpeed, maxSpeed) / 10;
            this.speedBackup = this.speed;
            this.directionX = randomNum(-1, 1) || 1;
            this.directionY = randomNum(-1, 1) || 1;
            this.flicker = 0;

            count++; // Number bubbles
            bubbles[count] = this; // Add to main object
        };

        // When popping a bubble
        Bubble.prototype.destroy = function () {
            // Generate number of smaller bubbles based on radius
            var popCount = this.radius / 10 > 0 ? this.radius / 10 : 2;

            // Generate smaller bubbles, size based on radius
            for (var i = 0; i < popCount; i++) {
                new Bubble(this.x, this.y, randomNum(this.radius / 4, this.radius / 2));
            }

            // Make popped bubble smaller and change color
            this.radius = randomNum(this.radius / 4, this.radius / 2);
            this.color = colors[randomNum(0, colors.length - 1)];
        };

        // Bubble drawing animation
        Bubble.prototype.draw = function () {

            // Change direction randomly, default to same direction
            this.directionX = changeSettings(this.x, 0, canvasWidth, 500) || this.directionX;
            this.directionY = changeSettings(this.y, 0, canvasHeight, 500) || this.directionY;

            // Reset speed
            this.speed = this.speedBackup;

            // Move bubbles
            this.x += this.speed * this.directionX;
            this.y += this.speed * this.directionY;

            // Change radius
            this.radius += changeSettings(this.radius, minSize, maxSize, 15);

            // Draw the bubbles
            ctx.save();
            ctx.globalCompositeOperation = 'color-dodge';
            ctx.beginPath();

            var gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
            gradient.addColorStop(0, this.color.color1);
            gradient.addColorStop(0.5, this.color.color2);
            gradient.addColorStop(1, 'rgba(250,76,43,0)');

            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        };

        // Create initial bubbles
        for (var i = 0; i < maxCount; i++) {
            new Bubble();
        }

        // Call animation
        var animate = function () {

            // Clear canvas and fill with background color
            ctx.fillStyle = bgcolor;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            // Draw bubbles
            for (var i = 1; i <= count; i++) {
                bubbles[i].draw();
            }

            requestAnimationFrame(animate);

        };

        requestAnimationFrame(animate);

        // Resize canvas with window resize
        var resizing;

        window.addEventListener('resize', function () {
            clearTimeout(resizing);
            resizing = setTimeout(function () {
                canvasWidth = canvas.width = window.innerWidth;
                h = document.getElementsByTagName('body')[0].offsetHeight + 50;
                if (isSafari) {
                    h = window.innerHeight;
                }
                canvasHeight = canvas.height = h;
            }, 500);
        });
    };
}());
