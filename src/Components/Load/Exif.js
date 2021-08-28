import React from 'react';
import piexif, { IExif, IExifElement, TagValues} from 'piexifjs';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import Preview from '../Preview/Preview';



const Exif = () => {


  document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
    function handleFileSelect(evt) {

      let file = evt.target.files[0];



      let reader = new FileReader();
      reader.onloadend = function(e) {
          let exifObj = piexif.load(e.target.result);
          console.log(exifObj)
          let output = document.getElementById('output_image');
          output.src = reader.result;
          for (let ifd in exifObj) {
            // console.log(piexif.TAGS[ifd])
              if (ifd == "thumbnail") {
                  continue;
              }
              console.log("-" + ifd);
              for (let tag in exifObj[ifd]) {
                  
                  console.log("  " + piexif.TAGS[ifd][tag]["name"] + ":" + exifObj[ifd][tag]);
              }
          }
      };
      reader.readAsDataURL(file);
    }
}, false);

    

    return (
        <div style={{textAlign:"center", margin: 0, padding:'0px', width:'995px'}}>

          <div className="d-flex row">
              <div className='col'>
                <input type="file" id="files" />
              </div>
              <div className='col'>
                <Preview></Preview>
              </div>
          </div>
        </div>
    );
};

export default Exif;