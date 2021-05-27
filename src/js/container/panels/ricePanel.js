document.getElementById('select_for_segementation').addEventListener('change', show_select_segementation);

function show_select_segementation() {
    let svg = document.getElementById('check_icon_segementation');
    let c = document.getElementById('circle3');
    let t = document.getElementById('tick3');
  
    svg.style.opacity = 1;
    c.style.animationPlayState = "running";
    t.style.animationPlayState = "running";
  
    let host = "ws://127.0.0.1:9999/"
    let socket = new WebSocket(host);

    let fileName = "\\UAV\\rgb\\" + this.files[0].name;
    
    async function sendfile() {
      socket.send(fileName);
    }
    socket.onopen = () => {
      console.log("select连接成功");
      sendfile();
      console.log("select传输完成")
      socket.close();
    }
    socket.onclose = () => { 
      console.log("select连接关闭");
      socket = null;
    }

    let beforeSeg = document.createElement('img');
    beforeSeg.src=fileName;
    beforeSeg.classList.add('img-show');
    document.getElementById('imgBox').appendChild(beforeSeg);
    setTimeout(() => {
      beforeSeg.style.opacity = 1;
    }, 1000);
}


document.getElementById('btnRiceSeg').addEventListener('click', Seg);

function Seg() {
    let fileName = null;
    let host = "ws://127.0.0.1:9999/"
    let socket = new WebSocket(host);
    socket.onopen = () => {
      console.log("rice连接成功");
    }
    socket.onmessage = msg => {
      fileName = msg.data;
      console.log(fileName);
      socket.close();
    }
    socket.onclose = () => {
      console.log("rice连接关闭");
      socket = null;
    }
  
    let afterSeg = document.createElement('img');
    afterSeg.src = "\\UAV\\rgb\\"+fileName;
    afterSeg.classList.add('img-show');
    document.getElementById('imgBox').appendChild(afterSeg);
    setTimeout(() => {
      afterSeg.style.opacity = 1;
    }, 1000);
}

document.getElementById('btnEstimate').addEventListener('click', Estimate);

function Estimate() {
    let num = 0;
    let host = "ws://127.0.0.1:9999/"
    let socket = new WebSocket(host);
    socket.onopen = () => {
      console.log("estimate连接成功");
    }
    socket.onmessage = msg => {
      num = msg.data.split('_')[1];
      console.log(num);
      socket.close();
    }
    socket.onclose = () => {
      console.log("estimate连接关闭");
      socket = null;
    }
    // let num = (Math.random() * 2.5 + 10).toFixed(2);
    setTimeout(() => {
      document.getElementById('pEstimate').innerHTML = "预估产量: <b>" + num + "</b> t/ha.";
    }, 500)
}