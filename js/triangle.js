let margin = { top: 20, right: 20, bottom: 30, left: 40 }
let width = 1920 - margin.left - margin.right
let height = 1080 - margin.top - margin.bottom

let svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append('path')
  .attr('d', d => {
    var x = 200, y = 200;
    return 'M ' + x + ' ' + y + ' l 100 200 h -100 z';
  })
  .attr('fill', 'red')
  .attr('stroke', 'blue')
  .attr('stroke-width', '2')






d3.json("data/triangles.json")
  .then(data => {
    console.log(data)
    console.log(data[0])
    console.log(data[0].base_length)




  })
  .catch(error => {
    console.log(error)
  });