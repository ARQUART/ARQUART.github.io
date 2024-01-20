const form1 = document.querySelector(".user1");
const form2 = document.querySelector(".user2");
const inpt1 = document.querySelector("#date1");
const inpt2 = document.querySelector("#date2");
const users = document.querySelectorAll(".name_input_arq");
let cevap = document.querySelector(".cevap");
let user = {};
let data_element = [];
const data_pin = [];

window.onload = function () {
  let maxTarih = new Date().toISOString().split("T")[0];
  inpt1.setAttribute("max", maxTarih);
  inpt2.setAttribute("max", maxTarih);
};
const appendAlert = (message, type) => {
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  alertPlaceholder.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");
  alertPlaceholder.append(wrapper);
};
function gizle_goster(x) {
  if (x == "0") {
    hidden(form1);
    visible(form2);
  }
  if (x == "1") {
    visible(form1);
    hidden(form2);
    hidden(cevap);
  }
  if (x == "2") {
    hidden(form1);
    hidden(form2);
    visible(cevap);
  }
}
function input_control(x) {
  if (x.value == "") {
    return true;
  } else {
    return false;
  }
}
function gec() {
  if (input_control(inpt1)) {
    appendAlert("Lütfen tarih giriniz !!!", "warning");
  } else {
    gizle_goster("0");
  }
}
function first() {
  gizle_goster("1");
}
function hesapla() {
  if (input_control(inpt2)) {
    appendAlert("Lütfen tarih giriniz !!!", "warning");
  } else {
    gizle_goster("2");
    Calculate_Pin(inpt1);
    Calculate_Pin(inpt2);
    users.forEach((x, i) => {
      user[i + 1] = {
        name: x.value,
      };
    });
    ortak_pin(data_pin[0], data_pin[1]);
    //PİN KODLARI HAZIR PİN1 DE TUTULUYOR
    ["0", "1", "2"].forEach((i) => {
      marix(data_pin[i]);
    });
    ["0", "1", "2", "3"].forEach((i) => {
      print(data_element[2][i], data_element[0][i], data_element[1][i], i);
    });
  }
}

function print(x, y, z, i) {
  let durum = "";
  i == 0 ? (durum = "İletişimde") : "";
  i == 1 ? (durum = "Sevgide") : "";
  i == 2 ? (durum = "Aitlikte") : "";
  i == 3 ? (durum = "Aktiflikte") : "";
  if (Math.abs(x - y) < Math.abs(x - z)) {
    cevap.innerHTML += `${user[1].name} ${durum} ${user[2].name} den daha zayıf <br/> `;
  }
  if (Math.abs(x - y) > Math.abs(x - z)) {
    cevap.innerHTML += ` ${user[2].name} ${durum} ${user[1].name} den daha zayıf <br/>`;
  }
  if (Math.abs(x - y) == Math.abs(x - z)) {
    cevap.innerHTML += `${user[1].name} ve ${user[2].name} ${durum} birbirine eşit uzaklıkta  <br/>`;
  }
}

function ortak_pin(el, el1) {
  let data = [];
  for (let i = 0; i < 8; i++) {
    data.push(parçalaVeTopla(el[i] + el1[i]));
  }
  data_pin.push(data);
}
function marix(x) {
  let hava = 0;
  let su = 0;
  let toprak = 0;
  let ateş = 0;
  let data = [];
  x.forEach((element) => {
    if (element === 1 || element === 5) {
      hava += 1;
    }
    if (element === 2 || element === 7) {
      su += 1;
    }
    if (element === 4 || element === 8) {
      toprak += 1;
    }
    if (element === 3 || element === 6) {
      ateş += 1;
    }
  });
  data.push(hava, su, toprak, ateş);
  data_element.push(data);
}

function Calculate_Pin(x) {
  let tarihDeger = x.value;
  if (tarihDeger === "") {
    appendAlert("Lütfen tarih giriniz !!!", "warning");
  } else {
    let maxTarih = new Date().getFullYear();
    let parcalanmisTarih = tarihDeger.split("-");
    if (maxTarih + 1 > parseInt(parcalanmisTarih[0])) {
      parçala(x);
    } else {
      appendAlert("Lütfen yılı doğru giriniz !!!", "info");
    }
  }
}
function parçala(x) {
  const sayı = x.value.toString().split("").map(Number);
  işle(sayı);
}
function parçala2(x) {
  return x.toString().split("").map(Number);
}
function parçalaVeTopla(x) {
  while (x >= 10) {
    x = parçala2(x).reduce((a, b) => a + b, 0);
  }
  return x;
}
function işle(sayı) {
  let yıl = sayı[0] + sayı[1] + sayı[2] + sayı[3];
  let ay = sayı[5] + sayı[6];
  let gün = sayı[8] + sayı[9];

  yıl = parçalaVeTopla(yıl);
  ay = parçalaVeTopla(ay);
  gün = parçalaVeTopla(gün);

  let v1 = parçalaVeTopla(gün + ay + yıl);
  let v2 = parçalaVeTopla(gün + v1);
  let v3 = parçalaVeTopla(gün + ay);
  let v4 = parçalaVeTopla(yıl + ay);
  let v5 = parçalaVeTopla(v3 + v4);

  let gönder = `${gün}${ay}${yıl}${v1}${v2}${v3}${v4}${v5}`;
  data_pin.push(parçala2(gönder));
}

function visible(el) {
  el.className = "visible";
}
function hidden(el) {
  el.className = "hidden";
}
