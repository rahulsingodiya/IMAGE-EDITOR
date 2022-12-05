const image_text = document.querySelector('#ImageContainer p');
const progress = document.querySelector('.progress');
const filterContainer = document.querySelector('#filter');
const effectContainer = document.querySelector('#effect');
const transformContainer = document.querySelector('#transform');
const textEditorContainer = document.querySelector('#text_editor');
const colorPicker1 = document.querySelector('#color_picker1 input');
const colorPicker2 = document.querySelector('#color_picker2 input');
const input_text = document.querySelector('#text_editor input[type="text"]');
const input_textarea = document.querySelector('#text_editor textarea');
const btn_add_text = document.querySelector('#btn_add_text');
const text_font_size = document.querySelector('#text-font-size');
const text_font_family = document.querySelector('#text-font-family');
const text_case = document.querySelector('#text-case');
const text_spacing = document.querySelector('#text-spacing');


progress.addEventListener('input', function () {
    const value = this.value;
    //   this.style.backgroundImage = `linear-gradient(to right, #0FF 0%, #0FF ${value}%, #000 ${value}%, #000 100%)`

})

function editImage() {
    var gs = $("#gs").val(); // grayscale
    var blur = $("#blur").val(); // blur
    var br = $("#br").val(); // brightness
    var ct = $("#ct").val(); // contrast
    var huer = $("#huer").val(); //hue-rotate
    var opacity = $("#opacity").val(); //opacity
    var invert = $("#invert").val(); //invert
    var saturate = $("#saturate").val(); //saturate
    var sepia = $("#sepia").val(); //sepia

    // console.log(gs, blur, br, ct, huer, opacity, invert, saturate, sepia);

    $("#img-file").css(
        "filter", 'grayscale(' + gs + '%) blur(' + blur + 'px) brightness(' + br + '%) contrast(' + ct + '%) hue-rotate(' + huer + 'deg) opacity(' + opacity + '%) invert(' + invert + '%) saturate(' + saturate + '%) sepia(' + sepia + '%)');

    $("#img-file").css(
        "-webkit-filter", 'grayscale(' + gs + '%) blur(' + blur + 'px) brightness(' + br + '%) contrast(' + ct + '%) hue-rotate(' + huer + 'deg) opacity(' + opacity + '%) invert(' + invert + '%) saturate(' + saturate + '%) sepia(' + sepia + '%)');
}


$("input[type=range]").on('input', editImage);//.mousemove(editImage);

// var effects =['none', 'Brightness', 'Sepia', 'High Contrast','Low Contrast', 'Colorize', 'Vintage', 'Lomo','Emboss','Tilt Shift', 'Radial Blur', 'Edge Enhance', 'Posterize', 'Clarity', 'Orange Peel', 'Sin City', 'Sun Rise', 'Cross process', 'Hazy', 'Love', 'Grungy','Jarques', 'Pin Hole', 'old Boot', 'Glow Sun', 'HDR Effect', 'Old Paper', 'Pleasant'];

var effects = ['', 'opacity(.5) drop-shadow(0 0 0 Gray)', 'opacity(.5) drop-shadow(0px 0px 0px black)', 'opacity(.5) drop-shadow(0 0 0 Red)', 'opacity(.5) drop-shadow(0 0 0 Maroon)', 'opacity(.5) drop-shadow(0 0 0 Yellow)', 'opacity(.5) drop-shadow(0 0 0 Olive)', 'opacity(.5) drop-shadow(0 0 0 Lime)', 'opacity(.5) drop-shadow(0 0 0 Green)', 'opacity(.5) drop-shadow(0 0 0 Aqua)', 'opacity(.5) drop-shadow(0 0 0 Teal)', 'opacity(.5) drop-shadow(0 0 0 Blue)', 'opacity(.5) drop-shadow(0 0 0 Navy)', 'opacity(.5) drop-shadow(0 0 0 Fuchsia)', 'opacity(.5) drop-shadow(0 0 0 Purple)', 'opacity(.5) drop-shadow(0 0 0 #FFFFFF)'];

// console.log(effects.length);
loadEffect('1.jpeg');

function loadEffect(ImgSRC) {

    var effect_EL = `<h3 class="text-center">EFFECT</h3>
                <div class="col s3 effect-image" data-index='0'>
                    <img src="${ImgSRC}" alt="" srcset="">
                    <label>None</label>
                </div>`;

    for (i = 1; i < 16; i++) {

        effect_EL += `<div class="col s3 effect-image" data-index='${i}'>
                    <img src="${ImgSRC}" alt="" srcset="" style="filter:${effects[i]}">
                    <label>EFFECT ${i + 1}</label>
                </div>`;
    }

    document.querySelector('#effect').innerHTML = effect_EL;
}



document.addEventListener('click', function (e) {
    // console.log(e.target.parentElement);
    if (e.target.parentElement.classList.contains('effect-image')) {
        var ef_index = e.target.parentElement.getAttribute('data-index');
        console.log(ef_index);
        if (ef_index != null) {

            if (ef_index != 0) {
                console.log(MainImg);
                $('#img-file').css('filter', effects[ef_index]);
            } else {
                $('#img-file').css('filter', 'none');
            }
        }
        // alert(e.target.getAttribute('data-index'));
    }

    console.log(e.target.id);

    if (e.target.id == 'btn_filter') {
        ShowTab('F');
    }
    if (e.target.id == 'btn_effect') {
        ShowTab('E');
    }
    if (e.target.id == 'btn_transform') {
        ShowTab('T');
    }
    if (e.target.id == 'btn_text') {
        ShowTab('TE');
    }
    if (e.target.id == 'btn_reset') {
        // $('#filter_form').reset();
        ImageContainer.removeAttribute('class');
        document.querySelector('#filter_form').reset();
        $('#img-file').css('filter', 'none');
        image_text.style.display = "none";
        // editImage();
    }
    if (e.target.id == 'btn_save') {
        saveImage();
    }
    // console.log(e.target.id);
    if (e.target.id == 'btn_add_text') {
        // console.log(input_text.value);
        if (input_textarea.value != "") {
            image_text.innerText = input_textarea.value;
            // image_text.innerText = input_text.value;
            image_text.style.display = "block";
        }
    }
    if (e.target.id == 'btn_remove_text') {
        image_text.style.display = "none";
    }

    // console.log(e.target.parentElement);

    if (e.target.parentElement.classList.contains('transform_tool')) {
        var dataValue = e.target.parentElement.getAttribute('data-value');
        console.log(dataValue, MainImg);
        if (dataValue == 'mirror') {
            e.target.parentElement.setAttribute('data-value', 'mirror-active')
            MainImg.classList.add('mirror');
        }
        if (dataValue == 'mirror-active') {
            e.target.parentElement.setAttribute('data-value', 'mirror')
            MainImg.classList.remove('mirror');
        }
        if (dataValue == 'flip') {
            e.target.parentElement.setAttribute('data-value', 'flip-active')
            MainImg.classList.add('flip');
        }
        if (dataValue == 'flip-active') {
            e.target.parentElement.setAttribute('data-value', 'flip')
            MainImg.classList.remove('flip');
        }
        if (dataValue == 'mirror-flip') {
            e.target.parentElement.setAttribute('data-value', 'mirror-flip-active')
            MainImg.classList.add('mirror-flip');
        }
        if (dataValue == 'mirror-flip-active') {
            e.target.parentElement.setAttribute('data-value', 'mirror-flip')
            MainImg.classList.remove('mirror-flip');
        }
        if (dataValue == 'rotate-90') {
            e.target.parentElement.setAttribute('data-value', 'rotate-180')
            ImageContainer.classList.add('rotate-90');
            image_text.style.transform = "rotate(-90deg)";
        }
        if (dataValue == 'rotate-180') {
            e.target.parentElement.setAttribute('data-value', 'rotate-270')
            ImageContainer.classList.remove('rotate-90');
            ImageContainer.classList.add('rotate-180');
            image_text.style.transform = "rotate(-180deg)";
        }
        if (dataValue == 'rotate-270') {
            e.target.parentElement.setAttribute('data-value', 'rotate-0')
            ImageContainer.classList.remove('rotate-180');
            ImageContainer.classList.add('rotate-270');
            image_text.style.transform = "rotate(-270deg)";
        }
        if (dataValue == 'rotate-0') {
            e.target.parentElement.setAttribute('data-value', 'rotate-90')
            ImageContainer.classList.remove('rotate-270');
            image_text.style.transform = "rotate(0deg)";
        }
        // ColorOverlayResize();
        // if(dataValue == 'rotate-90' || dataValue == 'rotate-270' ){
        //     ColorOverlay.style.width = MainImg.offsetHeight + 'px'; 
        //     ColorOverlay.style.height = MainImg.offsetWidth + 'px';
        //     ColorOverlay.style.top = MainImg.offsetLeft + 'px';
        //     ColorOverlay.style.left = MainImg.offsetTop + 'px';
        // }


    }
})

function ShowTab(tab) {
    // console.log(tab, filterContainer, effectContainer);
    filterContainer.style.display = 'none';
    effectContainer.style.display = 'none';
    transformContainer.style.display = 'none';
    textEditorContainer.style.display = 'none';
    if (tab == 'F') {
        filterContainer.style.display = 'block';
    } else if (tab == 'E') {
        effectContainer.style.display = 'block';
    } else if (tab == 'T') {
        transformContainer.style.display = 'block';
    } else if (tab == 'TE') {
        textEditorContainer.style.display = 'block';
    }
}

// TEXT FORMAT

textEditorContainer.addEventListener('click', function (e) {
    console.log(e.target.id);
    // var currentFont = image_text.style.fontSize;
    console.log(image_text.style.fontStyle);
    // image_text.style.textDecoration ='underline';

    if (e.target.id == 'text-bold') {
        if (image_text.style.fontWeight == "" || image_text.style.fontWeight == "100")
            image_text.style.fontWeight = "bold";
        else
            image_text.style.fontWeight = '100';
    }
    if (e.target.id == 'text-italic') {
        if (image_text.style.fontStyle == "" || image_text.style.fontStyle == "normal")
            image_text.style.fontStyle = "italic";
        else
            image_text.style.fontStyle = 'normal';
    }
    if (e.target.id == 'text-underline') {
        if (image_text.style.textDecoration == "" || image_text.style.textDecoration == "none")
            image_text.style.textDecoration = "underline";
        else
            image_text.style.textDecoration = 'none';
    }
    if (e.target.id == 'text-shadow') {
        if (image_text.classList.contains('text_shadow'))
            image_text.classList.remove('text_shadow');
        else
            image_text.classList.add('text_shadow');
    }
    if (e.target.id == 'remove-background') {

        image_text.style.backgroundColor = "transparent";

        // if (image_text.classList.contains('text_shadow'))
        // image_text.classList.remove('text_shadow');
        // else
        //     image_text.classList.add('text_shadow');
    }
})

var fontSize = [10, 12, 14, 16, 18, 22, 24, 28, 32, 36, 40, 44, 48, 60, 72, 96]
var optionsEL = ``;
for (i = 0; i < fontSize.length; i++) {
    optionsEL += `<option value="${fontSize[i]}">${fontSize[i]}</option>
                `;
}
text_font_size.innerHTML = optionsEL;

text_font_size.addEventListener('change', function (e) {
    image_text.style.fontSize = this.value + "px";
})


var fontFamily = ['Arial', 'AlegreyaSansSC', 'Audiowide', 'BAUHS93', 'FasterOne', 'CENTURY', 'GreatVibes', 'ImperialScript', 'Roboto'];
var optionsEL = ``;
for (i = 0; i < fontFamily.length; i++) {
    optionsEL += `<option style="font-family:${fontFamily[i]}" value="${fontFamily[i]}">${fontFamily[i]}</option>
                `;
}

text_font_family.innerHTML = optionsEL;

text_font_family.addEventListener('change', function (e) {
    image_text.style.fontFamily = this.value;
})

text_case.addEventListener('change', function (e) {
    image_text.style.textTransform = this.value;
})

text_spacing.addEventListener('change', function (e) {
    image_text.style.letterSpacing = this.value + "px";
})

// console.log(colorPicker.length)

colorPicker1.addEventListener('input', function (e) {
    if (e.target.id == 'text-color') {
        e.target.parentElement.style.color = this.value;
        image_text.style.color = this.value;
    }


})
colorPicker2.addEventListener('input', function (e) {
    if (e.target.id == 'text-background') {
        e.target.parentElement.style.color = this.value;
        image_text.style.backgroundColor = this.value;
    }

})

function saveImage() {
    FrontImage = document.getElementById("MainImageContainer");//ImageContainer;// document.getElementById("ImageContainer")//$("#ImageContainer");
    canvas = document.createElement('canvas');
    var ctx = canvas.getContext("2d");
    console.log(FrontImage, canvas);
    html2canvas(FrontImage, {
        onrendered: function (canvas) {
            $("#previewImage").append(canvas);
            // saveAs(canvas.toDataURL(), "Quote.jpg");
        }
    });

    function saveAs(uri, filename) {
        var link = document.createElement("a");
        if (typeof link.download === "string") {
          link.href = uri;
          link.download = filename;
          //Firefox requires the link to be in the body
          document.body.appendChild(link);
          //simulate click
          link.click();
          //remove the link when done
          document.body.removeChild(link);
        } else {
          window.open(uri);
        }
      }


    // var element = MainImageContainer //$("#ImageContainer"); // global variable
    // var getCanvas; // global variable
    // console.log(element);
    // saveCapture(element);
    // $("#btn-Preview-Image").on('click', function () {
        // html2canvas(element, {
        //     onrendered: function (canvas) {
        //         // canvas.toDataURL("image/png")
        //         $("#previewImage").append(canvas);
        //         getCanvas = canvas;
        //     }
        // });
    // });

    // var element = $("#ImageContainer");
    // console.log(ImageContainer, element);
    // // html2canvas(ImageContainer, {
    // //     onrendered: function (canvas) {
    // //         console.log(canvas.toDataURL());
    // //         // saveAs(canvas.toDataURL(), "Quote.jpg");
    // //     }
    // // });

    // html2canvas(element, {
    //     onrendered: function (canvas) {
    //         $("#previewImage").append(canvas);
    //         // getCanvas = canvas;
    //     }
    // });

}


function saveCapture(element) {
    canvas = document.createElement('canvas')
    var ctx = canvas.getContext("2d");
    html2canvas(element).then(function(canvas) {
        $("#previewImage").append(canvas);

      download(canvas.toDataURL("image/png"));
    })
  }

  function download(url){
    var a = $("<a style='display:none' id='js-downloder'>")
    .attr("href", url)
    .attr("download", "test.png")
    .appendTo("body");
  
    a[0].click();
  
    a.remove();
  }