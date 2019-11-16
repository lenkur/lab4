import './scss/main.scss';
//Functional of cart
var cartFunctional = function() {
    var cart = [];
    var allItems = 0;
    //Cart
    var obj = {};
    //Add item
    obj.addItem = function(id, name, price) {
        var x;
        for (x of cart) {
            if (name == x.name && price == x.price) {
                obj.increaseAmountInner(x);
                return;
            }
        }
        x = {
            id: id,
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

    obj.clearCart = function() {
        cart = [];
    };


    return obj;
}();

//Update Button Cart
function updateButtonCart(button) {
    button.text("Cart (" + cartFunctional.totalAmount() + ")");
}



$(document).ready(function() {

    //Handling cart events

    //Distplay cart
    $(".cart_button").click(function() {
        $('div.alert').hide();
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

    $.ajax({
        url: 'https://nit.tron.net.ua/api/product/list',
        type: 'GET',
        success: function(content) {
            var s = "";
            for (var i of content) {
                s += '<div class="col-lg-3 col-md-6 my-3">' +
                    '<div class="card h-100" data-id=' + i.id + ' ">' +
                    '<div class="image-wrapper card-image-top" style="background-image:url(' + i.image_url + ')"></div>' +
                    '<div class="card-body d-flex flex-column">' +
                    '<div class="card-title">' + i.name + '</div>' +
                    '<div class="mt-auto">';
                if (i.special_price == null) { s += '<div class="card-text mb-2 card-price">' + i.price + '$ </div>' } else {
                    s += '<div class="card-text mb-2 card-price"><span class="old-price">' + i.price + '$   </span>' +
                        '<span class="special-price">' + i.special_price + '$</span></div>'
                }
                s +=
                    '<button type="button" class="btn btn-dark info_button" data-toggle="modal" data-target="#product_info"> Info </button>' +
                    '<button class="btn btn-dark mx-1 buy_button">Buy</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
            }
            $('.product-board').html(s);
        },
        error: function() {
            alert('Error while loading data!');
        },
    });

    $.ajax({
        url: 'https://nit.tron.net.ua/api/category/list',
        type: 'GET',
        success: function(content) {
            var s = "<a class=\"dropdown-item light-text all-products\" href=\"#\">All products</a>";
            for (var i of content) {
                s += "<a class=\"dropdown-item category-name light-text\" data-id=\"" + i.id + "\"href=\"#\">" + i.name + "</a>";
            }
            $('div.category-list').html(s);
        },
        error: function() {
            alert('Error while loading data!');
        },
    });

    $(".dropdown").on("click", ".dropdown-item.all-products", function() {
        $('h1.categoty-name').text("All products");
        $('.categoty-description').text("");
        $.ajax({
            url: 'https://nit.tron.net.ua/api/product/list',
            type: 'GET',
            success: function(content) {
                var s = "";
                for (var i of content) {
                    s += '<div class="col-lg-3 col-md-6 my-3">' +
                        '<div class="card h-100" data-id=' + i.id + ' ">' +
                        '<div class="image-wrapper card-image-top" style="background-image:url(' + i.image_url + ')"></div>' +
                        '<div class="card-body d-flex flex-column">' +
                        '<div class="card-title">' + i.name + '</div>' +
                        '<div class="mt-auto">';
                    if (i.special_price == null) { s += '<div class="card-text mb-2 card-price">' + i.price + '$ </div>' } else {
                        s += '<div class="card-text mb-2 card-price"><span class="old-price">' + i.price + '$   </span>' +
                            '<span class="special-price">' + i.special_price + '$</span></div>'
                    }
                    s +=
                        '<button type="button" class="btn btn-dark info_button" data-toggle="modal" data-target="#product_info"> Info </button>' +
                        '<button class="btn btn-dark mx-1 buy_button">Buy</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                }
                $('.product-board').html(s);
            },
            error: function() {
                alert('Error while loading data!');
            },
        });
    });

    $(".dropdown").on("click", ".dropdown-item.category-name", function() {
        var id = $(this).data().id;
        $.ajax({
            url: 'https://nit.tron.net.ua/api/category/' + id,
            type: 'GET',
            success: function(content) {
                $('h1.categoty-name').text(content.name);
                $('.categoty-description').text(content.description);
            },
            error: function() {
                alert('Error while loading data!');
            },
        });

        $.ajax({
            url: 'https://nit.tron.net.ua/api/product/list/category/' + id,
            type: 'GET',
            success: function(content) {
                var s = "";
                for (var i of content) {
                    s += '<div class="col-lg-3 col-md-6 my-3">' +
                        '<div class="card h-100" data-id=' + i.id + ' ">' +
                        '<div class="image-wrapper card-image-top" style="background-image:url(' + i.image_url + ')"></div>' +
                        '<div class="card-body d-flex flex-column">' +
                        '<div class="card-title">' + i.name + '</div>' +
                        '<div class="mt-auto">';
                    if (i.special_price == null) { s += '<div class="card-text mb-2 card-price">' + i.price + '$ </div>' } else {
                        s += '<div class="card-text mb-2 card-price"><span class="old-price">' + i.price + '$   </span>' +
                            '<span class="special-price">' + i.special_price + '$</span></div>'
                    }
                    s +=
                        '<button type="button" class="btn btn-dark info_button" data-toggle="modal" data-target="#product_info"> Info </button>' +
                        '<button class="btn btn-dark mx-1 buy_button">Buy</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                }
                $('.product-board').html(s);
            },
            error: function() {
                alert('Error while loading data!');
            },
        });
    });

    $(".product-board").on("click", "button.info_button", function() {
        var id = $(this).parents('.card').data().id;
        $.ajax({
            url: 'https://nit.tron.net.ua/api/product/' + id,
            type: 'GET',
            success: function(content) {
                $('#product_info').attr('data-id', content.id);
                $('.modal-body .product-name').text(content.name);
                if (content.special_price == null) {
                    $('.modal-body .price').text(content.price+'$');
                    $('.modal-body .price').removeClass('old-price');
                    $('.modal-body .special-price').text('');

                } else {
                    $('.modal-body .price').addClass('old-price');
                    $('.modal-body .price').text(content.price+'$');
                    $('.modal-body .special-price').text(content.special_price+'$');
                }
                $('.info_modal.image-wrapper').css("background-image", "url(" + content.image_url + ")");
                $('.modal-body .product-description').text(content.description);
            },
            error: function() {
                alert('Error while loading data!');
            },
        });
    });
    //Add item to cart
    $(document).on("click", ".buy_button", function() {
        var id = $(this).parents('.card').data().id;
        $.ajax({
            url: 'https://nit.tron.net.ua/api/product/' + id,
            type: 'GET',
            success: function(content) {
                if (content.special_price == null) {
                    cartFunctional.addItem(content.id, content.name, parseFloat(content.price));
                } else {
                    cartFunctional.addItem(content.id, content.name, parseFloat(content.special_price));
                }
                updateButtonCart($(".cart_button"));
            },
            error: function() {
                alert('Error while loading data!');
            },
        });
    });

    $(document).on("click", "#buy_button", function() {
        var id = $(this).parents('#product_info').attr('data-id');
        $.ajax({
            url: 'https://nit.tron.net.ua/api/product/' + id,
            type: 'GET',
            success: function(content) {
                if (content.special_price == null) {
                    cartFunctional.addItem(content.id, content.name, parseFloat(content.price));
                } else {
                    cartFunctional.addItem(content.id, content.name, parseFloat(content.special_price));
                }
                updateButtonCart($(".cart_button"));
            },
            error: function() {
                alert('Error while loading data!');
            },
        });
    });

    $(document).on("click", "#submit", function() {
        var valid = false;
        var dataString = "token=-vwtFW9o4fPXB";
        var name = $("input#name").val();
        if (name == null || name == "") {
            $("input#name").removeClass('is-valid');
            $("input#name").addClass('is-invalid');
            valid = false;
        } else {
            $("input#name").removeClass('is-invalid');
            $("input#name").addClass('is-valid');
            valid = true;

        }
        var email = $("input#e-mail").val();
        var emailvalid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email == null || email == "" || !emailvalid.test(email)) {
            $("input#e-mail").removeClass('is-valid');
            $("input#e-mail").addClass('is-invalid');
            valid = false;

        } else {
            $("input#e-mail").removeClass('is-invalid');
            $("input#e-mail").addClass('is-valid');
            valid = true;

        }
        var phone = $("input#phone").val();
        var phonevalid = /^\d{3}(-|\s)?\d{3}(-|\s)?\d{4}$/
        if (phone == null || phone == "" || !phonevalid.test(phone)) {
            $("input#phone").removeClass('is-valid');
            $("input#phone").addClass('is-invalid');
            valid = false;

        } else {
            $("input#phone").removeClass('is-invalid');
            $("input#phone").addClass('is-valid');
            valid = true;

        }
        var products = "";
        for (var i of cartFunctional.cartContent())
            products += '&products[' + i.id + ']=' + i.amount;
        if (valid) {
            dataString += '&name=' + name + '&phone=' + phone + '&email=' + email + products;
            $.ajax({
                type: "POST",
                url: 'https://nit.tron.net.ua/api/order/add',
                data: dataString,
                success: function(content) {
                	console.log(content);
                    if (content.status == 'success') {
                        $('div.alert').removeClass('alert-danger');
                        $('div.alert').addClass('alert-success');
                        $('div.alert').text('Your request was sent successfully!');
                        cartFunctional.clearCart();
                        updateButtonCart($(".cart_button"));
                        $('div.alert').show();
                        $('.table-cart').html('');
                    } else if (content.status == 'error') {
                        $('div.alert').removeClass('alert-success');
                        $('div.alert').addClass('alert-danger');
                        $('div.alert').show();
                        var s = "";
                        for (var i of Object.values(content.errors))
                            s += i + " ";
                        $('div.alert').text(s);
                    }
                },
                error: function() {
                    alert('Error while loading data!');
                },

            });
        }
    });
});