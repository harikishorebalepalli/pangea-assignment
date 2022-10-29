import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IgxLegendComponent, IgxCategoryChartComponent } from 'igniteui-angular-charts';
import { CountryRenewableElectricity } from 'src/assets/source';
import { DataService } from 'src/services/data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // @ViewChild("legend", { static: true } )
  // private legend: IgxLegendComponent
  // @ViewChild("chart", { static: true } )
  // private chart: IgxCategoryChartComponent

  // private _countryRenewableElectricity: CountryRenewableElectricity ;
  // public get countryRenewableElectricity(): CountryRenewableElectricity {
  //     if (this._countryRenewableElectricity == null)
  //     {
  //         this._countryRenewableElectricity = new CountryRenewableElectricity();
  //     }
  //     console.log(this._countryRenewableElectricity)
  //     return this._countryRenewableElectricity;
  // }


  // single = [
  //   {
  //     "name": "Karthikeyan",
  //     "series": [
  //       {
  //         "name": "2016",
  //         "value": "15000"
  //       },
  //       {
  //         "name": "2017",
  //         "value": "20000"
  //       },
  //       {
  //         "name": "2018",
  //         "value": "25000"
  //       },
  //       {
  //         "name": "2019",
  //         "value": "30000"
  //       }
  //     ],
  //   },
  //   {
  //     "name": "Gnana Prakasam",
  //     "series": [
  //       {
  //         "name": "2016",
  //         "value": "4000"
  //       },
  //       {
  //         "name": "2017",
  //         "value": "4500"
  //       },
  //       {
  //         "name": "2018",
  //         "value": "10000"
  //       },
  //       {
  //         "name": "2019",
  //         "value": "15000"
  //       }
  //     ],
  //   },
  //   {
  //     "name": "Kumaresan",
  //     "series": [
  //       {
  //         "name": "2016",
  //         "value": "5000"
  //       },
  //       {
  //         "name": "2017",
  //         "value": "8000"
  //       },
  //       {
  //         "name": "2018",
  //         "value": "15000"
  //       },
  //       {
  //         "name": "2019",
  //         "value": "35000"
  //       }
  //     ],
  //   }
  
  // ];
  single: { name: any; series: any[]; }[] = [];
  public view :[number,number]= [700, 400];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel: "Years";
  public showYAxisLabel = true;
  public yAxisLabel: "Salary";
  public graphDataChart: any[];
  public colorScheme : any= {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  uniqueProds:any[] = [];
  selected: any[];
  selections = new FormControl('');
  currentData: { name: any; series: any[]; }[];

  constructor(private datService: DataService, private _detector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.datService.fetchData().subscribe((data) => {
      this.data = data;
      this.uniqueProds = [...new Set(data.map((ob)=> ob.product))];
      let array: { name: any; series: any[]; }[] = [];
      this.uniqueProds.forEach((prod) => {
        array.push({'name': prod, 'series':[]});
      });
      this.data.forEach((ob: any) =>{
        let item = array.find(i => i.name == ob.product);
        item?.series.push({'name': ob.month, 'value': ob.acv});
      });
      this.single = array;
      this.currentData = this.single;
      console.log(this.single)
    })
  }

  columns = [
    { name: 'S No' , prop: 'S_no'},
    { name: 'Line Of Business' , prop: 'line_of_business'},
    { name: 'Revenue Type' , prop: 'revenue_type'},
    { name: 'Product' , prop: 'product'},
    { name: 'Posting Period ' , prop: 'month'},
    { name: 'ACV' , prop: 'acv'},
    { name: 'TCV' , prop: 'tcv'},
    { name: 'Revenue' , prop: 'revenue'},

  ]

  change(){
    this.currentData = this.single.filter((obj) => this.selected.includes(obj.name));
  }



  data: any = [];

}
