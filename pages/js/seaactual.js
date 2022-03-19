var margin = {top: 10, right: 30, bottom: 70, left: 60},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg = d3.select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

d3.csv("./dataset/seaactual.csv",
    function(d){
        return { date : d3.timeParse("%Y-%m-%d")(d.date), value:d.actual_min_temp }
    },

    function(data) {
        var x = d3.scaleTime()
            .domain(d3.extent(data, function(d) { return d.date; }))
            .range([ 0, width ]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        var y = d3.scaleLinear()
            .domain([20, 70])
            .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y));

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "orange")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return x(d.date) })
                .y(function(d) { return y(d.value) }))

//         svg
//             .append("g")
//             .selectAll("dot")
//             .data(data)
//             .enter()
//             .append("circle")
//                 .attr("cx", function(d) { return x(d.date) } )
//                 .attr("cy", function(d) { return y(d.value) } )
//                 .attr("r", 5)
//                 .attr("fill", "#69b3a2")
})