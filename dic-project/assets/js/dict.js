
"use strict";

(function($) {
    document.addEventListener('DOMContentLoaded', function() {
        $('#lookup').on('click', function() {
            let term  = $('#term').val();

            $.ajax({
                url: "/word-search",
                data: {
                    term: term
                },
                success: function(response) {
                    console.log($(".result-list"));
                    $.each(response, function(index, record) {
                        
                        let result = "<li>" + (index + 1) + "(" + record.wordtype + ") :: " + record.definition + "</li>";
                        $(".result-list").append(result);
                    });
                }
            });
        });
    });
})(jQuery);