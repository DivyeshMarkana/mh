import { Component, OnInit } from '@angular/core';
import { Character } from '../../Models/characterModels/Character';
import { Comic } from '../../Models/comicsModels/Comic';
import { series } from '../../Models/seriesModels/series';
import { MarvelApiService } from '../../services/marvel-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  characters: Character[] = [];
  comics: Comic[] = [];
  seriess:series[] = [];
  loaded: boolean = false;
  limit: number = 4;
  CharacterOffset:number = 603
  comicOffset:number = 605
  seriesOffset: number = 60
  serieId: number = 1009282

  constructor(private _getContentService: MarvelApiService) { }

  ngOnInit(): void {
    this.getCharacter()
    this.getComics()
    this.loaded = true
    this.getSeries()
  }

  getCharacter() {
    this._getContentService.getCharacters(this.limit, this.CharacterOffset).subscribe((response) => {
      this.characters = response.data.results
    })
  }

  getComics() {
    this._getContentService.getComics(this.limit, this.comicOffset).subscribe((response) => {
      this.comics = response.data.results
    })
  }

  getSeries() {
    this._getContentService.seriesCharacter(this.serieId, this.limit, this.seriesOffset).subscribe((response) => {
      this.seriess = response.data.results
      console.log(response);
      
    })
  }
  

  selectedIndex: number = 0;
  indicators: boolean = true;
  controls: boolean = true;
  images = [
    {
      imgSrc: "https://source.unsplash.com/1550x700/?dark",
    },
    {
      imgSrc: "https://source.unsplash.com/1550x700/?marvel",
    },
    {
      imgSrc: "https://source.unsplash.com/1550x700/?laptop",
    },
  ]

  selectImage(index: number) {
    this.selectedIndex = index
  }

  onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1
    }
    this.selectedIndex--
  }
  onNextClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = 0
    }
    this.selectedIndex++
  }

}
