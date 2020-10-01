/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console

var dataset;

d3.csv('cities.csv', d3.autoType).then(data=> { 
  console.log('cities', data);
  dataset = data;
  dataset.filter(city => city.eu === true)

  d3.select('.city-count').text('Number of Cities: 28');

  const width = 700;
  const height = 550;
  const svg = d3.select('.population-plot')
      .append('svg')
      .attr('width', width)
      .attr('height', height)

      svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d, i) {
          return d.x;
        })
        .attr("cy", (d,i) => d.y)
        .attr("r", function(d, i) {
          if (d.population < 1000000)
              return 4;
          else 
              return 8;
        })

      svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .attr("x", (d,i) => d.x)
        .attr("y", (d,i) => d.y)
        .text((d, i) => {
          if (d.population > 1000000)
            return d.country;
          else 
            return "";
        })
        .attr("dy", -15)
        .attr("font-size", 11)
        .attr("text-anchor", 'middle')

});

var buildings;
const width = 500;
const height = 500;
const barPadding = 1;


d3.csv('buildings.csv', d3.autoType).then(data=> { 
  console.log('buildings', data);
  buildings = data;
  buildings.sort(function (a,b){
    return b.height_px - a.height_px;
  });

  const svg = d3.select('.info-chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

    svg.selectAll("rect")
      .data(buildings)
      .enter()
      .append("rect")
      .attr("x", 250)
      .attr("y", (d, i) => i * (width / buildings.length))
      .attr("class", "bar")
      .attr("id", "bar")
      .attr("width", (d,i) => d.height_px)
      .attr("height", 25) 
      .attr("fill", "orange")
      .on("click", function(d, i) {
        d3.select('.image').attr('src', "img/" + i.image)
        d3.select('.building-name').text(i.building)
        d3.select('.height').text(i.height_ft + " ft")    
        d3.select('.city').text(i.city)    
        d3.select('.country').text(i.country)    
        d3.select('.floors').text(i.floors)  
        d3.select('.completed').text(i.completed)  

      })
      svg.selectAll("text.labels")
        .data(buildings)
        .enter()
        .append("text")
        .text(function(d){
          return d.building
        })
        .attr("width", 0)
        .attr("height", 0) 
        .attr("x", 0)
        .attr("y", (d, i) => i * (width / buildings.length))
        .attr("text-anchor", "front")
      



});
