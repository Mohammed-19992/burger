var application = {
    devoured: function (id) {
        $.ajax({
            url: `/api/burger/${id}`,
            type: "PUT",
            success: function () {
                window.location.reload();
            }
        })
    },

    actions: function () {
        $(".devour-btn").on("click", function () {
            let id = $(this).attr("data-burger");
            application.devoured(id);
        });

        $("#addBurger").on("click", function (e) {
            e.preventDefault();
            const data = {
                name: $("#burgerName").val()
            };
            $.ajax({
                type: "POST",
                url: "api/burger",
                data: data,
                success: function (results) {
                    console.log(results);
                    window.location.reload();
                }
            });
        });
    },

    init: function () {
        this.actions();
    }
};

$(document).ready(function() {
   application.init();
});