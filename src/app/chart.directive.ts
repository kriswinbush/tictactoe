import { Directive, ElementRef, OnInit,Input } from '@angular/core';
import * as d3 from 'd3';
@Directive({
  selector: '[tttChart]'
})
export class ChartDirective implements OnInit {
  barMargin = {top: 10, right: 10, bottom: 90, left: 10};
  dataSet = [];
  svgWidth = 500;
  svgHeight = 400;
  barPadding = 5;
  barWidth: number;

  @Input() set tttChart(val) {
    this.dataSet = val;
    this.buildBarChart();
  }

  constructor(private el:ElementRef) {}
   ngOnInit() {}

   buildBarChart() {
    this.barWidth = (this.svgWidth / this.dataSet.length);
     let svg = d3.select(this.el.nativeElement)
                  .attr('height', this.svgHeight)
                  .attr('width', this.svgWidth)
                  .attr('class', "bar-chart");

    let barChart = svg.selectAll("g")
                      .data(this.dataSet)
                      .enter()
                      .append('g')
                      
    barChart.append('rect')
            .attr('fill', (d) => { 
              let c = d.color;
              switch(c) {
                case "color1":
                return "red"
                case "color2":
                return "blue"
                case "color3":
                return "green";
                default:
                return
              }
            })
            .attr('y', (d) => this.svgHeight - d.wins * 10)
            .attr('height', (d) =>  d.wins * 10)
            .attr('width', this.barWidth - this.barPadding)
            .attr('transform', (d, i) => `translate(${[this.barWidth * i, 0]})`)
    
    barChart.append("text")
            .text(d => d.name)
            .attr('y', (d) => this.svgHeight - d.wins)
            .attr('x', (d) => this.barWidth / 3)
            .attr('transform', (d, i) => `translate(${[this.barWidth * i, 0]})`)
   }
   

}
