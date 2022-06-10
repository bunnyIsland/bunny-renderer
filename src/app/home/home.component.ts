import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
const fs = require('fs');



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
  svgFiles = [{
        id: 'image1',
        src: ''
    }, {
        id: 'image2',
        src: ''
    }, {
        id: 'image3',
        src: ''
    }, {
        id: 'image4',
        src: ''
    }]
  constructor(private router: Router) { }

  ngOnInit(): void {

    const dir = './svgs/'
    const files = fs.readdirSync(dir)
    
    for (const file of files) {
      console.log(file)
    }
    
    fs.readFile('./svgs/Body/Faerie.svg', 'utf-8', (err, data) => {
      if(err){
          alert("An error ocurred reading the file :" + err.message);
          return;
      }

      data = data.replace(/cls/g,'body-cls');
      // Change how to handle the file content
      this.svgFiles[0].src = data;
      this.updateImage();
  });

  fs.readFile('./svgs/Eyes/Raised left eyebrow.svg', 'utf-8', (err, data) => {
    if(err){
        alert("An error ocurred reading the file :" + err.message);
        return;
    }

    data = data.replace(/cls/g,'eyes-cls');
    // Change how to handle the file content
    this.svgFiles[1].src = data;
    this.updateImage();
});

fs.readFile('./svgs/Mouth/Brown pigtail beard.svg', 'utf-8', (err, data) => {
  if(err){
      alert("An error ocurred reading the file :" + err.message);
      return;
  }

  data = data.replace(/cls/g,'mouth-cls');
  // Change how to handle the file content
  this.svgFiles[2].src = data;
  this.updateImage();
});

fs.readFile('./svgs/Accessories Hand/Pink love baloon.svg', 'utf-8', (err, data) => {
  if(err){
      alert("An error ocurred reading the file :" + err.message);
      return;
  }

  data = data.replace(/cls/g,'hand-cls');
  // Change how to handle the file content
  this.svgFiles[3].src = data;
  this.updateImage();
});

    console.log('HomeComponent INIT');
  }

  updateImage()
  {     // Create a new dom parser to turn the SVG string into an element.
    const parser = new DOMParser();

    // Loop over each object in the array and use the id and src
    // with a destructuring assignment.
    for (const {
          id,
          src
      }
      of this.svgFiles) {

      console.log("A  ");
      // Find the image. If it is not there, continue with the
      // loop to the next iteration.
      let image = document.getElementById(id);
      if (image === null || src === '')
          continue;

      // Turn the raw text into a document with the svg element in it.
      const parsed = parser.parseFromString(src, 'text/html');

      // Select the <svg> element from that document.
      const svg = parsed.querySelector('svg');

      // If the svg is found, replace the image with the svg.
      // Otherwise, continue the loop.
      if (svg === null)
          continue;

      image.replaceWith(svg);
    }}
}
