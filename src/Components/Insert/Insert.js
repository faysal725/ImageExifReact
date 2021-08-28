import React, { useRef } from 'react';
import piexif, { IExif, IExifElement, TagValues} from 'piexifjs';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import firebase from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import 'firebase/storage'
import firebaseConfig from '../Firebase/FirebaseConfig'
import { $ }  from 'react-jquery-plugin'





const Insert = () => {
  const storage = firebase.storage()
  // const storageRef = ref(storage);
  const ref =useRef(storage);



  const [imageCont, setImageCont] = useState()

    document.addEventListener('DOMContentLoaded', function(){
        document.getElementById('files').addEventListener('change', handleFileSelect, false);
        function handleFileSelect(evt) {
    
            var file = evt.target.files[0];

            var zeroth = {};
            var exif = {};
            var gps = {};
            zeroth[piexif.ImageIFD.Make] = "Make";
            zeroth[piexif.ImageIFD.XResolution] = [777, 1];
            zeroth[piexif.ImageIFD.YResolution] = 777;
            zeroth[piexif.ImageIFD.Software] = "Piexifjs";
            zeroth[piexif.ImageIFD.DateTime] = 5465456;
            // zeroth[piexif.ImageIFD.ResolutionUnit] = 99995456;
            // console.log(zeroth)
            exif[piexif.ExifIFD.LensSpecification] = [[1, 1], [1, 1], [1, 1], [1, 1]];
            exif[piexif.ExifIFD.DateTimeOriginal] = "2010:10:10 10:10:10";
            exif[piexif.ExifIFD.LensMake] = "LensMake";
            exif[piexif.ExifIFD.Sharpness] = 777;
            exif[piexif.ExifIFD.LensSpecification] = [[1, 1], [1, 1], [1, 1], [1, 1]];
            // exif[piexif.ExifIFD.TileWidth] = 234234;

            gps[piexif.GPSIFD.GPSLatitude] = "E1225:25:59 36:99:86";
            gps[piexif.GPSIFD.GPSLongitude] = "D1225:25:59 36:99:86";
            gps[piexif.GPSIFD.GPSAltitude] = "C12254254541399:86";
            gps[piexif.GPSIFD.GPSSpeedRef] = "B12254254541399:86";
            gps[piexif.GPSIFD.GPSImgDirection] = "A12254254541399:86";
            // gps[piexif.GPSIFD.GPSVersionID] = "A211188";


            var exifObj = {"0th":zeroth, "Exif":exif, "GPS":gps};

            var exifbytes = piexif.dump(exifObj);

            // console.log(exifbytes)
            var reader = new FileReader();
            reader.onload = function(e) {
            var inserted = piexif.insert(exifbytes, e.target.result);
            // console.log(inserted)
            let output = document.getElementById('output_image');
            output.src = reader.result;
            var image = new Image();
            image.id = "convertedImg"
            image.src = inserted;
            image.width = 300;

            // console.log(image)
            var el = $("<div></div>").append(image)
            $("#resized").prepend(el);
            
            // setImageCont(document.getElementById("convertedImg"))
            };
          reader.readAsDataURL(file);
          setImageCont(file)
        }
    }, false);

    console.log(typeof(imageCont), imageCont)


    const handleUpdate =()=>{
        let bucketName = 'images'
        let file = imageCont
        let storageRef = storage.ref(file.name);
        // let storageRef = ref(storage, file.name);
        // let uploadTask = storageRef.put(file)
        // uploadTask.onload()

    }

    

    return (
        <div style={{textAlign:"center", margin: 0, padding:'0px', width:'995px'}}>

          <div className="d-flex row">
              <div className='col'>
                <input type="file" id="files" />
              </div>
              <div className='col'>
                    <img style={{maxWidth:'400px'}} id="output_image"/> 
                    {
                      imageCont? <button>Upload file</button>:<p>No file is selected</p>
                    }
              </div>
              <div  style={{display:"none"}} id="resized">

              </div>
          </div>
        </div>
    );
};

export default Insert;