let animationDuration = 1000

d3.json("data/triangles.json")
  .then(dataset => {

    let createSvg = () =>
      d3.select("body").append("svg")
        .attr("width", 1200)
        .attr("height", 1500)

    let drawTriangles = (dataset) => {
      let triangleGroups = svg.selectAll('.triangle').data(dataset)

      // enter

      let triangleGroupsEnter = triangleGroups.enter()
        .append('g')
        .attr('class', 'triangle')

      triangleGroupsEnter.append('path')
        .attr('d', element => trianglePath(element))
        .attr('fill', element => `hsl(${element.hue}, 100%, 50%)`)
        .on('click', pathClickLeft)
        .on("contextmenu", pathClickRight)

      triangleGroupsEnter.append('line')
        .attr('class', 'right_side')
        .attr('x1', element => topX(element))
        .attr('y1', element => topY(element))
        .attr('x2', element => downRightX(element))
        .attr('y2', element => downRightY(element))
        .on('click', sideClickLeft)
        .on("contextmenu", sideClickRight)

      triangleGroupsEnter.append('line')
        .attr('class', 'base')
        .attr('x1', element => downRightX(element))
        .attr('y1', element => downRightY(element))
        .attr('x2', element => downLeftX(element))
        .attr('y2', element => downLeftY(element))
        .on('click', baseClickLeft)
        .on("contextmenu", baseClickRight)

      triangleGroupsEnter.append('line')
        .attr('class', 'left_side')
        .attr('x1', element => downLeftX(element))
        .attr('y1', element => downLeftY(element))
        .attr('x2', element => topX(element))
        .attr('y2', element => topY(element))
        .on('click', sideClickLeft)
        .on("contextmenu", sideClickRight)

      // update

      triangleGroups
        .select('path')
        .transition().duration(animationDuration)
        .attr('d', element => trianglePath(element))
        .attr('fill', element => `hsl(${element.hue}, 100%, 50%)`)

      triangleGroups
        .select('.right_side')
        .transition().duration(animationDuration)
        .attr('x1', element => topX(element))
        .attr('y1', element => topY(element))
        .attr('x2', element => downRightX(element))
        .attr('y2', element => downRightY(element))

      triangleGroups
        .select('.base')
        .transition().duration(animationDuration)
        .attr('x1', element => downRightX(element))
        .attr('y1', element => downRightY(element))
        .attr('x2', element => downLeftX(element))
        .attr('y2', element => downLeftY(element))

      triangleGroups
        .select('.left_side')
        .transition().duration(animationDuration)
        .attr('x1', element => downLeftX(element))
        .attr('y1', element => downLeftY(element))
        .attr('x2', element => topX(element))
        .attr('y2', element => topY(element))

      // exit

      triangleGroups.exit().remove()
    }

    let pathClickLeft = d => {
      dataset = dataset.map(element => {
        return {
          'horizontal_position': element.horizontal_position,
          "vertical_position": element.hue,
          "base_length": element.base_length,
          "sides_length": element.sides_length,
          "hue": element.vertical_position
        }
      })
      drawTriangles(dataset)
    }

    let pathClickRight = d => {
      d3.event.preventDefault()
      dataset = dataset.map(element => {
        return {
          'horizontal_position': element.hue,
          "vertical_position": element.vertical_position,
          "base_length": element.base_length,
          "sides_length": element.sides_length,
          "hue": element.horizontal_position
        }
      })
      drawTriangles(dataset)
    }

    let baseClickLeft = d => {
      dataset = dataset.map(element => {
        return {
          'horizontal_position': element.horizontal_position,
          "vertical_position": element.base_length,
          "base_length": element.vertical_position,
          "sides_length": element.sides_length,
          "hue": element.hue
        }
      })
      drawTriangles(dataset)
    }

    let sideClickLeft = d => {
      dataset = dataset.map(element => {
        return {
          'horizontal_position': element.horizontal_position,
          "vertical_position": element.sides_length,
          "base_length": element.base_length,
          "sides_length": element.vertical_position,
          "hue": element.hue
        }
      })
      drawTriangles(dataset)
    }

    let baseClickRight = d => {
      d3.event.preventDefault()
      dataset = dataset.map(element => {
        return {
          'horizontal_position': element.base_length,
          "vertical_position": element.vertical_position,
          "base_length": element.horizontal_position,
          "sides_length": element.sides_length,
          "hue": element.hue
        }
      })
      drawTriangles(dataset)
    }

    let sideClickRight = d => {
      d3.event.preventDefault()
      dataset = dataset.map(element => {
        return {
          'horizontal_position': element.sides_length,
          "vertical_position": element.vertical_position,
          "base_length": element.base_length,
          "sides_length": element.horizontal_position,
          "hue": element.hue
        }
      })
      drawTriangles(dataset)
    }

    let trianglePath = element => {
      let height = triangleHeight(element.sides_length, element.base_length)
      let topX = element.horizontal_position, topY = element.vertical_position
      let downRightX = topX + element.base_length / 2, downRightY = topY + height
      let downLeftX = downRightX - element.base_length, downLeftY = topY + height

      return 'M ' + topX + ' ' + topY + ' L ' + downRightX + ' ' + downRightY + ' L ' + downLeftX + ' ' + downLeftY + ' L ' + topX + ' ' + topY
    }

    let topX = element => element.horizontal_position
    let topY = element => element.vertical_position
    let downRightX = element => topX(element) + element.base_length / 2
    let downRightY = element => topY(element) + triangleHeight(element.sides_length, element.base_length)
    let downLeftX = element => downRightX(element) - element.base_length
    let downLeftY = element => downRightY(element)
    let triangleHeight = (sides_length, base_length) => Math.sqrt(Math.pow(sides_length, 2) - Math.pow(base_length / 2, 2))

    let svg = createSvg()
    drawTriangles(dataset)
  })
  .catch(error => {
    console.log(error)
  })