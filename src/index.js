import './scss/main.scss';
var cartFunctional = function() {
    var cart = [];
    var allItems = 0;
    //Cart
    var obj = {};
    //Add item
    obj.addItem = function(name, price) {
        var x;
        for (x of cart) {
            if (name == x.name && price == x.price) {
                obj.increaseAmountInner(x);
                return;
            }
        }
        x = {
            name: name,
            price: price.toFixed(2),
            amount: 1
        }
        cart.push(x);
    };

    //Increase amount
    //item - object
    obj.increaseAmountInner = function(item) {
        item.amount += 1;
    };
    //Increase amount
    //name - string, price - number
    obj.increaseAmount = function(name, price) {
        for (var i of cart) {
            if (name == i.name && price == i.price) {
                obj.increaseAmountInner(i);
                return;
            }
        }
    };

    //Decrease amount
    //item - object
    obj.decreaseAmountInner = function(item) {
        if (item.amount == 1) obj.removeItemInner(item);
        else item.amount -= 1;
    };

    //Decrease amount
    //name - string, price - number
    obj.decreaseAmount = function(name, price) {
        for (var i of cart) {
            if (name == i.name && price == i.price) {
                obj.decreaseAmountInner(i);
                return;
            }
        }
    };

    //Total price
    obj.totalPrice = function() {
        var total = 0;
        for (var i in cart) {
            total += cart[i].price * cart[i].amount;
        }
        return total.toFixed(2) + "$";
    };

    //Total amount
    obj.totalAmount = function() {
        var total = 0;
        for (var i in cart) {
            total += cart[i].amount;
        }
        return total;
    };

    //Remove item
    //item - object
    obj.removeItemInner = function(item) {
        for (var i in cart) {
            if (item.name == cart[i].name) {
                cart.splice(i, 1);
                return;
            }
        }
    };

    //Remove item
    //name - string, price - number
    obj.removeItem = function(name, price) {
        for (var i in cart) {
            if (name == cart[i].name && price == cart[i].price) {
                cart.splice(i, 1);
                return;
            }
        }
    };

    obj.cartContent = function() {
        return cart;
    };

    return obj;
}();

//Update Button Cart
function updateButtonCart(button) {
    button.text("Cart (" + cartFunctional.totalAmount() + ")");
}

//Handling events
$(document).ready(function() {

    //Add item to cart
    $(".buy_button").click(function() {
        cartFunctional.addItem(
            $(this).parent().find(".card-title").text(),
            parseFloat($(this).parent().find(".card-price").text()))
        updateButtonCart($(".cart_button"));
    });

    //Distplay cart
    $(".cart_button").click(function() {
        var s = "<thead class=\"thead-light\"><tr>" +
            "<th scope=\"col\">Name</th>" +
            "<th scope=\"col\">Price</th>" +
            "<th scope=\"col\">Amount</th>" +
            "<th scope=\"col\"></th>" +
            "</tr></thead><tbody>";
        for (var i of cartFunctional.cartContent()) {
            s +=
                "<tr scope=\"row\" data-name=\"" + i.name + "\" data-price=\"" + i.price + "\">" +
                "<td class=\"text-left\">" + i.name + "</td>" +
                "<td>" + i.price + "$</td>" +
                "<td>" + "<div class=\"btn-group\" role=\"group\">" +
                "<button type=\"button\" class=\"btn btn-secondary amount-minus\">-</button>" +
                "<button type=\"button\" class=\"btn btn-secondary amount-text\" disabled>" + i.amount + "</button>" +
                "<button type=\"button\" class=\"btn btn-secondary amount-plus\">+</button>" +
                "</div>" + "</td>" +
                "<td>" + "<button type=\"button\" class=\"btn btn-danger remove-item\">Remove</button> " + "</td>" +
                "</tr>";
        }
        s += "<tr>" +
            "<td>Total</td>" +
            "<td colspan=\"3\"><div class=\"total-price\">" + cartFunctional.totalPrice() + "</div></td>" +
            "</tr></tbody>";
        $(".table-cart").html(s);
    });

    //Increase amount
    $(".table-cart").on("click", ".amount-plus", function() {
        cartFunctional.increaseAmount(
            $(this).parents("tr").data().name,
            $(this).parents("tr").data().price);
        $(this).prev().text(parseInt($(this).prev().text()) + 1);
        $(".total-price").text(cartFunctional.totalPrice());
        updateButtonCart($(".cart_button"));

    });

    //Decrease amount
    $(".table-cart").on("click", ".amount-minus", function() {
        cartFunctional.decreaseAmount(
            $(this).parents("tr").data().name,
            $(this).parents("tr").data().price);
        if ($(this).next().text() - 1 == 0) $(this).parents("tr").hide();
        else $(this).next().text(parseInt($(this).next().text()) - 1);
        $(".total-price").text(cartFunctional.totalPrice());
        updateButtonCart($(".cart_button"));

    });

    //Remove item
    $(".table-cart").on("click", ".remove-item", function() {
        cartFunctional.removeItem(
            $(this).parents("tr").data().name,
            $(this).parents("tr").data().price);
        $(this).parents("tr").hide();
        $(".total-price").text(cartFunctional.totalPrice());
        updateButtonCart($(".cart_button"));

    });
});
