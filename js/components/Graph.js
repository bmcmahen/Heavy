/**
 * Module dependencies
 */

var d3 = require('d3-browserify');
var randomColor = require('randomcolor');

/**
 * Expose Graph
 */

module.exports = Graph;

// contant variables
var margin = {top: 20, right: 20, bottom: 30, left: 50};
var parseDate = d3.time.format('%x').parse;
var colors = randomColor({ count: 20 });

/**
 * Graph
 * @param {Array} weights of users
 */

function Graph(el, props){
  if (!(this instanceof Graph)) return new Graph(el, props);
  this.el = d3.select(el);
  this.weights = props;
  this.weights.forEach(this.prepareData.bind(this));
  this.draw();
}

Graph.prototype.draw = function(){
  this.setSize();
  this.getExtent();
  this.drawAxis();
  this.drawLines();
}

/**
 * Parse dates and format info correctly
 * @param  {Array} weights 
 * @return {Graph}         
 */

Graph.prototype.prepareData = function(userWeights){
  userWeights.forEach(function(d){
    if (typeof d.date == 'string') {
      d.date = parseDate(d.date);
    }
  }.bind(this));
  return this;
}

/**
 * Set size of graph - this should be triggered
 * at initial load, and potentially when resizing,
 * but remains constant when data changes
 * @return {Graph} 
 */

Graph.prototype.setSize = function(){
  this.width = 960 - margin.left - margin.right;
  this.height =  500 - margin.top - margin.bottom;
  this.x = d3.time.scale().range([ 0, this.width ]);
  this.y = d3.scale.linear().range([this.height, 0]);
  this.xAxis = d3.svg.axis()
    .scale(this.x)
    .orient('bottom')
    .ticks(10)
    .tickFormat(d3.time.format('%m/%d'))
  this.yAxis = d3.svg.axis()
    .scale(this.y)
    .orient('left');
  this.line = d3.svg.line()
    .interpolate("monotone") 
    .x(function(d){ return this.x(d.date); }.bind(this))
    .y(function(d){ return this.y(d.weight); }.bind(this));
  this.svg = d3.select('#graph').append('svg')
    .attr('weight', this.width + margin.left + margin.right)
    .attr('height', this.height + margin.top + margin.bottom)
    .append('g')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  return this;
}

/**
 * Kinda lousy fn for getting extent of our data
 * given all of the users we are currently viewing
 * @return {Graph} 
 */

Graph.prototype.getExtent = function(){
  var weightsMax = [];
  var weightsMin = [];
  var datesMax = [];
  var datesMin = [];

  this.weights.forEach(function(userWeights){
    var dates = d3.extent(userWeights, function(d){ return d.date });
    var weights = d3.extent(userWeights, function(d){ return d.weight });
    weightsMin.push(weights[0]);
    weightsMax.push(weights[1]);
    datesMin.push(dates[0]);
    datesMax.push(dates[1]);
  });

  this.weightMax = d3.max(weightsMax);
  this.weightMin = d3.min(weightsMin);
  this.datesMax = d3.max(datesMax);
  this.datesMin = d3.min(datesMin);

  this.x.domain([this.datesMin, this.datesMax]);
  this.y.domain([this.weightMin, this.weightMax]);

  return this;
}

Graph.prototype.drawLine = function(weights, i){
  return this.svg
    .append('path')
    .datum(weights)
    .attr('class', 'line')
    .style('stroke', colors[i])
    .attr('d', this.line);
}

// call this when updating our lines
Graph.prototype.update = function(props){
  this.weights = props;
  this.weights.forEach(this.prepareData.bind(this));
  this.getExtent();
  this.svg.select(".y-axis").transition().duration(500).call(this.yAxis);
  this.svg.select(".x-axis").transition().duration(500).call(this.xAxis);
  this.lines.forEach(function(line){
    line.transition()
      .duration(500)
      .ease('linear')
      .attr('d', this.line);
  }, this)
}

Graph.prototype.drawLines = function(){
  this.lines = [];
  this.weights.forEach(function(weight, i){
    this.lines.push(this.drawLine(weight, i));
  }, this);
  return this;
};

Graph.prototype.drawAxis = function(){
  
  this.svg.append('g')
    .attr('class', 'x-axis axis')
    .attr('transform', 'translate(0,' + this.height + ')')
    .call(this.xAxis);

  this.svg.append('g')
    .attr('class', 'y-axis axis')
    .call(this.yAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .text('Weight (lbs)');
}