function calcTip() {
    var subtotalElem = document.getElementById('subtotal');
    var tipElem = document.getElementById('tip');
    var totalElem = document.getElementById('total');

    var subtotal = subtotalElem.value;
    var tip = tipElem.value;

    var total = (tip/subtotal) * 100;
    totalElem.innerHTML = '$' + total;
}