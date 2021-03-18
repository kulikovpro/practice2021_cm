/* Основной код для вывода названия кофе на дисплей */
let money = document.getElementById("money");
let display = document.getElementById("display");
let bill_acc = document.getElementById("bill_acc");
let displayInfo = document.getElementById("displayInfo");
let displayBalance = document.getElementById("displayBalance");
let progressBar = document.getElementsByClassName("progress-bar")[0];
let change_box = document.getElementById("change_box");
let lock = document.getElementById("lock");
let progress = 0;
let coffee_mug = document.getElementById("coffee_mug");

function getCoffee(coffeName, price) {
   if (+money.value >= price) {
      money.value = +money.value - price;
      displayBalance.innerText = money.value;
      let timerId = setInterval(() => {
         lock.hidden = false;
         if (progress > 105) {
            clearInterval(timerId);
            progressBar.hidden = true;
            progressBar.style.width = 0 + '%';
            displayInfo.innerHTML = `<i class="fas fa-mug-hot"></i> Кофе ${coffeName} готов`;
            progress = 0;
            coffee_mug.style.opacity = 1;
            lock.hidden = true;
            progress.style.width = '0%';
            return;
         }
         else if (progress < 40) displayInfo.innerHTML = `<i class="fas fa-hourglass-start"></i> Приготовление...`;
         else if (progress < 80) displayInfo.innerHTML = `<i class="fas fa-hourglass-half"></i> Приготовление...`;
         else displayInfo.innerHTML = `<i class="fas fa-hourglass-end"></i> Приготовление...`;
         progressBar.hidden = false;
         progressBar.style.width = ++progress + '%';
      }, 100);
      let audio = new Audio("audio/coffee2.mp3");
      audio.play();
   } else {
      displayInfo.innerHTML = `<i class="far fa-frown"></i> Недостаточно средств`;
   }
}

let banknotes = document.querySelectorAll("[src$='rub.jpg']"); // Коллекция (Как бы массив)
let zIndex = 1;
for (let i = 0; i < banknotes.length; i++) { // Перебираем коллекцию
   let banknote = banknotes[i]; // Записываем очередной элемент коллекции в переменную
   banknote.onmousedown = function (e) {
      this.ondragstart = function () { return false; }
      this.style.position = 'absolute';
      this.style.zIndex = ++zIndex;
      this.style.transform = 'rotate(90deg)';
      moveAt(e);
      function moveAt(event) {
         banknote.style.top = (event.clientY - banknote.offsetHeight / 2) + 'px';
         banknote.style.left = (event.clientX - banknote.offsetWidth / 2) + 'px';
      }
      document.addEventListener('mousemove', moveAt);
      this.onmouseup = function () {
         document.removeEventListener('mousemove', moveAt);
         let bill_acc_top = bill_acc.getBoundingClientRect().top; // Верх купюроприёмника
         let bill_acc_bottom = bill_acc.getBoundingClientRect().bottom - (bill_acc.getBoundingClientRect().height * 2 / 3);
         let bill_acc_left = bill_acc.getBoundingClientRect().left;
         let bill_acc_right = bill_acc.getBoundingClientRect().right;
         let banknote_top = this.getBoundingClientRect().top; // Верх купюры
         let banknote_left = this.getBoundingClientRect().left;
         let banknote_right = this.getBoundingClientRect().right;
         if (bill_acc_top < banknote_top && bill_acc_bottom > banknote_top && bill_acc_left < banknote_left && bill_acc_right > banknote_right) {
            money.value = (+money.value) + (+this.dataset.value);
            displayBalance.innerText = money.value;
            this.hidden = true;
         }
      }
   }
}

/* Основной код для расчета сдачи */
function getChange(num) {
   let change_box_h = change_box.getBoundingClientRect().height - 60;
   let change_box_w = change_box.getBoundingClientRect().width - 60;
   let change = 0;
   let top = Math.random() * change_box_h;
   let left = Math.random() * change_box_w;
   if (num >= 10) change = 10;
   else if (num >= 5) change = 5;
   else if (num >= 2) change = 2;
   else if (num >= 1) change = 1;
   else {
      money.value = "";
      displayInfo.innerText = "Забрите сдачу";
      displayBalance.innerText = 0;
      let audio = new Audio("audio/coins.mp3");
      audio.play();
      return;
   }

   if (change > 0) {
      change_box.innerHTML += `<img onclick='this.style.display="none";' src="img/${change}rub.png" style="top:${top}px;left:${left}px;">`;
      console.log(change);
      getChange(num - change);
   }
}

/* Дополнительный код через цикл для расчета сдачи */
// function getChangeNeu(num) {
//    let change = 0;
//    for (let i = 0; i < num; i = i + change) {
//       if ((num - i) >= 10) change = 10;
//       else if ((num - i) >= 5) change = 5;
//       else if ((num - i) >= 2) change = 2;
//       else if ((num - i) >= 1) change = 1;

//       console.log(change);
//    }
// }

// /* Основной код для перемещения купюр */
// let banknotes = document.querySelectorAll("[src$='rub.jpg']");
// for (let i = 0; i < banknotes.length; i++) {
//    let banknote = banknotes[i];
//    banknote.onmousedown = function () {
//       this.ondragstart = function () { return false; }
//       this.style.position = 'absolute';
//       this.style.zIndex = 2;
//       function moveAt(event) {
//          banknote.style.top = (event.clientY - banknote.offsetHeight / 2) + 'px';
//          banknote.style.left = (event.clientX - banknote.offsetWidth / 2) + 'px';
//       }
//       document.addEventListener('mousemove', moveAt);
//       this.onmouseup = function () {
//          document.removeEventListener('mousemove', moveAt);
//          this.style.zIndex = 1;
//       }
//    }
// }
