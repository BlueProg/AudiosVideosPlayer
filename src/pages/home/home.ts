import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import {DataLoaderProvider} from "../../providers/data-loader/data-loader";
import "rxjs/add/operator/pluck";
import { AfterViewInit, ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

interface Item {
    title: string,
    url: string,
    mediaType: string,
    media: string,
    pictures: [string]
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy, AfterViewInit {

  private providerFlux$: any;
  private item: any = {};
  private datas: [Item];
  @ViewChildren('audioRef') private audioElem;

  constructor(public navCtrl: NavController, private dataLoader: DataLoaderProvider, private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {

    this.providerFlux$ = this.dataLoader.getJsonFile()
      .pluck('datas')
      .subscribe((datas: [Item]) => {
        this.datas = datas;
        this.item = datas[this.randItem()];
      });
  }

  ngAfterViewInit(): void {
    this.audioElem.changes.subscribe(datas => {
      if (datas.first) {
		this.loadAndPlay(datas);
      }
    })
  }

  randItem() {
	return Math.floor(Math.random() * (this.datas.length));
  }

  loadAndPlay(audio) {
	audio.first.nativeElement.load();
	audio.first.nativeElement.play();
  }

  newRandom() {
    this.item = Object.assign({}, this.datas[this.randItem()]);
    if (this.audioElem.first) {
      this.loadAndPlay(this.audioElem);
    }
  }

  mediaUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.item.media);
  }

  ngOnDestroy(): void {
    this.providerFlux$.unsubscribe();
  }
}
