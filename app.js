let data = [];
let burgers = [];
let tacos = [];
let salads = [];
let desserts = [];
let das = [];
let count = 0;
let orderDetail = [];
let orderNames = [];


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
});

function cargarOrderDetail(){
    
    
    if(document.getElementById('rowTotals')){
        const r = document.getElementById('rowTotals')
        r.remove();
    }
    
    const containerMain = document.getElementById('itemsMain');
    const itemArea = document.getElementById('itemArea');
    containerMain.innerHTML = '';
    containerMain.id='itemsMain';
    containerMain.classList.add('row' ,'justify-content-center', 'mt-3');
    const titleProducts = document.getElementById('titleMain');
    titleProducts.innerText = 'ORDER DETAIL';
    titleProducts.style = 'font-weight:700; font-size: 30px;border-bottom: 1px solid #000';
    
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
    let sumaPedido = 0;
    console.log(orderDetail);
    orderDetail.forEach((product,index) =>{
        const tr = document.createElement('tr');

        const item = document.createElement('td');
        item.innerText = index;

        const qty = document.createElement('td');
        qty.innerText = product.amount;

        const description = document.createElement('td');
        description.innerText = product.description;

        const price = document.createElement('td');
        price.innerHTML = product.price;

        const amount = document.createElement('td');
        amount.innerText = product.amount * product.price;

        const modifyA = document.createElement('td');
        const buttonAdd = document.createElement('button');
        buttonAdd.classList.add('btn');
        buttonAdd.style = 'background-color: #FDCD55;color:white;margin-right:10px;'
        buttonAdd.innerText = '+';
        let strin = JSON.stringify(product);
        buttonAdd.setAttribute('onClick',`javascript:addOne(${strin})`);
        const buttonLess = document.createElement('button');
        buttonLess.classList.add('btn');
        buttonLess.style = 'background-color: #FDCD55;color:white;'
        buttonLess.innerText = '-';
        buttonLess.setAttribute('onClick',`javascript:lessOne(${strin})`);
        const divBtns = document.createElement('div');
        divBtns.classList.add('row')
        divBtns.appendChild(buttonAdd);
        divBtns.appendChild(buttonLess);
        modifyA.appendChild(divBtns);
       
        tr.appendChild(item);
        tr.appendChild(qty);
        tr.appendChild(description);
        tr.appendChild(price);
        tr.appendChild(amount);
        tr.appendChild(modifyA);
        tbody.appendChild(tr);
        sumaPedido+= (product.price * product.amount);
    })
    //console.log(tbody.innerHTML);
    table.appendChild(tbody);
    console.log(table)
    containerMain.appendChild(table);
    
    // Resumen  pedido
    const rowTotals = document.createElement('div');
    rowTotals.id = 'rowTotals';
    rowTotals.classList.add('row')
    const colLeft = document.createElement('div');
    colLeft.classList.add('col-9');
    const priceTotals = document.createElement('p');
    priceTotals.innerHTML = `<strong>Total: ${sumaPedido}</strong>`;
    colLeft.appendChild(priceTotals);
    rowTotals.appendChild(colLeft);
    const colRight = document.createElement('div');
    colRight.classList.add('col','float-end');
    const buttonCancel = document.createElement('button');
    buttonCancel.classList.add('btn','btn-danger');
    buttonCancel.style = 'margin-right:5px'
    buttonCancel.innerText = 'Cancel';
    const buttonConfirm = document.createElement('button');
    buttonConfirm.classList.add('btn','btn-success');
    buttonConfirm.innerText = 'Confirm Order';
    colRight.appendChild(buttonCancel);
    colRight.appendChild(buttonConfirm);
    rowTotals.appendChild(colRight);
    itemArea.appendChild(rowTotals);


}

function sumCart(product){
    count++;
    const pTag = document.getElementById('counterCart');
    pTag.innerText = count;
    
    if(orderNames.includes(product.name)){
        console.log('Entro a primer caso');

        orderDetail.forEach((order)=>{
            if(order.name == product.name){
                order['amount']+=1;
            }
        })
    }else{
        product['amount'] = 1;
        orderDetail.push(product);  
        orderNames.push(product.name);
    }
}

function addOne(product){
    console.log('Entro a add');
    orderDetail.forEach((orderItem)=>{
        if(orderItem.name == product.name){
            orderItem.amount+=1;
        }
    });
    cargarOrderDetail();
};

function lessOne(product){
    console.log('Entro a less');
    orderDetail.forEach((orderItem)=>{
        if(orderItem.name == product.name){
            orderItem.amount-=1;
        }
    });
    cargarOrderDetail();
}

function cargarProductos(categoryName){
//console.log('Entro a metodo');
let products = [];
const containerProducts = document.getElementById('itemsMain');
containerProducts.innerHTML = '';
containerProducts.id='itemsMain';
containerProducts.classList.add('row' ,'justify-content-center', 'mt-3');
const titleProducts = document.getElementById('titleMain');
titleProducts.style = 'font-weight:700; font-size: 30px;border-bottom: 1px solid #000';
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
    titleProducts.innerText = product.name.toUpperCase();
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
    aBtn.classList.add('btn');
    aBtn.innerText = 'Add Cart';
    aBtn.style = 'background-color: #FDCD55; color:#000';
    //aBtn.href = `javascript:sumCart(${product})`;
    //aBtn.href = 'javascript:sumCart()';
    let strin = JSON.stringify(product);
    aBtn.setAttribute('href',`javascript:sumCart(${strin})`);
    rowChkout.appendChild(aBtn);
    cardBody.appendChild(rowChkout);
    card.appendChild(cardBody);
    containerProducts.appendChild(card);
})
}

