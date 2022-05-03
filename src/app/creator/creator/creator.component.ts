import { Component, OnInit } from '@angular/core';
import { GetContentService } from 'src/app/services/get-content.service';
import { Creator } from './creatorModel/CreatorDataContainer';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit {

  creators: Creator[] = []
  fetching: boolean = false;
  loaded:boolean = false;
  currentOffset: number = 0

  constructor(private _getContentService: GetContentService) { }

  ngOnInit(): void {
    this.getCreators(this.currentOffset)
  }

  getCreators(offset: number) {
    this.fetching = true;
    this._getContentService.getAllcreator(offset).subscribe((response) => {
      this.creators = response.data.results
      // console.log(response);
      this.currentOffset += 15;
      this.fetching = false;
      this.loaded = true;
    })
  }

  loadMore() {
    this.currentOffset += 15;
    this._getContentService.getAllcreator(this.currentOffset).subscribe( (response) => {
      this.creators = this.creators.concat(response.data.results)
    } )
  }
}
