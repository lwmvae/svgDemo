SVG.Rect = SVG.invent({
  // Initialize node
  create: 'rect'

  // Inherit from
, inherit: SVG.Shape

  // Add parent method
, construct: {
    // Create a rect element
    rect: function(width, height) {
      return this.put(new SVG.Rect()).size(width, height)
    }
  }
})


SVG.Rects = SVG.invent({
  // Initialize node
  create: 'rects'

  // Inherit from
, inherit: SVG.Shape

  // Add parent method
, construct: {
    // Create a rect element
    rects: function(width, height) {
      return this.put(new SVG.Rects()).size(width, height)
    }
  }
})