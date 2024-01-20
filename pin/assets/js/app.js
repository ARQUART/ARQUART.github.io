const tarih = document.querySelector("#tarih");
const arq = document.querySelector("#arq");
const arq_btn = document.querySelector("#arq-btn");
const yoket = document.querySelector('input[type="date"]');
const başlık = document.querySelector("#başlık");
const arq_hesapla_btn = document.querySelector(".hsp");
const arq_yenile_btn = document.querySelector("#arq_yenile");
const checkbox1 = document.getElementById("checkbox1");
const checkbox2 = document.getElementById("checkbox2");
let durum = null;
const checkbox = document.querySelector(".ch1");
let modal = "denem";
$(document).ready(function () {
  $("#deneme").modal("show");
});
window.onload = function () {
  let maxTarih = new Date().toISOString().split("T")[0];
  tarih.setAttribute("max", maxTarih);
  //document.querySelector(".card").innerHTML += createModal();
};

async function yorumv2(a) {
  try {
    const response = await fetch("assets/json/yorumv2.json");
    const data = await response.json();
    //myData = data;
    return data[a[0]][a[2]];
  } catch (err) {
    console.error(err);
  }
}
async function yorum(a) {
  try {
    const response = await fetch("assets/json/yorum.json");
    const data = await response.json();
    //myData = data;
    return data[a];
  } catch (err) {
    console.error(err);
  }
}

async function yazdır(arq) {
  let response;
  if (durum) {
    response = await yorumv2(`${arq}`);
    document.getElementById("yorum_body").innerHTML += `<br/><hr>${response} `;
    $("#yorum").modal("show");
    if (arq[0] === "8") {
      durum = false;
    }
  } else {
    response = await yorum(`${arq}`);
    document.querySelector(
      "p"
    ).innerHTML += `<br/><hr> ${arq[0]}.Sayı :  ${response} `;
  }
}
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
function hesapla() {
  if (checkbox1.checked) {
    durum = false;
  } else if (checkbox2.checked) {
    durum = true;
  }
  if (durum == null) {
    appendAlert("Lütfen Kısa veya uzun yorum tercihi yapınız !!!", "warning");
  } else {
    let tarihDeger = tarih.value;
    if (tarihDeger === "") {
      appendAlert("Lütfen tarih giriniz !!!", "warning");
    } else {
      let maxTarih = new Date().getFullYear();
      let parcalanmisTarih = tarihDeger.split("-");
      if (maxTarih + 1 > parseInt(parcalanmisTarih[0])) {
        durumkontrol();
        parçala();
      } else {
        appendAlert("Lütfen yılı doğru giriniz !!!", "info");
      }
    }
  }
}
function durumkontrol() {
  checkbox.checked ? console.log("deneme") : "";
}
function parçala() {
  const sayı = tarih.value.toString().split("").map(Number);
  işle(sayı);
}
function parçala2(x) {
  return x.toString().split("").map(Number);
}
function işle(sayı) {
  let yıl = sayı[0] + sayı[1] + sayı[2] + sayı[3];
  let ay = sayı[5] + sayı[6];
  let gün = sayı[8] + sayı[9];

  function parçalaVeTopla(x) {
    while (x >= 10) {
      x = parçala2(x).reduce((a, b) => a + b, 0);
    }
    return x;
  }

  yıl = parçalaVeTopla(yıl);
  ay = parçalaVeTopla(ay);
  gün = parçalaVeTopla(gün);

  let v1 = parçalaVeTopla(gün + ay + yıl);
  let v2 = parçalaVeTopla(gün + v1);
  let v3 = parçalaVeTopla(gün + ay);
  let v4 = parçalaVeTopla(yıl + ay);
  let v5 = parçalaVeTopla(v3 + v4);

  let gönder = `${gün}${ay}${yıl}${v1}${v2}${v3}${v4}${v5}`;
  document.getElementById("cevap").innerText = "PİN KODUNUZ : " + gönder;

  ["1", "2", "3", "4", "5", "6", "7", "8"].forEach((i) => {
    yazdır(`${i}_${parçalaVeTopla(Number(gönder[i - 1]))}`);
  });

  arq_yoket();
  visible(arq_yenile_btn);
}
function visible(göster) {
  göster.style.display = "block";
}
function hidden(sil) {
  sil.style.display = "none";
}
function arq_yoket() {
  hidden(yoket);
  hidden(başlık);
  hidden(arq_hesapla_btn);
  visible(arq);
  visible(arq_btn);
  hidden(checkbox);
}
function reverse() {
  yoket.value = "";
  visible(yoket);
  visible(başlık);
  visible(arq_hesapla_btn);
  hidden(arq);
  hidden(arq_btn);
  hidden(arq_yenile_btn);
  visible(checkbox);
  checkbox1.checked = false;
  checkbox1.disabled = false;
  checkbox2.checked = false;
  checkbox2.disabled = false;
  durum = null;
}
function modalkapa() {
  // Modalı kapat
  reverse();
  $("#deneme").modal("hide");
  // Div'i kaldır
  var divToClose = document.getElementById("divToClose");
  // divToClose.parentNode.removeChild(divToClose);
}
function yorumkapa() {
  // Modalı kapat
  reverse();
  $("#yorum").modal("hide");
  // Div'i kaldır
  var divToClose = document.getElementById("divToClose");
  divToClose.parentNode.removeChild(divToClose);
}
function toggleCheckbox(checkbox) {
  const otherCheckboxId =
    checkbox.id === "checkbox1" ? "checkbox2" : "checkbox1";
  const otherCheckbox = document.getElementById(otherCheckboxId);

  // Eğer bir checkbox seçildiyse, diğerini pasif hale getir
  if (checkbox.checked) {
    otherCheckbox.disabled = true;
  } else {
    otherCheckbox.disabled = false;
  }
}
