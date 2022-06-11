import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetsService } from '../core/services';
import { Asset } from '../core/services/app/asset';
const fs = require('fs');
import { of, zip, map } from 'rxjs';



interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Array of object containing the id of the image you want to replace
  // and the src of the SVG that takes it's place.
  _background: Array<Asset> = new Array<Asset>();
  _wings: Array<Asset> = new Array<Asset>();
  _body: Array<Asset> = new Array<Asset>();
  _eyes: Array<Asset> = new Array<Asset>();
  _mouth: Array<Asset> = new Array<Asset>();
  _cheek: Array<Asset> = new Array<Asset>();
  _outfit: Array<Asset> = new Array<Asset>();
  _hat: Array<Asset> = new Array<Asset>();
  _item: Array<Asset> = new Array<Asset>();

  _currentBackground: Asset = null;
  _currentWings: Asset = null;
  _currentBody: Asset = null;
  _currentEyes: Asset = null;
  _currentMouth: Asset = null;
  _currentCheek: Asset = null;
  _currentOutfit: Asset = null;
  _currentHat: Asset = null;
  _currentItem: Asset = null;

  _assetsToReder: Array<Asset> = new Array<Asset>();

  constructor(private router: Router, private _assetsService: AssetsService) { }

  ngOnInit(): void {

    zip(
      this._assetsService.getBackgrounds(),
      this._assetsService.getBodies(),
      this._assetsService.getCheeks(),
      this._assetsService.getEyes(),
      this._assetsService.getMouth(),
      this._assetsService.getHat(),
      this._assetsService.getOutfits(),
      this._assetsService.getItem(),
      this._assetsService.getWings())
    .subscribe(([backgrounds, bodies, cheeks, eyes, mouth, hat, outfit, item, wings]) =>
    {
      this._background = backgrounds;
      this._body = bodies;
      this._cheek = cheeks;
      this._eyes = eyes;
      this._mouth = mouth;
      this._hat = hat;
      this._outfit = outfit;
      this._item = item;
      this._wings = wings;

      this._currentBackground = this._background[0];
      this._currentWings = this._wings[0];
      this._currentBody = this._body[0];
      this._currentEyes = this._eyes[0];
      this._currentMouth = this._mouth[0];
      this._currentCheek = this._cheek[0];
      this._currentOutfit = this._outfit[0];
      this._currentHat = this._hat[0];
      this._currentItem = this._item[0];

      this.reload();
    });
  }

  reload()
  {
    this._assetsToReder = new Array<Asset>();
    this.loadSvg(this._currentBackground);
    this.loadSvg(this._currentBody);
    this.loadSvg(this._currentWings);
    this.loadSvg(this._currentEyes);
    this.loadSvg(this._currentMouth);
    this.loadSvg(this._currentCheek);
    this.loadSvg(this._currentHat);
    this.loadSvg(this._currentOutfit);
    this.loadSvg(this._currentItem);
  }

  onBackgroundChange(asset)
  {
    this._currentBackground = asset;
    this.reload();
  }

  onWingChange(asset)
  {
    this._currentWings = asset;
    this.reload();
  }

  onBodyChange(asset)
  {
    this._currentBody = asset;
    this.reload();
  }

  onEyesChange(asset)
  {
    this._currentEyes = asset;
    this.reload();
  }
  
  onMouthChange(asset)
  {
    this._currentMouth = asset;
    this.reload();
  }
  
  onCheekChange(asset)
  {
    this._currentCheek = asset;
    this.reload();
  }

  onOufitChange(asset)
  {
    this._currentOutfit = asset;
    this.reload();
  }
  
  onHatChange(asset)
  {
    this._currentHat = asset;
    this.reload();
  }
  
  onItemChange(asset)
  {
    this._currentItem = asset;
    this.reload();
  }
  
  loadSvg(asset: Asset)
  {
    fs.readFile(asset.path, 'utf-8', (err, data) => {
      if(err){
          alert("An error ocurred reading the file :" + err.message);
          return;
      }

        data = data.replace(/cls/g, asset.id + '-cls');
        // Change how to handle the file content

        asset.content = data;
        this._assetsToReder.push(asset);
        this.updateImage(this._assetsToReder);
    });
  }

  updateImage(svgFiles)
  {     // Create a new dom parser to turn the SVG string into an element.
    const parser = new DOMParser();

    // Loop over each object in the array and use the id and src
    // with a destructuring assignment.
    for (const {
          id,
          content
      }
      of svgFiles) {

      // Find the image. If it is not there, continue with the
      // loop to the next iteration.
      let image = document.getElementById(id);

      if (image === null || content === '')
          continue;

      console.log("A  ");

      // Turn the raw text into a document with the svg element in it.
      const parsed = parser.parseFromString(content, 'text/html');

      // Select the <svg> element from that document.
      const svg = parsed.querySelector('svg');
      svg.id = id;

      // If the svg is found, replace the image with the svg.
      // Otherwise, continue the loop.
      if (svg === null)
          continue;

      image.replaceWith(svg);
    }}
}
