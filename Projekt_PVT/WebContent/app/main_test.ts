import { bootstrap }        from '@angular/platform-browser-dynamic';
import { Component }        from '@angular/core';
import { CHART_DIRECTIVES } from 'angular2-highcharts'; 

@Component({
    selector: 'my-app',
    directives: [CHART_DIRECTIVES],
    styles: [`
      chart {
        display: block;
      }
      button {
        display: block;
        width: 100%;
        height: 25px;
      }
  `]
    template: `
        <chart [options]="options" (load)="saveChart($event.context)">
          <series (hide)="onSeriesHide($event.context)">
            <point (select)="onPointSelect($event.context)"></point>
          </series>
        </chart>
        <button (click)="addPoint()">Click to add random points</button>
    `
})
class AppComponent {
    constructor() {
        this.options = {
            title : { text : 'angular2-highcharts example' },
            series: [{
                name: 's1',
                data: [2,3,5,8,13],
                allowPointSelect: true
            },{
                name: 's2',
                data: [-2,-3,-5,-8,-13],
                allowPointSelect: true
            }]
        };
    } 
    options: Object;
    chart: Object;
    saveChart(chart) {
      this.chart = chart;
    }
    addPoint() {
      this.chart.series[0].addPoint(Math.random() * 10);
      this.chart.series[1].addPoint(Math.random() * -10);
    }
    onPointSelect(point) {
      alert(`${point.y} is selected`);
    }
    onSeriesHide(series) {
      alert(`${series.name} is selected`);
    }
    
}

bootstrap(AppComponent);
