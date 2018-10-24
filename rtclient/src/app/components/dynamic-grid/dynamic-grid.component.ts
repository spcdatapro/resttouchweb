import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dynamic-grid',
  templateUrl: './dynamic-grid.component.html',
  styleUrls: ['./dynamic-grid.component.scss']
})
export class DynamicGridComponent implements OnInit, OnChanges {

  @Input() cardItems: any[] = [];
  @Input() maxColumns = 6;
  @Output() itemClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() trashClick: EventEmitter<any> = new EventEmitter<any>();

  matriz: any[] = [];
  searchText: string = null;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() { this.setCardItems(); }

  setCardItems() {
    this.matriz = [];
    // this.matriz.push([]);
    for (let i = 0; i < this.cardItems.length; i++) {
      if ((i % this.maxColumns) === 0) { this.matriz.push([]); }
      this.matriz[this.matriz.length - 1].push(this.cardItems[i]);
    }
  }

  trackByFnRows(index, item) { return index; }

  trackByFnCols(index, item) { return item._id; }

  cardItemClick(event: Event, itemId: string = null, accion: string = 'u') {
    event.preventDefault();
    event.stopPropagation();

    const debaja = this.cardItems.find(obj => obj._id === itemId).debaja || false;
    if (!debaja) {
      switch (accion) {
        case 'u': this.itemClick.emit(itemId); break;
        case 'd': this.trashClick.emit(itemId); break;
        default: this.itemClick.emit(itemId); break;
      }
    }
  }
}
