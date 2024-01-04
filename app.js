// object ma iterate karne k liye  for IN use hota hai
// array ma iterate karne k liye for OF  use hota  hai
const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropDowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
let formCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropDowns) {
  for (currCode in countryList) {
    let newOptions = document.createElement("option");
    newOptions.innerText = currCode;
    newOptions.value = currCode;
    if (select.name === "from" && currCode === "INR") {
      newOptions.selected = "yahan kuch v lik sakte hain";
    } else if (select.name === "to" && currCode === "USD") {
      newOptions.selected = "yahan kuch v lik sakte hain";
    }
    select.append(newOptions);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal <= 0) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${formCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${formCurr.value} = ${finalAmount} $${toCurr.value}`;
});
