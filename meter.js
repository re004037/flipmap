// (c) aya_eiya - 2013
(function (){
    this.setMeter = function(_id,_size,imageSrc,_percent){
    var percent = _percent;
    var size = _size;
    var canvas = document.createElement('canvas');
    var context = canvas.getContext("2d");
    var meterDiv = document.getElementById(_id);
        meterDiv.appendChild(canvas);
    var image = new Image();
    var transparent = "rgba(0,0,0,0)";
    var meterColor = "rgb(255,128,128)";
    var meterWidth = 16;
    var digs = {0:0,90:Math.PI/2,180:Math.PI,360:Math.PI*2};

    var margin = 0;
    var setMargin = function(){
        margin = size * 0.1;
        canvas.width = size + margin * 2;
        canvas.height = size + margin * 2;
    };

    var setFrameOfMeter = function(){
        context.strokeStyle = meterColor;
        context.lineWidth = 2;
        context.beginPath();
        context.arc(size/2 + margin,size/2 + margin, size/2 - meterWidth,digs[0],digs[360]);
        context.stroke();
        context.beginPath();
        context.arc(size/2 + margin,size/2 + margin, size/2,digs[0],digs[360]);
        context.stroke();
    };

    var setMerterValue = function(){
        context.strokeStyle = meterColor;
        context.lineWidth = meterWidth;
        context.beginPath();
        var lDig = -percent/100 * digs[180] + digs[90];
        var rDig =  percent/100 * digs[180] + digs[90];
        context.arc(size/2 + margin,size/2 + margin,size/2 - meterWidth/2, lDig,rDig);
        context.stroke();
    };

    var setImageToCercle = function(){
        var aspect = image.width/image.height;
        context.strokeStyle = transparent;
        context.beginPath();
        context.arc(size/2 + margin,size/2 + margin, size/2 - meterWidth,digs[0],digs[360]);
        context.stroke();
        context.save();
        context.clip();
        context.drawImage(image,margin,margin,size * aspect,size);
        context.restore();
    };

    var setTextArea = function(){
        var fontSize = size * 0.18;
        context.font = fontSize + "px Arial";
        var text = percent+"%";
        var textSize = context.measureText(text);
        var textLeft = size * 0.9;
        context.strokeStyle = meterColor;
        context.fillStyle = "white";
        context.lineWidth = 4;
        context.beginPath();
        context.save();
        context.arc(textLeft,size - fontSize/2,textSize.width/2+5,0,digs[360]);
        context.fill();
        context.stroke();
        context.clip();
        context.beginPath();
        context.fillStyle = "black";
        context.fillText(text,textLeft-textSize.width/2,size-fontSize/8);
        context.restore();
    };

    var ready = false;

    var setUp = function(){
        setMargin();
        setImageToCercle();
        setFrameOfMeter();
        setMerterValue();
        setTextArea();
        ready = true;
    };

    image.onload = setUp;
    var setImage = function(imageSrc){
        ready = false;
        image.src = imageSrc;
    };
    var setPercentage = function(_percent){
        percent = _percent;
        if(ready) setUp();
    };

    var setSize = function(_size){
        console.log(_size);
        size = _size;
        if(ready) setUp();
    };

    setImage(imageSrc);

    return {setSize:setSize,setImage:setImage,setPercentage:setPercentage};
    };
})();