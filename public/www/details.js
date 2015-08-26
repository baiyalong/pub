/**
 * Created by bai on 2015/8/26.
 */

var map = function () {
    var width = $('#map').width();
    var height = $('#map').height();

    var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(0,0)");

    var projection = d3.geo.mercator()
        .center([115, 40])
        .scale(700)
    // .translate([0, 0]);

    var path = d3.geo.path()
        .projection(projection);


    var color = d3.scale.category20();


    d3.json("/mapdata/geometryProvince/15.json", function (error, root) {

        if (error)
            return console.error(error);
        console.log(root.features);

        svg.selectAll("path")
            .data(root.features)
            .enter()
            .append("path")
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("fill", function (d, i) {
                return color(i);
            })
            .attr("d", path)
            .on("mouseover", function (d, i) {
                d3.select(this)
                    .attr("fill", "yellow");
            })
            .on("mouseout", function (d, i) {
                d3.select(this)
                    .attr("fill", color(i));
            });

    });
}


var tableCity = function () {
    $.getJSON('/test/detailsTableCity.json', function (data, status) {
        if (status == 'success') {
            var trs = data.reduce(function (p, c) {
                return p + '<tr>' +
                    '<td>' + c.city + '</td>' +
                    '<td>' + c.AQI + '</td>' +
                    '<td>' + c['PM2.5'] + '</td>' +
                    '<td>' + c.PM10 + '</td>' +
                    '<td>' + c.O3 + '</td>' +
                    '</tr>'
            }, '');
            $(trs).appendTo($('#city'));
        }
    });
}


var tableTime = function () {
    $.getJSON('/test/detailsTableTime.json', function (data, status) {
        if (status == 'success') {
            var trs = data.reduce(function (p, c) {
                return p + '<tr>' +
                    '<td>' + c.t + '</td>' +
                    '<td>' + c.q + '</td>' +
                    '<td>' + c.m + '</td>' +
                    '</tr>'
            }, '');
            $(trs).appendTo($('#time'));
        }
    });
}


var tableTerminal = function () {
    $.getJSON('/test/detailsTableTerminal.json', function (data, status) {
        if (status == 'success') {
            var trs = data.reduce(function (p, c) {
                return p + '<tr>' +
                    '<td>' + c.t + '</td>' +
                    '<td>' + c.v + '</td>' +
                    '</tr>'
            }, '');
            $(trs).appendTo($('#terminal'));
        }
    });
}


$(function () {
    map();
    tableCity();
    tableTime();
    tableTerminal();
})