import { Injectable } from '@angular/core';
import { Asset } from './asset'
const path = require('path');
import { BehaviorSubject } from 'rxjs';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';

const ASSETS_PATH_BACKGROUND: string = './svgs/background/';
const ASSETS_PATH_WINGS:      string = './svgs/wings/';
const ASSETS_PATH_BODY:       string = './svgs/body/';
const ASSETS_PATH_EYES:       string = './svgs/eyes/';
const ASSETS_PATH_MOUTH:      string = './svgs/mouth/';
const ASSETS_PATH_CHEEK:      string = './svgs/cheeks/';
const ASSETS_PATH_OUTFIT:     string = './svgs/outfit/';
const ASSETS_PATH_HAT:        string = './svgs/hat/';
const ASSETS_PATH_ITEM:       string = './svgs/item/';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  // Data
  _background: Array<Asset> = new Array<Asset>();
  _wings: Array<Asset> = new Array<Asset>();
  _body: Array<Asset> = new Array<Asset>();
  _eyes: Array<Asset> = new Array<Asset>();
  _mouth: Array<Asset> = new Array<Asset>();
  _cheek: Array<Asset> = new Array<Asset>();
  _outfit: Array<Asset> = new Array<Asset>();
  _hat: Array<Asset> = new Array<Asset>();
  _item: Array<Asset> = new Array<Asset>();
// Events

backgroundStream$ = new BehaviorSubject<Array<Asset>>(null);
wingsStream$ = new BehaviorSubject<Array<Asset>>(null);
bodyStream$ = new BehaviorSubject<Array<Asset>>(null);
eyesStream$ = new BehaviorSubject<Array<Asset>>(null);
mouthStream$ = new BehaviorSubject<Array<Asset>>(null);
cheekStream$ = new BehaviorSubject<Array<Asset>>(null);
outfitStream$ = new BehaviorSubject<Array<Asset>>(null);
hatStream$ = new BehaviorSubject<Array<Asset>>(null);
itemStream$ = new BehaviorSubject<Array<Asset>>(null);

  constructor() {
    this._background = this.getAssets(ASSETS_PATH_BACKGROUND, "img-background");
    this._wings = this.getAssets(ASSETS_PATH_WINGS, "img-wings");
    this._body = this.getAssets(ASSETS_PATH_BODY, "img-body");
    this._eyes = this.getAssets(ASSETS_PATH_EYES, "img-eyes");
    this._mouth = this.getAssets(ASSETS_PATH_MOUTH, "img-mouth");
    this._cheek = this.getAssets(ASSETS_PATH_CHEEK, "img-cheeks");
    this._outfit = this.getAssets(ASSETS_PATH_OUTFIT, "img-outfit");
    this._hat = this.getAssets(ASSETS_PATH_HAT, "img-hat");
    this._item = this.getAssets(ASSETS_PATH_ITEM, "img-item");

    this.backgroundStream$.next(this._background);
    this.wingsStream$.next(this._wings);
    this.bodyStream$.next(this._body);
    this.eyesStream$.next(this._eyes);
    this.mouthStream$.next(this._mouth);
    this.cheekStream$.next(this._cheek);
    this.outfitStream$.next(this._outfit);
    this.hatStream$.next(this._hat);
    this.itemStream$.next(this._item);
  }

  getBackgrounds(): BehaviorSubject<Array<Asset>> {
    return this.backgroundStream$;
  }

  getWings(): BehaviorSubject<Array<Asset>> {
    return this.wingsStream$;
  }

  getBodies(): BehaviorSubject<Array<Asset>> {
    return this.bodyStream$;
  }

  getEyes(): BehaviorSubject<Array<Asset>> {
    return this.eyesStream$;
  }

  getMouth(): BehaviorSubject<Array<Asset>> {
    return this.mouthStream$;
  }

  getCheeks(): BehaviorSubject<Array<Asset>> {
    return this.cheekStream$;
  }

  getOutfits(): BehaviorSubject<Array<Asset>> {
    return this.outfitStream$;
  }

  getHat(): BehaviorSubject<Array<Asset>> {
    return this.hatStream$;
  }

  getItem(): BehaviorSubject<Array<Asset>> {
    return this.itemStream$;
  }

  getAssets(path: string, id: string): Array<Asset>
  {
    let assets : Array<Asset> = new Array<Asset>();

    const files = fs.readdirSync(path)
    
    for (const file of files) {
      assets.push({id: id, path: path + file, name: this.basename(file), content: "" });
    }

    return assets;
  }

  basename(path) {
    let separator = '/'

    const windowsSeparator = '\\'

    if (path.includes(windowsSeparator)) {
      separator = windowsSeparator
    }

    let str = path.slice(path.lastIndexOf(separator) + 1);
 
    let index = str.lastIndexOf(".");
    let before = str.slice(0, index);

    return before;
  }
}