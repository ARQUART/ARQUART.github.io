const tarih = document.querySelector("#tarih");
  const arq = document.querySelector("#arq");
  const arq_btn = document.querySelector("#arq-btn");
  const yoket = document.querySelector('input[type="date"]');
  const başlık = document.querySelector("#başlık");
  const arq_hesapla_btn = document.querySelector(".hsp");
  const arq_yenile_btn = document.querySelector("#arq_yenile");
let threshold = 3;

window.onload = function() {
  var maxTarih = new Date().toISOString().split('T')[0];
  tarih.setAttribute('max', maxTarih);
};

async function test(a) {
  try {
    const response = await fetch("assets/json/yorum.json");
    const data = await response.json();
    //myData = data;
    return data[a]
  } catch (err) {
    console.error(err);
  }
}



async function yazdır(arq) {
  let response = await test(`${arq}`)

  document.querySelector("p").innerHTML +=  `<br/><hr> ${arq[0]}.Sayı :  ${response} `;

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
  var tarihDeger = tarih.value;
      if (tarihDeger === "") {
        appendAlert('Lütfen tarih giriniz !!!', 'warning')
        setTimeout(function() {
          var closeButton = document.getElementById('myButton');
          if (closeButton) {
            closeButton.click();
          }
        }, 6000);
      }else{
        var maxTarih = new Date().getFullYear();
        var parcalanmisTarih = tarihDeger.split("-");
        if(maxTarih + 1 > parseInt(parcalanmisTarih[0])){
          parçala();
        }else{
          appendAlert('Lütfen yılı doğru giriniz !!!', 'info');
        }
        
      }
  }
function parçala (){
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

  let v1 = parçalaVeTopla(gün +ay + yıl);
  let v2 = parçalaVeTopla(gün + v1);
  let v3 = parçalaVeTopla(gün + ay);
  let v4 = parçalaVeTopla(yıl + ay);
  let v5 = parçalaVeTopla(v3 + v4);

  let gönder = `${gün}${ay}${yıl}${v1}${v2}${v3}${v4}${v5}`;
  document.getElementById("cevap").innerText = "PİN KODUNUZ : " + gönder;

  ["1", "2", "3", "4", "5", "6", "7", "8"].forEach(i => {
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
function arq_yoket(){
  hidden(yoket);
  hidden(başlık);
  hidden(arq_hesapla_btn);
  visible(arq);
  visible(arq_btn);
}
function reverse (){
  yoket.value = "";
  visible(yoket);
  visible(başlık);
  visible(arq_hesapla_btn);
  hidden(arq);
  hidden(arq_btn);
  hidden(arq_yenile_btn);
}

