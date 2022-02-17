// Constantes.
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;
var id = 0;

// Entrada.
const products = [
  {
    description: "Goma de borrar",
    price: 0.25,
    tax: LOWER_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Lápiz H2",
    price: 0.4,
    tax: LOWER_TYPE,
    stock: 5,
    units: 0,
  },
  {
    description: "Cinta rotular",
    price: 9.3,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Papelera plástico",
    price: 2.75,
    tax: REGULAR_TYPE,
    stock: 5,
    units: 0,
  },
  {
    description: "Escuadra",
    price: 8.4,
    tax: REGULAR_TYPE,
    stock: 3,
    units: 0,
  },
  {
    description: "Pizarra blanca",
    price: 5.95,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Afilador",
    price: 1.2,
    tax: LOWER_TYPE,
    stock: 10,
    units: 0,
  },
  {
    description: "Libro ABC",
    price: 19,
    tax: EXEMPT_TYPE,
    stock: 2,
    units: 0,
  },
];

var list = document.getElementById("list");

var createProducts = product => {
  var input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("id", id++)
        input.setAttribute("value", 0);
        input.setAttribute("min", 0);
        input.setAttribute("max", product.stock);

        input.addEventListener("change", event => {
          product.units = event.target.valueAsNumber;
          btnDisabled();
        });

        var li = document.createElement("li");
        li.setAttribute("class", "product-unit");
        li.appendChild(document.createTextNode(product.description + ' - ' + product.price + '€/Und'));

        list.appendChild(li);
        li.appendChild(input);
}

var showProducts = productList => {
  for (product of productList) {
    createProducts(product);
  }
}

showProducts(products);

var unitSubtotal = (unitPrice, unit) => unitPrice * unit;
var unitTax = (unitSubtotal, typeTax) => unitSubtotal * typeTax / 100;
var priceTotal = (Subtotal, taxes) => Subtotal + taxes;

var total = () => {
  subTotal = 0;
  taxes = 0
  for (product of products) {
    subTotal += unitSubtotal(product.price, product.units );
    taxes += unitTax((product.price * product.units), product.tax);
  }
  printTotal = priceTotal(subTotal, taxes)

  document.getElementById("subtotal").innerHTML = subTotal + ' €';
  document.getElementById("taxes").innerHTML = taxes  + ' €';
  document.getElementById("total").innerHTML = printTotal  + ' €';
}

var btn = document.getElementById('btn');
btn.addEventListener("click", total);

var btnDisabled = () =>{
  for (product of products) {
    if (product.units > 0) {
      btn.disabled = false;
      return;
    } 
    else {
      btn.disabled = true;
    }
  }
}
btnDisabled();
