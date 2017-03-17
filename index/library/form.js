$(document).ready((function () {

    'use-strict';

    var elem,
            // data-fn
            dataFn = $('[data-fn="contacts"]'),
            // data-url
            thisUrl = dataFn.data('url');


    if (typeof $.table_of_contacts == 'undefined')
        $.table_of_contacts = {};

    $.table_of_contacts.get = {
        init: function () {
            if (dataFn) {
                this.getJson();
            } else {
                dataFn.append('No data found.');
            }
        },
        // Get data

        getJson: function (url) {

            var self = this;

            // No ajax cache
            $.ajaxSetup({cache: false});

            // Get json
            $.getJSON(thisUrl, function (data) {

                // load template
                var out_html = self.tpl();
                

                $.each(data, function (i, obj) {
                    // load inner template
                    out_html += self.tpl_inner(obj);

                });
                
                // close tag
                out_html += '</tbody>';
                
                // render templates
                dataFn.append(out_html);
                $("#myTable").tablesorter();
                var sorting = [[0, 0], [0, 0]];
                $("#myTable").trigger("sorton", [sorting]);
                
                // error 
            }).error(function (j, t, e) {
                // render error.
                dataFn.append('<span class="error_table">' +
                        'Error = ' + e +
                        '</span>');
            });
        },
        
        // head table template
        tpl: function () {
            var html = '<tbody id="myBody">';
            return html;
        },
        // inner template
        tpl_inner: function (obj) {

            var html = '<tr>' +
                    '<td>' + obj.name + '</td>' +
                    '<td>' + obj.category + '</td>' +
                    '<td>' + obj.amount + '</td>' +
                    '<td><a class="thumbnail">' + obj.location + '<span><iframe src="https://www.google.com/maps/embed/v1/place?q=' + obj.location + '%2C%20Netherlands&key=AIzaSyAjlhbQOe4DTT7CIEAHCeqJWDpoBCEwrOE"></iframe><br /></span></a><br /></td>' +
                    '<td>' + obj.date + '</td>' +
                    '</tr>';
            return html;
        }

    };
        
    // on ready render data
    $(document).ready(function () {
        $.table_of_contacts.get.init();
    });
}));
