import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '../../Models/characterModels/Character';
import { Comic } from '../../Models/comicsModels/Comic';
import { ContentFunctionalityService } from '../../services/content-functionality.service';
import { MarvelApiService } from '../../services/marvel-api.service';
import { Story } from '../../Models/storyModel/Story';

@Component({
  selector: 'app-comic-overview',
  templateUrl: './comic-overview.component.html',
  styleUrls: ['./comic-overview.component.css']
})
export class ComicOverviewComponent implements OnInit, OnChanges {

  comics: Comic[];
  characters: Character[] = [];
  stories: Story[] = [];
  loaded: boolean = false;
  sLoaded: boolean = false;
  characterOffset: number = 0;
  storyOffset: number = 0;
  limit: number = 4
  id = this.route.snapshot.params['id'];

  constructor(private route: ActivatedRoute,
    private _getContentService: MarvelApiService,
    private _contentFunctionality: ContentFunctionalityService) {
    // route.paramMap.subscribe(() => {
    //   this.ngOnInit();
    // });
  }

  ngOnChanges(): void {
      this.route.paramMap.subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.getComicById(this.id)
    this.getCharacters(this.id, this.characterOffset)
    this.getStories(this.id, this.storyOffset)
  }


  // getCharacter(id: number, offset: number) {
  //   this._contentFunctionality.testUrl<CharacterDataWrapper>(`comics/${id}/characters?limit=4&offset${offset}&`, (response: CharacterDataWrapper) => {
  //     this.comicCharacters = response.data.results
  //     console.log(response);

  //     this.characterOffset += 4;
  //   })
  // }

  getComicById(id:number) {
    this._getContentService.getComics(undefined, undefined, id).subscribe((response) => {
      // console.log(response);
      this.comics = response.data.results;
    })
  }

  getCharacters(id: number, offset: number) {
    this._getContentService.charByComic(id, this.limit, offset).subscribe((response) => {
      this.characters = response.data.results
      this.characterOffset += 4;
      // console.log(response);
      this.loaded = true;
    })
  }

  loadChar() {
    
    this._getContentService.charByComic(this.id, this.limit, this.characterOffset).subscribe((response) => {
      this.characters = this.characters.concat(response.data.results)
      // console.log(response);
      this.characterOffset += 4;
      
    })
  }

  getStories(id: number, offset: number) {
    this._getContentService.storyByComic(id, this.limit, offset).subscribe((response) => {
      this.stories = response.data.results;
      // console.log(response);
      this.storyOffset += 4;
      this.sLoaded = true;
    })
  }

  loadMoreStory() {
    this._getContentService.storyByComic(this.id, this.limit, this.storyOffset).subscribe((response) => {
      this.stories = this.stories.concat(response.data.results);
      this.storyOffset += 4;
      // console.log(response);
      
    })
  }



  gotoComic(id) {
    this._contentFunctionality.goComics(id)
  }

  gotoSeries(id) {
    this._contentFunctionality.goseries(id)
  }

  goBack() {
    this._contentFunctionality.goBack()
  }

  // getStoriesById(id: number, offset: number) {
  //   this._getContentService.getStoriesByComic(id, offset).subscribe((response) => {
  //     // console.log(response);
  //     this.stories = response.data.results
  //     this.storyOffset += 4;
  //     // alert( this.currentOffset)
  //   })
  // }

  // loadMoreStory() {
  //   this._getContentService.getStoriesByComic(this.id, this.storyOffset).subscribe((response) => {
  //     this.stories = this.stories.concat(response.data.results);
  //     this.storyOffset += 4;
  //   })

  // }


}