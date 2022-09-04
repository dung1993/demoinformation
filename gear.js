class Gear{
    constructor(id, title, image, price, quantity) {
        this.id = id;
        this.image = image;
        this.title = title;
        this.price = price;
        this.quantity = quantity;
    }
}

var gear_key = "data-gear";

var image_url = [];
var gears = [];

function init() {
    if (localStorage.getItem(gear_key) == null) {
        image_url = [
            new Image("https://cf.shopee.vn/file/540fd6922aec958d35705ad02a256263"),
            new Image("https://salt.tikicdn.com/ts/product/2f/0f/c5/16acc2ce4e4c2fcfbb64c9768ba6d932.jpg")
        ];

        gears = [
            new Gear(1,"keyboard K2", "https://cf.shopee.vn/file/540fd6922aec958d35705ad02a256263", 600000, 10),
            new Gear(2,"mouse logitech 903", "https://salt.tikicdn.com/ts/product/2f/0f/c5/16acc2ce4e4c2fcfbb64c9768ba6d932.jpg", 2000000, 5),
        ];

        localStorage.setItem(gear_key, gears, image_url, JSON.stringify(gears, image_url));
    } else {
        gears = JSON.parse(localStorage.getItem(gear_key));
    }
}

function renderGear() {
    let htmls = gears.map(function (gear, index) {
        return `<tr id="tr_${index}">
                        <td>${gear.title}</td>
                        <td><img class="image" src="${gear.image}"></td>
                        <td>${gear.price}</td>
                        <td>${gear.quantity}</td>
                        <td>
                        <button class="btn btn-warning" onclick='editGear(${gear.id})'>Edit</button>
                        <button onclick=makeRemove(${index}) class= "btn btn-danger">Remove</button>
                        </td>
                    </tr>`
    })
    document.querySelector("tbody").innerHTML = htmls.join("");
}

function openModal() {
    document.querySelector('.modal-container').classList.add('show');
}

function closeModal() {
    document.querySelector('.modal-container').classList.remove('show');
    resetModal();
}

function changeImage() {
    document.querySelector('.show-image').src = document.querySelector('#image').value || '/images/noimage.jpg';
}

function addGear() {
    let id = findMaxId() + 1;
    let title = document.querySelector("#title").value;
    let image = document.querySelector("#image").value;
    let price = Number.parseInt(document.querySelector("#price").value);
    let quantity = Number.parseInt(document.querySelector("#quantity").value);
    if (title.trim() == "" || title == null) {
        alert('input new title!')
        return;
    }
    let gear = new Gear( id, title, image, price, quantity);
    gears.push(gear);
    localStorage.setItem(gear_key, gears, image_url, JSON.stringify(gears, image_url));
    closeModal()
    renderGear();
    // document.querySelector(".form-control").value = "";

}
renderGear();

function resetModal() {
    document.querySelector('#title').value = "";
    document.querySelector('#image').value = "";
    document.querySelector('#price').value = "";
    document.querySelector('#quantity').value = "";
    document.querySelector('.show-image').value = "/images/noimage.jpg";

    document.querySelector('#btnUpdate').classList.add('d-none');
    document.querySelector('#btnAdd').classList.remove('d-none');
}

function findMaxId(){
    let max = 0;
    for(let gear of gears){
        if(gear.id > max){
            max = gear.id;
        }
    }
}

function makeRemove(index) {
    let confirm = window.confirm('Are you sure to remove this gear?')
    if (confirm) {
        contacts.slice(index, 1);
        localStorage.setItem(gear_key, gears, image_url, JSON.stringify(gears, image_url));
        renderGear();
    }

}

function getGear(gearId){
    let gear = gears.find(function(gear){
        return gear.id === gearId;
    })

    document.querySelector('#title').value = gear.title;
    document.querySelector('#image').value = gear.image;
    document.querySelector('#price').value = gear.price;
    document.querySelector('#quantity').value = gear.quantity;
    document.querySelector('.show-image').value = gear.image;

    document.querySelector('#btnUpdate').classList.remove('d-none');
    document.querySelector('#btnAdd').classList.add('d-none');
    openModal();
}

function updateGear() {

    
    if (title.trim() == "" || title == null) {
        alert('input new title!')
        return;
    }
    let id = document.querySelector(`#gearID`).value;
    let gear = gear.find(function(gr){
        return gr.id == id;
    }) 
    gear.title = document.querySelector("#title").value;
    gear.image = document.querySelector("#image").value;
    gear.price = document.querySelector("#price").value;
    gear.quantity = document.querySelector("#quantity").value;
    gear.title = document.querySelector("#title").value;
    localStorage.setItem(gear_key, gears, image_url, JSON.stringify(gears, image_url));
    closeModal()
    renderGear();
    

}

function main() {
    init();
    renderGear();
}
main()