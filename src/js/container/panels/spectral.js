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
  // 显示进度条
  document.getElementById('progress').style.opacity = 1;
  let elem = document.getElementById('progressBar');
  let time = 25; // 25s
  let width = 0;
  let imgs = document.getElementsByClassName('img-show');
  let imgs_num = imgs.length;
  // 图片加载时间
  let img_intevals = [1000, 900, 1100, 1200, 1300, 800, 700, 650, 1350, 1200, 800, 1150, 850, 800, 1200,
    1700, 300, 400, 1600, 1100, 900, 100, 200, 1900, 1800];

  let i = 0, cur_img_intevals = 0;
  let inteval = 50; // 进度条刷新间隔
  let id = setInterval(frame, inteval);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
      document.getElementById("progressNumber").innerHTML = "分割排序完成";
    } else {
      // 进度条样式
      width += inteval / (10 * time);//步长
      elem.style.width = width + '%';
      document.getElementById("progressNumber").innerHTML = width.toFixed(2) * 1 + '%';

      // 图片显示
      cur_img_intevals += inteval;
      if (img_intevals[i] === cur_img_intevals) {
        imgs[i].style.opacity = 1;
        cur_img_intevals = 0;
        ++i;
      }
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