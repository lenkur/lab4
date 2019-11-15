!function(t){var a={};function r(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=a,r.d=function(t,a,e){r.o(t,a)||Object.defineProperty(t,a,{enumerable:!0,get:e})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,a){if(1&a&&(t=r(t)),8&a)return t;if(4&a&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&a&&"string"!=typeof t)for(var n in t)r.d(e,n,function(a){return t[a]}.bind(null,n));return e},r.n=function(t){var a=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(a,"a",a),a},r.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)},r.p="",r(r.s=0)}([function(t,a,r){"use strict";r.r(a);r(1);var e,n,i=(e=[],n={addItem:function(t,a,r){var i,o=!0,l=!1,c=void 0;try{for(var d,s=e[Symbol.iterator]();!(o=(d=s.next()).done);o=!0)if(a==(i=d.value).name&&r==i.price)return void n.increaseAmountInner(i)}catch(t){l=!0,c=t}finally{try{o||null==s.return||s.return()}finally{if(l)throw c}}i={id:t,name:a,price:r.toFixed(2),amount:1},e.push(i)},increaseAmountInner:function(t){t.amount+=1},increaseAmount:function(t,a){var r=!0,i=!1,o=void 0;try{for(var l,c=e[Symbol.iterator]();!(r=(l=c.next()).done);r=!0){var d=l.value;if(t==d.name&&a==d.price)return void n.increaseAmountInner(d)}}catch(t){i=!0,o=t}finally{try{r||null==c.return||c.return()}finally{if(i)throw o}}},decreaseAmountInner:function(t){1==t.amount?n.removeItemInner(t):t.amount-=1},decreaseAmount:function(t,a){var r=!0,i=!1,o=void 0;try{for(var l,c=e[Symbol.iterator]();!(r=(l=c.next()).done);r=!0){var d=l.value;if(t==d.name&&a==d.price)return void n.decreaseAmountInner(d)}}catch(t){i=!0,o=t}finally{try{r||null==c.return||c.return()}finally{if(i)throw o}}},totalPrice:function(){var t=0;for(var a in e)t+=e[a].price*e[a].amount;return t.toFixed(2)+"$"},totalAmount:function(){var t=0;for(var a in e)t+=e[a].amount;return t},removeItemInner:function(t){for(var a in e)if(t.name==e[a].name)return void e.splice(a,1)},removeItem:function(t,a){for(var r in e)if(t==e[r].name&&a==e[r].price)return void e.splice(r,1)},cartContent:function(){return e},clearCart:function(){e=[]}});function o(t){t.text("Cart ("+i.totalAmount()+")")}$(document).ready((function(){$(".cart_button").click((function(){var t='<thead class="thead-light"><tr><th scope="col">Name</th><th scope="col">Price</th><th scope="col">Amount</th><th scope="col"></th></tr></thead><tbody>',a=!0,r=!1,e=void 0;try{for(var n,o=i.cartContent()[Symbol.iterator]();!(a=(n=o.next()).done);a=!0){var l=n.value;t+='<tr scope="row" data-name="'+l.name+'" data-price="'+l.price+'"><td class="text-left">'+l.name+"</td><td>"+l.price+'$</td><td><div class="btn-group" role="group"><button type="button" class="btn btn-secondary amount-minus">-</button><button type="button" class="btn btn-secondary amount-text" disabled>'+l.amount+'</button><button type="button" class="btn btn-secondary amount-plus">+</button></div></td><td><button type="button" class="btn btn-danger remove-item">Remove</button> </td></tr>'}}catch(t){r=!0,e=t}finally{try{a||null==o.return||o.return()}finally{if(r)throw e}}t+='<tr><td>Total</td><td colspan="3"><div class="total-price">'+i.totalPrice()+"</div></td></tr></tbody>",$(".table-cart").html(t)})),$(".table-cart").on("click",".amount-plus",(function(){i.increaseAmount($(this).parents("tr").data().name,$(this).parents("tr").data().price),$(this).prev().text(parseInt($(this).prev().text())+1),$(".total-price").text(i.totalPrice()),o($(".cart_button"))})),$(".table-cart").on("click",".amount-minus",(function(){i.decreaseAmount($(this).parents("tr").data().name,$(this).parents("tr").data().price),$(this).next().text()-1==0?$(this).parents("tr").hide():$(this).next().text(parseInt($(this).next().text())-1),$(".total-price").text(i.totalPrice()),o($(".cart_button"))})),$(".table-cart").on("click",".remove-item",(function(){i.removeItem($(this).parents("tr").data().name,$(this).parents("tr").data().price),$(this).parents("tr").hide(),$(".total-price").text(i.totalPrice()),o($(".cart_button"))})),$.ajax({url:"https://nit.tron.net.ua/api/product/list",type:"GET",success:function(t){var a="",r=!0,e=!1,n=void 0;try{for(var i,o=t[Symbol.iterator]();!(r=(i=o.next()).done);r=!0){var l=i.value;a+='<div class="col-lg-3 col-md-6 my-3"><div class="card h-100" data-id='+l.id+' "><div class="image-wrapper card-image-top" style="background-image:url('+l.image_url+')"></div><div class="card-body d-flex flex-column"><div class="card-title">'+l.name+'</div><div class="mt-auto">',null==l.special_price?a+='<div class="card-text mb-2 card-price">'+l.price+"$ </div>":a+='<div class="card-text mb-2 card-price"><span class="old-price">'+l.price+'$   </span><span class="special-price">'+l.special_price+"</span></div>",a+='<button type="button" class="btn btn-dark info_button" data-toggle="modal" data-target="#product_info"> Info </button><button class="btn btn-dark mx-1 buy_button">Buy</button></div></div></div></div>'}}catch(t){e=!0,n=t}finally{try{r||null==o.return||o.return()}finally{if(e)throw n}}$(".product-board").html(a)},error:function(){alert("Error while loading data!")}}),$.ajax({url:"https://nit.tron.net.ua/api/category/list",type:"GET",success:function(t){var a='<a class="dropdown-item light-text all-products" href="#">All products</a>',r=!0,e=!1,n=void 0;try{for(var i,o=t[Symbol.iterator]();!(r=(i=o.next()).done);r=!0){var l=i.value;a+='<a class="dropdown-item category-name light-text" data-id="'+l.id+'"href="#">'+l.name+"</a>"}}catch(t){e=!0,n=t}finally{try{r||null==o.return||o.return()}finally{if(e)throw n}}$("div.category-list").html(a)},error:function(){alert("Error while loading data!")}}),$(".dropdown").on("click",".dropdown-item.all-products",(function(){$("h1.categoty-name").text("All products"),$(".categoty-description").text(""),$.ajax({url:"https://nit.tron.net.ua/api/product/list",type:"GET",success:function(t){var a="",r=!0,e=!1,n=void 0;try{for(var i,o=t[Symbol.iterator]();!(r=(i=o.next()).done);r=!0){var l=i.value;a+='<div class="col-lg-3 col-md-6 my-3"><div class="card h-100" data-id='+l.id+' "><div class="image-wrapper card-image-top" style="background-image:url('+l.image_url+')"></div><div class="card-body d-flex flex-column"><div class="card-title">'+l.name+'</div><div class="mt-auto">',null==l.special_price?a+='<div class="card-text mb-2 card-price">'+l.price+"$ </div>":a+='<div class="card-text mb-2 card-price"><span class="old-price">'+l.price+'$   </span><span class="special-price">'+l.special_price+"</span></div>",a+='<button type="button" class="btn btn-dark info_button" data-toggle="modal" data-target="#product_info"> Info </button><button class="btn btn-dark mx-1 buy_button">Buy</button></div></div></div></div>'}}catch(t){e=!0,n=t}finally{try{r||null==o.return||o.return()}finally{if(e)throw n}}$(".product-board").html(a)},error:function(){alert("Error while loading data!")}})})),$(".dropdown").on("click",".dropdown-item.category-name",(function(){var t=$(this).data().id;$.ajax({url:"https://nit.tron.net.ua/api/category/"+t,type:"GET",success:function(t){$("h1.categoty-name").text(t.name),$(".categoty-description").text(t.description)},error:function(){alert("Error while loading data!")}}),$.ajax({url:"https://nit.tron.net.ua/api/product/list/category/"+t,type:"GET",success:function(t){var a="",r=!0,e=!1,n=void 0;try{for(var i,o=t[Symbol.iterator]();!(r=(i=o.next()).done);r=!0){var l=i.value;a+='<div class="col-lg-3 col-md-6 my-3"><div class="card h-100" data-id='+l.id+' "><div class="image-wrapper card-image-top" style="background-image:url('+l.image_url+')"></div><div class="card-body d-flex flex-column"><div class="card-title">'+l.name+'</div><div class="mt-auto">',null==l.special_price?a+='<div class="card-text mb-2 card-price">'+l.price+"$ </div>":a+='<div class="card-text mb-2 card-price"><span class="old-price">'+l.price+'$   </span><span class="special-price">'+l.special_price+"</span></div>",a+='<button type="button" class="btn btn-dark info_button" data-toggle="modal" data-target="#product_info"> Info </button><button class="btn btn-dark mx-1 buy_button">Buy</button></div></div></div></div>'}}catch(t){e=!0,n=t}finally{try{r||null==o.return||o.return()}finally{if(e)throw n}}$(".product-board").html(a)},error:function(){alert("Error while loading data!")}})})),$(".product-board").on("click","button.info_button",(function(){var t=$(this).parents(".card").data().id;$.ajax({url:"https://nit.tron.net.ua/api/product/"+t,type:"GET",success:function(t){$("#product_info").attr("data-id",t.id),$(".modal-body .product-name").text(t.name),null==t.special_price?$(".modal-body .price").text(t.price):($(".modal-body .price").addClass("old-price"),$(".modal-body .special-price").text(t.special_price)),$(".info_modal.image-wrapper").css("background-image","url("+t.image_url+")"),$(".modal-body .product-description").text(t.description)},error:function(){alert("Error while loading data!")}})})),$(document).on("click",".buy_button",(function(){var t=$(this).parents(".card").data().id;$.ajax({url:"https://nit.tron.net.ua/api/product/"+t,type:"GET",success:function(t){null==t.special_price?i.addItem(t.id,t.name,parseFloat(t.price)):i.addItem(t.id,t.name,parseFloat(t.special_price)),o($(".cart_button"))},error:function(){alert("Error while loading data!")}})})),$(document).on("click","#buy_button",(function(){var t=$(this).parents("#product_info").attr("data-id");$.ajax({url:"https://nit.tron.net.ua/api/product/"+t,type:"GET",success:function(t){null==t.special_price?i.addItem(t.id,t.name,parseFloat(t.price)):i.addItem(t.id,t.name,parseFloat(t.special_price)),o($(".cart_button"))},error:function(){alert("Error while loading data!")}})})),$(document).on("click","#submit",(function(){var t=!1,a="token=kHPdQX3vwtFW9o4fPXB",r=$("input#name").val();null==r||""==r?($("input#name").removeClass("is-valid"),$("input#name").addClass("is-invalid"),t=!1):($("input#name").removeClass("is-invalid"),$("input#name").addClass("is-valid"),t=!0);var e=$("input#e-mail").val();null!=e&&""!=e&&/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)?($("input#e-mail").removeClass("is-invalid"),$("input#e-mail").addClass("is-valid"),t=!0):($("input#e-mail").removeClass("is-valid"),$("input#e-mail").addClass("is-invalid"),t=!1);var n=$("input#phone").val();null!=n&&""!=n&&/^\d{3}(-|\s)?\d{3}(-|\s)?\d{4}$/.test(n)?($("input#phone").removeClass("is-invalid"),$("input#phone").addClass("is-valid"),t=!0):($("input#phone").removeClass("is-valid"),$("input#phone").addClass("is-invalid"),t=!1);var l="",c=!0,d=!1,s=void 0;try{for(var u,p=i.cartContent()[Symbol.iterator]();!(c=(u=p.next()).done);c=!0){var m=u.value;l+="&products["+m.id+"]="+m.amount}}catch(t){d=!0,s=t}finally{try{c||null==p.return||p.return()}finally{if(d)throw s}}t&&(a+="&name="+r+"&phone="+n+"&email="+e+l,$.ajax({type:"POST",url:"https://nit.tron.net.ua/api/order/add",data:a,success:function(t){if("success"==t.status)$("div.alert").removeClass("alert-danger"),$("div.alert").addClass("alert-success"),$("div.alert").text("Your request was sent successfully!"),i.clearCart(),o($(".cart_button")),$(".table-cart").html("");else if("error"==t.status){$("div.alert").removeClass("alert-success"),$("div.alert").addClass("alert-danger"),console.log(Object.keys(t.errors)),console.log(t.errors.token);for(var a="",r=0,e=Object.values(t.errors);r<e.length;r++){a+=e[r]+"\n"}$("div.alert").text(a)}},error:function(){alert("Error while loading data!")}}))}))}))},function(t,a,r){}]);