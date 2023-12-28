let form1 = document.querySelector(".user1");
let form2 = document.querySelector(".user2");
let cevap = document.querySelector(".cevap");

function gec(){
    hidden(form1);
    visible(form2)
}
function first(){
    visible(form1);
    hidden(form2)
}
function hesapla(){
    hidden(form1);
    hidden(form2);
    visible(cevap);
    cevap.innerHTML = `deneme`

}
function visible(göster) {
    göster.style.display = "block";
  }
function hidden(sil) {
    sil.style.display = "none";
  }