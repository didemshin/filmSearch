var searchList = new Array();

var customJquery = {
    apiService: function (searchValue, removeSearchList) {
        customJquery.searchResult.removeSearchResult(removeSearchList);

        var url = "http://www.omdbapi.com/?s=" + searchValue + "&apikey=a028feb1";
        $.post(url, function (data) {
            $.each(data.Search, function (index, item) {
                customJquery.searchResult.addSearchResult(item, ".cart-list", ".search-result", data.Search);
            });
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

    favorites: {
        removeFavorites: function () {
            $(document).on("click", ".favorites-list i.removeFavorites", function () {
                $(this).closest(".cart-item").remove();
                var favoriteList = $("div.favorites-list .cart-item");

                customJquery.displayContainer(favoriteList, ".favorites-list");
            });
        },
        addFavorites: function () {
            $(document).on("click", ".search-result i.addFavorites", function () {
                $(this).removeClass("addFavorites");
                var cloneElement = $(this).closest('.cart-item').clone(true);
                console.log(cloneElement);
                $(cloneElement).find("i").addClass("removeFavorites");
                $(".favorites-cart-list").append(cloneElement);

                var favoriteList = $("div.favorites-list .cart-item");
                customJquery.displayContainer(favoriteList, ".favorites-list");
            });
        },
    },

    searchHistory: {
        removeSearchHistory: function () {
            $(document).on("click", ".searchHistoryJS button.searchHistoryItem i.close-button", function () {
                var value = $(this).closest('button').text();
                var index = searchList.indexOf(value);
                if (index != -1){
                    searchList.splice(index, 1);
                }
                $(this).parent().remove();
            });
        },

        addSearchHistory: function (searchValue) {
            var hasItem = searchList.indexOf(searchValue);

            if(hasItem == -1){
                if(searchList.length > 9){
                    searchList.shift();
                    $(".searchHistoryItem:first-child").remove();
                }
                searchList.unshift(searchValue);
                $(".search-history-list").append('<button class="btn btn-sm btn-secondary mx-2 mb-2 searchHistoryItem" type="button">' +
                    '<span class="searchValue">'+searchValue+'</span>' +
                    '<i class="far fa-times-circle close-button ml-1"></i>' +
                    '</button>');
            }
        },

        searchHistory: function () {
            $(document).on("click", "span.searchValue", function () {
                var searchValue = $(this).text();
                $(".search-input").val(searchValue);
                $(".search-btn").click();
            });
        }
    },

    searchResult: {
        searchClickEvent: function () {
            $(".search-btn").click(function () {
                var searchValue = $(".search-input").val();
                var removeList = $("div.cart-list .cart-item");

                customJquery.apiService(searchValue, removeList);
                customJquery.searchHistory.addSearchHistory(searchValue);
            });
        },

        searchKeyupEvent: function () {
            $(".search-input").keyup(function () {
                var searchValue = $(".search-input").val();
                if (searchValue.length > 2) {
                    $(".search-btn").attr("disabled", false);
                } else {
                    $(".search-btn").attr("disabled", true);
                }
            });
        },

        removeSearchResult: function (removeSearchList) {
            $(removeSearchList).remove();
        },

        addSearchResult: function (item, elementClass, removeElement, elementList) {
            $(elementClass).append("<div class='col-24 col-lg-3 mb-5 cart-item'>" +
                "<div class='card border-0 shadow'>" +
                "<div class='cart-icon'>" +
                "<i class='fa favorites-style addFavorites data-poster-url='" + item.Poster + "'></i>" +
                "</div>" +
                "<img class='card-img-top' src='" + item.Poster + "'/>" +
                "<div class='card-body text-center'>" +
                "<h5 class='card-title mb-0'>" + item.Title + "</h5>" +
                "<div class='card-text text-black-60 mt-10'>" + item.Year + "</div>" +
                "</div> </div> </div>");

            customJquery.displayContainer(elementList, removeElement);
        },
    },
};

$(document).ready(function () {
    with (customJquery) {
        searchResult.searchKeyupEvent();
        searchResult.searchClickEvent();

        searchHistory.removeSearchHistory();
        searchHistory.searchHistory();

        favorites.removeFavorites();
        favorites.addFavorites();
    }
});