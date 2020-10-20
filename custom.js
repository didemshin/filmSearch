var customJquery = {
    searchResult: function (searchValue) {
        var url = "http://www.omdbapi.com/?apikey=[" + searchValue + "]&";
        $.post(url, function (data) {
            customJquery.createCart(data.result, ".cart-list", "addFavorites");

        });
    },

    addSearchResult:function (){

    },

    createCart: function (dataList, elementClass, favoritesClass) {
        $.each(dataList, function (index, item) {
            $(elementClass).append("<div class='col-24 col-lg-4 m-2 cart-item'>" +
                "<div class='card border-0 shadow'>" +
                "<div class='cart-footer'>" +
                "<i class='fa favorites-style " + favoritesClass + "' data-film-img-url='" + item + "' data-film-date'" + item + "' data-film-name='" + item + "' data-film-rating'" + item + "'>&#xf006;</i>" +
                "</div>" +
                "<img class='card-img-top' src='" + $(favoritesClass).data().filmImgUrl + "'/>" +
                "<div class='card-body text-center'>" +
                "<h5 class='card-title mb-0'>" + $(favoritesClass).data().filmName + "</h5>" +
                "<div class='card-text text-black-60 mt-10'>" + $(favoritesClass).data().filmDate + "</div>" +
                "<div class='card-text mt-20 text-c10'>" + $(favoritesClass).data().filmRating + "</div>" +
                "</div> </div> </div>");
        });
    },

    removeSearchHistory: function () {
        $(document).on("click", ".searchHistoryJS button.searchHistoryItem i.close-button", function () {
            $(this).parent().remove();
        });
    },

    removeFavorites: function () {
        $(document).on("click", ".favorites-list i.removeFavorites", function () {
            $(this).closest(".cart-item").remove();

            var favoriteList = $("div.favorites-list .cart-item");

            customJquery.displayContainer(favoriteList, ".favorites-list");
        });
    },

    addFavorites: function () {
        $(document).on("click", ".search-result i.addFavorites", function () {

            customJquery.createCart(this, ".favorites-cart-list", "removeFavorites");

            customJquery.displayContainer(searchList, ".favorites-list");
        });
    },


    displayContainer: function (List, removeElement) {
        var hasDisplayBlock = $(removeElement).hasClass("d-block");
        var hasDisplayNone = $(removeElement).hasClass("d-none");
        if (List.length == 0) {
            $(removeElement).removeClass("d-block");
            if (hasDisplayNone == false) {
                $(removeElement).addClass("d-none");
            }
        } else {
            $(removeElement).removeClass("d-none");
            if (hasDisplayBlock == false) {
                $(removeElement).addClass("d-block");
            }
        }
    },
}

$(document).ready(function () {
    with (customJquery) {
        removeSearchHistory();
        removeFavorites();
    }
});