var lgiftm = {};
( function(){

    "use strict";

    var giphyRoot = "https://api.giphy.com/v1/gifs/",

        apiKey = "n7M1sLNbUj0CCTbYCCqkLNJZFp9xrKIb",

        apiUrl = "&api_key=",

        searchUrl = "search?q=",

        trendUrl = "trending?",

        limitUrl = "&limit=",

        offsetUrl = "&offset=",

        imgTag1 = '<img class="copy" data-clipboard-text="![LGTM](',

        imgTag2 = ')" id="lgtm',

        imgTag3 = '" src="',

        imgTag4 = '">',

        clipboardClass = ".copy",

        lgtmId = "#lgtm_images",

        offsetValue = 0;

    lgiftm.setMoreGiphySearchImage = function(){
        this.setGiphySearchImage( $( "#word" ).val(),
            $( "#limit" ).val() +
            offsetUrl + offsetValue)
    };

    lgiftm.setGiphySearchImage = function( word, conditions ){

        var url = "";
        if ( $( "#trending" ).prop( "checked" ) ) {
            url = giphyRoot + trendUrl + apiUrl +
                apiKey + limitUrl + conditions;
        } else {
            url = giphyRoot + searchUrl + word + apiUrl +
                apiKey + limitUrl + conditions;
        }

        $.getJSON(

            url,

            function(data) {

                var i = 0;
                $.each(data.data, function( key, val ) {
                    $( lgtmId ).append(
                        imgTag1 + val.images.original.url +
                        imgTag2 + i + imgTag3 +
                        val.images.fixed_width_small.url + imgTag4
                    );
                    i++;
                });

                // クリックしただけでクリップボードに貼り付けちゃう便利ライブラリ
                new Clipboard( clipboardClass );
            }

        );

        offsetValue += parseInt( $( "#limit" ).val() );

    };

    lgiftm.clear = function(){
        $( "div" + lgtmId ).empty();
        offsetValue = 0;
    }
})();

( function(){

    "use strict";

    // 初期表示用
    lgiftm.setGiphySearchImage( "cat", 10 );

    $( "#btn" ).click( function( e ) {

        // 表示初期化してから検索画像を表示しまっせ
        lgiftm.clear();
        lgiftm.setGiphySearchImage( $( "#word" ).val(), $( "#limit" ).val() );

    });

    $( "#more_btn" ).click( function( e ) {

        // 検索画像をもっと表示しまっせ
        lgiftm.setMoreGiphySearchImage();

    });

})();