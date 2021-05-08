function openPage(pageName, elmnt, color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "black";
  }
  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = color;
}

document.getElementById("defaultOpen").click();

// 文件选定icon显示
document.getElementById('select_for_calibration').addEventListener('change', show_select_calibration);
document.getElementById('select_for_joint').addEventListener('change', show_select_joint);
document.getElementById('select_for_calibration2').addEventListener('change', show_select_calibration2);


function show_select_calibration() {
  let svg = document.getElementById('check_icon_calibration');
  let c = document.getElementById('circle');
  let t = document.getElementById('tick')
  svg.style.opacity = 1;
  c.style.animationPlayState = "running";
  t.style.animationPlayState = "running";
}

function show_select_joint() {
  let icon = document.querySelector('#check_icon_joint');
  icon.style.opacity = 1;
}
function show_select_calibration2() {
  let icon = document.querySelector('#check_icon_calibration2');
  icon.style.opacity = 1;
}


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

document.getElementById('btnFileFormatTransform').addEventListener('click', file_format_transfer);

function file_format_transfer() {
  this.innerText = "正在转化中...";
  setTimeout(() => { this.innerText = "转化已完成!"; }, 3000);
}

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

document.getElementById('btnImageShow').addEventListener('click', () => { document.getElementById('imgShow').style.opacity = 1; })