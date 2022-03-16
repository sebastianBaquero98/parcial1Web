let data = [];
let burgers = [];
let tacos = [];
let salads = [];
let desserts = [];
let das = [];
let count = 0;
let orderDetail = [];
const traerInfo = new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json');
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = () =>{
        data = xhr.response;
        //console.log(data);
        resolve(data);
    }
})

traerInfo.then((response) => {
    response.forEach(category =>{
        if(category.name == 'Burguers'){
            burgers = category.products;
        }else if(category.name == 'Tacos'){
            tacos = category.products;
        }else if(category.name == 'Salads'){
            salads = category.products;
        }
        else if(category.name == 'Desserts'){
            desserts = category.products;
        }else{
            das = category.products;
        }
    })
})


function cargarOrderDetail(){
    const containerMain = document.getElementById('itemsMain');
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const thItem = document.createElement('th');
    const thQty = document.createElement('th');
    const thDes = document.createElement('th');
    const thPrice = document.createElement('th');
    const thAmount = document.createElement('th');
    const thModify = document.createElement('th');

    thItem.innerText = 'Item';
    thQty.innerText = 'Qty';
    thDes.innerText = 'Description';
    thPrice.innerText = 'Unit Price';
    thAmount.innerText = 'Amount';
    thModify.innerText = 'Modify';

    tr.appendChild(thItem);
    tr.appendChild(thQty);
    tr.appendChild(thDes);
    tr.appendChild(thPrice);
    tr.appendChild(thAmount);
    tr.appendChild(thModify);
    thead.appendChild(tr);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    orderDetail.forEach((product,index) =>{
        const tr = document.createElement('tr');

        const item = document.createElement('td');
        item.innerText = index;

        const qty = document.createElement('td');
        qty.innerText = '1';

        const description = document.createElement('td');
        description.innerText = product.description;

        const price = document.createElement('td');
        price.innerText = product.price;

        const amount = document.createElement('td');
        amount.innerText = '';

        const modifyA = document.createElement('td');
        modifyA.innerText = 'A'
        tr.appendChild(item);
        tr.appendChild(qty);
        tr.appendChild(description);
        tr.appendChild(price);
        tr.appendChild(amount);
        tr.appendChild(modifyA);
        tbody.appendChild(tr);

    })
    table.appendChild(tbody);
}
function sumCart(product){
    count++;
    const pTag = document.getElementById('counterCart');
    pTag.innerText = count;
    orderDetail.push(product)

}
function cargarProductos(categoryName){
//console.log('Entro a metodo');
let products = [];
const containerProducts = document.getElementById('itemsMain');
containerProducts.innerHTML = '';
containerProducts.id='itemsMain';
containerProducts.classList.add('row' ,'justify-content-center', 'mt-3');
const titleProducts = document.getElementById('titleMain');
titleProducts.innerText = '';
if(categoryName == 'Burguers'){
    products = burgers;
}else if(categoryName == 'Tacos'){
    products = tacos;
}else if(categoryName == 'Salads'){
    products = salads;
}
else if(categoryName == 'Desserts'){
    products = desserts;
}else{
    products = das;
}
products.forEach(product =>{
    titleProducts.innerText = product.name;
    const card = document.createElement('div');
    card.classList.add("card");
    card.style = 'width: 300px';
    const rowImg = document.createElement('div');
    rowImg.classList.add("row", "justify-content-center", "mt-3");
    const imgCard = document.createElement('img');
    imgCard.src = product.image;
    imgCard.style = 'width: 250px;height:180px';
    rowImg.appendChild(imgCard);
    card.appendChild(rowImg);
    const cardBody = document.createElement('div');
    cardBody.classList.add("card-body");
    const rowTitle = document.createElement('div');
    rowTitle.classList.add("row", "justify-content-center");
    const title = document.createElement('h5');
    title.classList.add("card-title");
    title.innerText = product.name;
    rowTitle.appendChild(title);
    cardBody.appendChild(rowTitle);
    const description = document.createElement('p');
    description.classList.add("card-text");
    description.innerText = product.description;
    cardBody.appendChild(description);
    const price = document.createElement('p');
    price.classList.add("card-text");
    price.innerHTML = `<strong>${product.price}</strong>`;
    cardBody.appendChild(price);
    const rowChkout = document.createElement('div');
    rowChkout.classList.add('row', 'justify-content-center');
    const aBtn = document.createElement('a');
    aBtn.classList.add('btn', 'btn-warning');
    aBtn.innerText = 'Add Cart';
    //aBtn.href = `javascript:sumCart(${product})`;
    //aBtn.href = 'javascript:sumCart()';
    aBtn.setAttribute('href',`javascript:sumCart(${product})`);
    rowChkout.appendChild(aBtn);
    cardBody.appendChild(rowChkout);
    card.appendChild(cardBody);
    containerProducts.appendChild(card);
})
}

