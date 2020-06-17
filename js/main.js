'use strict';

{
  const start = document.getElementById('start');
  const card = document.getElementById('card');
  const count = document.getElementById('count');
  const right = document.getElementById('right');
  const explantaion = document.getElementById('explanation');
  const answer = document.getElementById('answer');
  const text = document.getElementById('text');
  const submit = document.getElementById('submit');
  const retry = document.getElementById('retry');

  const correct = document.getElementById('correct');
  const incorrect = document.getElementById('incorrect');
  
  const pic1 = document.getElementById('pic1');
  const pic2 = document.getElementById('pic2');
  const pic3 = document.getElementById('pic3');
  const pic4 = document.getElementById('pic4');
  const pic5 = document.getElementById('pic5');
  const pics = [pic1, pic2, pic3, pic4, pic5];

  const video1 = document.getElementById('video1');
  const video2 = document.getElementById('video2');
  const video3 = document.getElementById('video3');
  const video4 = document.getElementById('video4');
  const video5 = document.getElementById('video5');
  let videos1 = shuffle1([video1, video2, video3, video4, video5]);
  let videos2 = [video1, video2, video3, video4, video5];
  let videos3 = random(videos2);
  // console.log(videos3);
  const two = {
    [video1.id]: pic1,
    [video2.id]: pic2,
    [video3.id]: pic3,
    [video4.id]: pic4,
    [video5.id]: pic5,
  };
  // console.log(two);
  
  let num = 0;
  let names = [];
  let corrects = 0;
  let incorrects = 0;
  
  
  function countUp() {
    num++;
    count.innerText = num;
  }

  function shuffle1(arr) {
    for (let i = arr.length - 1; i > 0; i --) {
      const j  = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }
  
  function random(video) {
    let videos = video;
    let arrayVideo = [];
    for (let i = 0; i < 10; i++) {
      let index = Math.floor(Math.random() * (videos.length));
      arrayVideo.push(video[index]);
    }
    return arrayVideo;
  }
  
  function questions() {
    if(num < 6) {
      card.style.display = 'none';
      answer.style.display = 'block';
      videos1[num - 1].style.display = 'block';
    } else {;
      card.style.display = 'none';
      answer.style.display = 'block';
      videos3[num - 6].style.display = "block";
    }
  }

  function answers() {
    if(text.value == "") {
      return;
    }
    check();
    countUp();
    play();
  }

  function check() {
    let name = text.value;
    if(num < 6) {
      names.push({video:[videos1[num - 1].id], name: name});
      // console.log(names);
      // console.log(names[num - 1].video);
    } else {
      let a ={video:[videos3[num - 6].id], name: name};
      let b = names.some(
        b => b.id === a.id && b.name === a.name
      );
      // console.log(a);
      // console.log(b);
      if(b) {
        corrects++;
        correct.innerText = corrects;
        // console.log(corrects);
      } else {
        incorrects++;
        incorrect.innerText = incorrects;
        // console.log(incorrects);
      }
    }
  }

  function play() {
    card.style.display = 'block';
    answer.style.display = 'none';
    if(num < 7) {
      videos1[num - 2].style.display = 'none';
      two[videos1[num - 2].id].style.display = 'block';
    } else {
      videos3[num - 7].style.display = 'none';
      two[videos3[num - 7].id].style.display = 'block';
    }
  }

  function finish() {
    check();
    retry.style.display = 'block';
    card.style.display = 'block';
    answer.style.display = 'none';
    card.classList.add('card');
    // console.log(videos3[num - 6]);
    // console.log(num);
    videos3[num - 6].style.display = 'none';
    two[videos3[num - 6].id].style.display = 'block';
  }

  function replay() {
    retry.style.display = 'none';
    start.style.display = 'block';
    two[videos3[num - 6].id].style.display = 'none';
    corrects = 0;
    correct.innerText = corrects;
    incorrects = 0;
    incorrect.innerText = incorrects;
    num = 0;
    count.innerText = num;
    names = [];
    videos1 = shuffle1([video1, video2, video3, video4, video5]);
    // console.log(videos1);
    videos3 = random(videos2);
    // console.log(videos3);
  }

  start.addEventListener('click', () => {
    start.style.display = 'none';
    card.classList.remove('card');
  });
  
  card.addEventListener('click', () => {
      text.value = '';
      if(num === 0) {
        countUp();
      } else if (num > 1 && num < 7) {
      two[videos1[num - 2].id].style.display = 'none';
    } else if(num > 6) {
      two[videos3[num - 7].id].style.display = 'none';
    }
    // console.log(num);
    questions();
  });

  submit.addEventListener('click', () => {
    if(num < 15) {
      answers();
    } else {
      finish();
    }
  });

  retry.addEventListener('click', () => {
    replay();
  });

  right.addEventListener('click', () => {
    if(explantaion.style.display == 'block') {
      explantaion.style.display = 'none';
    } else {
      explantaion.style.display = 'block';
    }
  });
}