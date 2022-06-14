import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Story } from 'src/app/Models/storyModel/Story';
import { ContentFunctionalityService } from 'src/app/services/content-functionality.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  searchKey:string = ''

  constructor(private _cf: ContentFunctionalityService) { }

  ngOnInit(): void {
    this._cf.search.subscribe( (value) => {
      console.log(value);
      this.searchKey = value
    } )
  }

  @Input()stories:Story[]
  @Input()isOverviewMode:boolean
  @Input()storyLoadBtn:boolean
  @Output()load = new EventEmitter()


  loadMore(){
    this.load.emit()
  }
}
