import { Component, OnInit } from '@angular/core';
import { EventDrivenService } from 'src/app/services/event.driven.service';
import { ActionEvent } from '../state/product.state';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
counter:number =0;
  constructor(private eventdrivenService:EventDrivenService) { }

  ngOnInit(): void {
    this.eventdrivenService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent) =>{
      ++this.counter;
    })
  }

}
