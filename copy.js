const shop = document.querySelector("#shop");

let shopitemdata = [
  {
    id: "1",
    names: "phone",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur.",
    img: "images/iphone.png",
  },
  {
    id: "2",
    names: "Mobiles",
    price: 100,
    desc: "Lorem ipsum dolor sit amet consectetur.",
    img: "images/mobiles.png",
  },
  {
    id: "3",
    names: "Headphone",
    price: 120,
    desc: "Lorem ipsum dolor sit amet consectetur.",
    img: "images/headphone.png",
  },
  {
    id: "4",
    names: "Speakers",
    price: 5000,
    desc: "Lorem ipsum dolor sit amet consectetur.",
    img: "images/speakers.png",
  },
  {
    id: "5",
    names: "Leptop",
    price: 5000,
    desc: "Lorem ipsum dolor sit amet consectetur.",
    img: "images/lapi.png",
  },
  {
    id: "6",
    names: "Watch",
    price: 5000,
    desc: "Lorem ipsum dolor sit amet consectetur.",
    img: "images/Watch.png",
  },
];
//for geting the data fom locls storage/ [] empty is when there is no data than return empty otherwise error will shown
let basket = JSON.parse(localStorage.getItem("data")) || [];
let generateshop = () => {
  return (shop.innerHTML = shopitemdata
    .map((x) => {
      let { img, desc, names, id, price } = x;
      //agar id match hoti hy to else empty arry return//if find somthing than store here if not than empty[]
      let search = basket.find((x) => x.id === id) || [];


      return `
     <div id="product-id-${id}" class="item">
            <img width="200" src="${img}" alt="">
            <div class="details">
                <h3>${names}</h3>
                <p>${desc}</p>
                <div class="price-quantity"> 
                    <h2>$ ${price}</h2>
                </div>
                <div class="buttons">
                    <button onclick="decrement('${id}')" class="btn-minus">-</button>
                    <div id="qty-${id}" class="quantity"> ${search.item === undefined ? 0 : search.item}</div>
                    <button onclick="increment('${id}')"  class="btn-plus">+</button>
                </div>
            </div>

        </div>`;
    })
    .join(""));
};
generateshop();
//-----------------------increment--------------------------------------
let increment = (id) => {
  //    let selecteditem=id;
  let search = basket.find((x) => x.id === id);
  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item++;
  }
  //i want to save the data in local storage when i trigerd the increment and decrement function
  localStorage.setItem("data", JSON.stringify(basket));
  //   console.log(basket);
  updateNum(id);
};
//--------------------------------decrement------------------------------------
let decrement = (id) => {
  let search = basket.find((x) => x.id === id);
  if (search === undefined || search.item === 0)
    return; //dont run the code furthur
  else {
    search.item--;
  }
  localStorage.setItem("data", JSON.stringify(basket));

  //   console.log(basket);

  updateNum(id);
};
//---------------------------------updatenumber-----------------------------------
let updateNum = (id) => {
  //jis cart ki id match ho gi selected id sy
  let search = basket.find((x) => x.id === id);
  //  console.log(search);
  document.getElementById(`qty-${id}`).innerHTML = search.item;
  calculation();
};
let calculation = () => {
  let carticon = document.querySelector(".cartAmount");

  //from this we will got 1,3,4,5 and than 6,7,8 insted 1 /0 means the defult value is 0
  //x is the first value and y is the second
  //console.log(basket.map((x)=>x.item).reduce((x,y)=>x+y,0));
  carticon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
