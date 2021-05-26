document.getElementById('select_for_segementation').addEventListener('change', show_select_segementation);

function show_select_segementation() {
    let svg = document.getElementById('check_icon_segementation');
    let c = document.getElementById('circle3');
    let t = document.getElementById('tick3');

    let img_before_seg = document.getElementById('beforeSeg');

    setTimeout(() => {
        img_before_seg.style.opacity = 1;
    }, 1000);
    svg.style.opacity = 1;
    c.style.animationPlayState = "running";
    t.style.animationPlayState = "running";
}


document.getElementById('btnRiceSeg').addEventListener('click', Seg);

function Seg() {
    let img_before_seg = document.getElementById('beforeSeg');
    let img_after_seg = document.getElementById('afterSeg');
    let p_seg_complete = document.getElementById('pSegComplete');

    setTimeout(() => {
        p_seg_complete.style.opacity = 1;
        img_before_seg.style.opacity = 0;
        img_after_seg.style.opacity = 1;
    }, 1000);
}

document.getElementById('btnEstimate').addEventListener('click', Estimate);

function Estimate() {
    let num = (Math.random() * 2.5 + 10).toFixed(2);
    setTimeout(() => {
        document.getElementById('pEstimate').innerHTML = "预估产量: <b>" + num + "</b> t/ha.";
    }, 500)
}