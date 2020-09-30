/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
let d3;
let csv;

d3.csv('cities.csv', d3.autoType).then(data=>{
  console.log('cities', data);
})
