/**
 * Created by Administrator on 2016/12/3.
 */

(function($) {

    // $.fn.greenify = function (options) {
    //     var settings = $.extend({
    //         color: "#556b2f",
    //         backgroundColor: "black"
    //     }, options);
    //     return this.css({
    //         color: settings.color,
    //         backgroundColor: settings.backgroundColor
    //     });
    // };

    $.fn.showLocation = function () {
        // this.filter('a').each(function () {
        //     var linkJQuery = $(this);
        //     linkJQuery.append('((' + linkJQuery.attr('href') + '))');
        // });

        this.filter('a').append(function () {
            return '{' + this.href + '}';
        });

        return this;
    };

}(jQuery));
