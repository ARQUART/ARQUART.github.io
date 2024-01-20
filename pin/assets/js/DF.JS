const resultElement = document.querySelector("#arq");
const calculateButton = document.querySelector("#arq-btn");
const dateInput = document.querySelector('input[type="date"]');
const titleElement = document.querySelector("#başlık");
const calculateButtonElement = document.querySelector(".hsp");
const refreshButtonElement = document.querySelector("#arq_yenile");
const shortCommentCheckbox = document.getElementById("checkbox1");
const longCommentCheckbox = document.getElementById("checkbox2");
let status = null;
const checkboxContainer = document.querySelector(".ch1");
let modal = "denem";

$(document).ready(function () {
  $("#deneme").modal("show");
});

window.onload = function () {
  let maxTarih = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("max", maxTarih);
};

async function shortComment(a) {
  try {
    const response = await fetch("assets/json/yorumv2.json");
    const data = await response.json();
    return data[a[0]][a[2]];
  } catch (err) {
    console.error(err);
  }
}

async function longComment(a) {
  try {
    const response = await fetch("assets/json/yorum.json");
    const data = await response.json();
    return data[a];
  } catch (err) {
    console.error(err);
  }
}

async function printComment(a) {
  let response;
  if (status) {
    response = await shortComment(`${a}`);
    resultElement.innerHTML += `<br/><hr>${response} `;
    $("#yorum").modal("show");
    if (a[0] === "8") {
      status = false;
    }
  } else {
    response = await longComment(`${a}`);
    document.querySelector(
      "p"
    ).innerHTML += `<br/><hr> ${a[0]}.Sayı :  ${response} `;
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

function calculate() {
  if (shortCommentCheckbox.checked) {
    status = false;
  } else if (longCommentCheckbox.checked) {
    status = true;
  }
  if (status === null) {
    appendAlert("Lütfen Kısa veya uzun yorum tercihi yapınız !!!", "warning");
  } else {
    let dateValue = dateInput.value;
    if (dateValue === "") {
      appendAlert("Lütfen tarih giriniz !!!", "warning");
    } else {
      let currentYear = new Date().getFullYear();
      let splitDate = dateValue.split("-");
      if (currentYear + 1 > parseInt(splitDate[0])) {
        statusCheck();
        splitAndCalculate();
      } else {
        appendAlert("Lütfen yılı doğru giriniz !!!", "info");
      }
    }
  }
}

function statusCheck() {
  checkboxContainer.checked ? console.log("deneme") : "";
}

function splitAndCalculate() {
  const numbers = dateInput.value.toString().split("").map(Number);
  process(numbers);
}

function splitAndCalculate2(x) {
  return x.toString().split("").map(Number);
}

function process(numbers) {
  let year = numbers[0] + numbers[1] + numbers[2] + numbers[3];
  let month = numbers[5] + numbers[6];
  let day = numbers[8] + numbers[9];

  function splitAndSum(x) {
    while (x >= 10) {
      x = splitAndCalculate2(x).reduce((a, b) => a + b, 0);
    }
    return x;
  }

  year = splitAndSum(year);
  month = splitAndSum(month);
  day = splitAndSum(day);

  let v1 = splitAndSum(day + month + year);
  let v2 = splitAndSum(day + v1);
  let v3 = splitAndSum(day + month);
  let v4 = splitAndSum(year + month);
  let v5 = splitAndSum(v3 + v4);

  let result = `${day}${month}${year}${v1}${v2}${v3}${v4}${v5}`;
  document.getElementById("cevap").innerText = "PİN KODUNUZ : " + result;

  ["1", "2", "3", "4", "5", "6", "7", "8"].forEach((i) => {
    printComment(`${i}_${splitAndSum(Number(result[i - 1]))}`);
  });

  reset();
}

function show(element) {
  element.style.display = "block";
}

function hide(element) {
  element.style.display = "none";
}

function reset() {
  dateInput.value = "";
  show(dateInput);
  show(titleElement);
  show(calculateButtonElement);
  hide(resultElement);
  hide(calculateButton);
  hide(refreshButtonElement);
  show(checkboxContainer);
  shortCommentCheckbox.checked = false;
  shortCommentCheckbox.disabled = false;
  longCommentCheckbox.checked = false;
  longCommentCheckbox.disabled = false;
  status = null;
}

function closeModal() {
  reset();
  $("#deneme").modal("hide");
}

function closeCommentModal() {
  reset();
  $("#yorum").modal("hide");
}
