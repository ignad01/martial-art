var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

let loadImage = (src, callback) => {
    let img = new Image();
    img.onload = () => callback(img);
    img.src = src;
};

let imagePath = (FrameNum, animation) => {
    return "images/" + animation + "/" + FrameNum + ".png";
};

let frames = {
    idle: [1, 2, 3, 4, 5, 6],
    backward: [1, 2, 3, 4, 5, 6],
    block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    forward: [1, 2, 3, 4, 5, 6],
    kick: [1, 2, 3, 4, 5, 6, 7],
    punch: [1, 2, 3, 4, 5, 6, 7],
};

let loadImages = (callback) => {
    let images = { idle: [], backward: [], block: [], forward: [], kick: [], punch: [] };
    let imagesToLoad = 0;

    [ "idle", "backward", "block", "forward", "kick", "punch"].forEach((animation) => {
        let animationFrames = frames[animation];
        imagesToLoad = imagesToLoad + animationFrames.length;

        animationFrames.forEach((FrameNum) => {
            let path = imagePath(FrameNum, animation);

            loadImage(path, (image) => {
                images[animation][FrameNum - 1] = image;
                imagesToLoad = imagesToLoad - 1;

                if (imagesToLoad === 0) {
                    callback(images);
                }
            });
        });
    });
};

let animate = (ctx, images, animation, callback) => {
    images[animation].forEach((image, index) => {
        setTimeout(() => {
            ctx.clearRect(0, 0, 500, 500);
            ctx.drawImage(image, 0, 0, 500, 500);
        }, index*100);
    });

    setTimeout(callback, images[animation].length*100);
};

loadImages((images) => {
    let queuedAnimation = [];

    let aux = () => {
        let selectedAnimation;

        if (queuedAnimation.length === 0) {
            selectedAnimation = "idle";
        }
        else {
            selectedAnimation = queuedAnimation.shift();
        }

        animate(ctx, images, selectedAnimation, aux)
    }

    aux();

    document.getElementById("kick").onclick = () => {
        queuedAnimation.push("kick");
    };
    document.getElementById("punch").onclick = () => {
        queuedAnimation.push("punch");
    };
    document.getElementById("forward").onclick = () => {
        queuedAnimation.push("forward");
    };
    document.getElementById("backward").onclick = () => {
        queuedAnimation.push("backward");
    };
    document.getElementById("block").onclick = () => {
        queuedAnimation.push("block");
    };

    document.onkeydown = function(e) {
        switch (e.keyCode) {
            case 37:
                queuedAnimation.push("punch");
                break;
            case 38:
                queuedAnimation.push("forward");
                break;
            case 39:
                queuedAnimation.push("kick");
                break;
            case 40:
                queuedAnimation.push("backward");
                break;
            case 32: 
            queuedAnimation.push("block");
        }
    }; 
});