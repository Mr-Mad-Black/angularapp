import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { catchError, forkJoin, of, pipe } from 'rxjs';

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.scss']
})
export class HighchartsComponent {
  val: any = [];
  valx: any = [];
  apis: any;
  err: any;
  xvalue: any;
  dd: any;
  arr: any;
  ps: any = [];
  api: any;
  error: any;
  message: any;
  xva: any;
  pp: any=[];
  constructor(public http: HttpClient) { }
  sda: any = 0;
  data1: any;
  ngOnInit() {
    this.allapi()
  }
  allapi() {
    this.apis = [
      this.http.get('assets/active-alarms.json').pipe(catchError((err: any) => of("error"))),
      this.http.get('assets/bip-error.json').pipe(catchError((err: any) => of("error"))),
      this.http.get('assets/service-outage.json').pipe(catchError((err: any) => of("error"))),
      this.http.get('assets/subscriber-impacted.json').pipe(catchError((err: any) => of("error")))
    ]
    // 

    forkJoin((this.apis)).subscribe((val: any) => {
      const [pie, bip, service, subscriber] = val;
      val.forEach((itm: any) => {
        if (itm == "error") this.api = "Api Error"
      })


      this.error =
      // D
        (!pie && (this.message = "NO DATA")),
        (!bip && (this.message = "NO DATA")),
        (!service && (this.message = "NO DATA")),
        (!subscriber && (this.message = "NO DATA"));

        pie && this.piechart(pie);
        bip && this.Bip(bip);
        service && this.Service(service);
        subscriber && this.Subscriber(subscriber);
    }, (err: any) => {
      console.log("message");
      this.err = err.message
    })
  }

  piechart(data: any) {
    let sda = data.alarm.raised
    let categories = Object.keys(sda)
    let data1 = categories.map((category) => ({
      name: category,
      y: sda[category],
    }))
  

    let piechart: any = {
      credits: "false",

      chart: {

        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },


      title: {
        text: 'Active Alaram',
        align: 'left'
      },
      tooltip: {
        pointFormat: ' <b>{point.y}</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },

      plotOptions: {
        pie: {
          startAngle: 300,
          allowPointSelect: true,
          cursor: 'pointer',

          dataLabels: {
            enabled: false
          },


        },


      },
      colors: ['red', 'rgb(252, 126, 23)', 'rgb(245, 215, 46)', 'bisque', 'cyan'],
      legend: {
        itemStyle: {
          textTransform: "capitalize",

        }, labelFormat: `{name} ({y})`

      },

      series: [{
        showInLegend: true,
        name: 'piechart',
        data: data1,


      }],



    }
    Highcharts.chart("container1", piechart)
  }

  // two
  Bip(data: any) {
    let two: any = {
      credits: "false",
      chart: {
        type: 'column',
        scrollablePlotArea: {
          minWidth: 1000,
          scrollPositionX: 0
        }
      },
      title: {
        text: 'BIP Errors'
      },

      xAxis: {

        categories: data.map((value: any) => value.region)
      },

      yAxis: {
        min: 0,
        title: {
          text: 'PON interface Count'
        },
        tickInterval: 2
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        color: "blue",
        name: 'BIP error Interfaces',
        data: data.map((value: any) => value.count ? value.count : value.count = 0.04
        )

      }]

    }
    Highcharts.chart("container2", two)
  }



  // three
  Service(data: any) {

    let time: any = {
      credits: "false",
      chart: {
        type: 'column'
      },
      title: {
        text: 'Service outage'
      },

      xAxis: {

        type: 'datetime',
        labels: {
          format: '{value:%m/%d/%y}'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number of PON interface'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.name}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        color: "blue",
        name: 'Service outage',
        data: data.map((value: any) => [value.epochtime, value.count])

      }]

    }
    Highcharts.chart("container3", time)

  }


  // four
  Subscriber(data: any) {
    console.log(data);
    
   
    for(let i=1;i<4;i++){
      this.xva=data.map((mp:any) =>mp.epochTime)
      let stv=this.xva[0]-(86400*1000*4);
      let a=stv+86400*1000*i
      this.pp.push({epochTime:a})
    }
  
this.xvalue=[...this.pp,...data]
    
    
    // console.log(this.xva[0])
    

   
  


    let four: any = {
      credits: "false",
      chart: {
        type: 'column'
      },
      title: {
        text: 'subscribers impacted'
      },

      xAxis: {

        type: 'datetime',
        labels: {
          format: '{value:%m/%d/%y}'
        },
        crosshair: true
      },
      yAxis: {

        min: 0,
        title: {
          text: 'Number of Subscribers'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.nmae}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        color: "blue",
        name: 'subscribers impacted',
        data: this.xvalue.map((value: any) => [value.epochTime, value.impactedSubscriberCnt ?value.impactedSubscriberCnt:value.impactedSubscriberCnt=0.1])
      }]

    }
    Highcharts.chart("container4", four)









  }




}
























































