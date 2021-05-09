// 文件选定icon显示
document.getElementById('select_for_calibration').addEventListener('change', show_select_calibration);
document.getElementById('select_for_calibration2').addEventListener('change', show_select_calibration2);


function show_select_calibration() {
  let svg = document.getElementById('check_icon_calibration');
  let c = document.getElementById('circle1');
  let t = document.getElementById('tick1')
  svg.style.opacity = 1;
  c.style.animationPlayState = "running";
  t.style.animationPlayState = "running";
}

function show_select_calibration2() {
  console.log('fuck');
  let svg = document.getElementById('check_icon_calibration2');
  let c = document.getElementById('circle2');
  let t = document.getElementById('tick2')
  svg.style.opacity = 1;
  c.style.animationPlayState = "running";
  t.style.animationPlayState = "running";
}

// 波长选择
document.getElementById('wavelen_confirm').addEventListener('click', wavelen_confirm);
document.getElementById('wavelen_box1').addEventListener('keyup', wavelen_recover);
document.getElementById('wavelen_box2').addEventListener('keyup', wavelen_recover);

function wavelen_confirm() {
  this.innerText = "已确定";
}

function wavelen_recover() {
  let btn = document.getElementById('wavelen_confirm');
  btn.innerText = "确定";
}

// 进度条
document.getElementById('btnProgressBar').addEventListener('click', progress_move);

function progress_move() {
  document.getElementById('progress').style.opacity = 1;
  let time = 25; // 25s
  let inteval = 100; // 更新间隔0.1s
  let elem = document.getElementById('progressBar');
  let width = 0;
  let id = setInterval(frame, inteval);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
      document.getElementById("progressNumber").innerHTML = "分割排序完成";
    } else {
      width += inteval / (10 * time);//步长
      elem.style.width = width + '%';
      document.getElementById("progressNumber").innerHTML = width.toFixed(2) * 1 + '%';
    }
  }
}

// 格式选择
document.getElementById('ENVI').addEventListener('click', function () {
  this.style.backgroundColor = "black";
  this.style.color = "white";

  let tiff = document.getElementById('TIFF');
  tiff.style.backgroundColor = "white";
  tiff.style.color = "black";
});

document.getElementById('TIFF').addEventListener('click', function () {
  this.style.backgroundColor = "black";
  this.style.color = "white";

  let tiff = document.getElementById('ENVI');
  tiff.style.backgroundColor = "white";
  tiff.style.color = "black";
});