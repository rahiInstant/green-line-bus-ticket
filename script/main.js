let orderInfo = [];
let seatNum = 40;
let couponBtn = document.getElementById("coupne-btn");
let couponInput = document.getElementById("coupne-input");
let orderTicketCount = document.getElementById("ordered-ticket");
let grandTotal = document.getElementById("grand-total");
let nextBtn = document.getElementById("next");
let completeBtn = document.getElementById("complete");
let modal = document.getElementById("modal");
let Name = document.getElementById("name");
let phone = document.getElementById("phone");
let mail = document.getElementById("mail");

function updateCart(arr) {
  let orderListParentDiv = document.getElementById("order-info");
  orderListParentDiv.innerHTML = "";
  for (let item of orderInfo) {
    let singleOrder = `
<div id="order-list" class="text-base flex justify-between py-4">
<div class="w-28">${item}</div>
<div class="w-28 pl-5">Economy</div>
<div class="w-28 text-right">550</div>
</div>
`;
    orderListParentDiv.innerHTML += singleOrder;
  }
  document.getElementById("sit-num").innerText = 40 - orderInfo.length;
  orderTicketCount.innerText = orderInfo.length;
  document.getElementById("total-price").innerText = orderInfo.length * 550;
  grandTotal.innerText = orderInfo.length * 550;
  if (orderInfo.length == 4) {
    couponBtn.removeAttribute("disabled");
    couponBtn.style.backgroundColor = "#1DD100";
    couponInput.removeAttribute("disabled");
  } else {
    couponBtn.setAttribute("disabled", true);
    couponBtn.style.backgroundColor = "#bebebe";
    couponInput.setAttribute("disabled", true);
    document.getElementById("coupne-parent").classList.remove("hidden");
  }
}

function bookTicket(event) {
  if (orderInfo.includes(event.target.innerText)) {
    event.target.style.backgroundColor = "#0307121a";
    event.target.style.color = "#03071280";
    orderInfo.splice(orderInfo.indexOf(event.target.innerText), 1);
    if (orderInfo.length <= 0) {
      Name.setAttribute("disabled", true);
      phone.setAttribute("disabled", true);
      mail.setAttribute("disabled", true);
      nextBtn.setAttribute("disabled", true);
      nextBtn.style.backgroundColor = "#bebebe";
      couponInput.value = "";
      Name.value = "";
      phone.value = "";
      mail.value = "";
    }
    updateCart(orderInfo);
  } else {
    if ((orderInfo.length >= 0) & (orderInfo.length < 4)) {
      event.target.style.backgroundColor = "#1DD100";
      event.target.style.color = "#fff";
      if (!orderInfo.includes(event.target.innerText)) {
        orderInfo.push(event.target.innerText);
      }
      updateCart(orderInfo);
      if (orderInfo.length > 0) {
        Name.removeAttribute("disabled");
        phone.removeAttribute("disabled");
        mail.removeAttribute("disabled");
      }
    }
  }
}

function applyCoupon(constant) {
  document.getElementById("coupne-parent").classList.add("hidden");
  grandTotal.innerText = constant * (orderInfo.length * 550);
}

couponBtn.onclick = function () {
  if (couponInput.value == "NEW15") {
    applyCoupon(0.85);
  } else if (couponInput.value == "Couple 20") {
    applyCoupon(0.8);
  }
};

document.getElementById("btn").onclick = function (event) {
  console.log("click");
  event.preventDefault();
  document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
};

nextBtn.addEventListener("click", function () {
  modal.classList.remove("opacity-0");
  modal.classList.remove("pointer-events-none");
});

completeBtn.addEventListener("click", function () {
  modal.classList.add("opacity-0");
  modal.classList.add("pointer-events-none");
});

[Name, phone, mail].forEach((item) => {
  item.addEventListener("change", function () {
    if (Name.value != "" && (phone.value != "") & (mail.value != "")) {
      nextBtn.removeAttribute("disabled");
      nextBtn.style.backgroundColor = "#1DD100";
    } else if (Name.value == "" && (phone.value == "") & (mail.value == "")) {
      nextBtn.setAttribute("disabled", true);
      nextBtn.style.backgroundColor = "#bebebe";
    }
  });
});


completeBtn.onclick = function() {
  Name.value = ''
  phone.value = ''
  mail.value = ''
  nextBtn.setAttribute('disabled', true)
  
}