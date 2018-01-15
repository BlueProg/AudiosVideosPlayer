import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import {DataLoaderProvider} from "../../providers/data-loader/data-loader";
import "rxjs/add/operator/pluck";

interface Item {
    title: string,
    url: string,
    audio: string
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {
  private providerFlux$: any;
  private item: any = {};
  private datas: [Item];
  @ViewChild('audioRef') private audioElem;

  constructor(public navCtrl: NavController, private dataLoader: DataLoaderProvider) {

  }

  ngOnInit(): void {

    this.providerFlux$ = this.dataLoader.getJsonFile()
      .pluck('datas')
      .subscribe((datas: [Item]) => {
        this.datas = datas;
        this.item = datas[Math.floor(Math.random() * (datas.length))];
        this.audioElem.nativeElement.load();
        this.audioElem.nativeElement.play();
      });
  }

  newRandom() {
    this.item = this.datas[Math.floor(Math.random() * (this.datas.length))];
    this.audioElem.nativeElement.load();
    this.audioElem.nativeElement.play();
  }

  ngOnDestroy(): void {
    this.providerFlux$.unsubscribe();
  }
}
