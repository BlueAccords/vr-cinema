//
// This is the file to parse JSON and connect using socket.io
//

// Update text on sCubes
function updateButtons(arr){
  dynamicTexture1.clear(); //clear
  dynamicTexture1.drawText(arr[0], 0, 7, 'white')
  dynamicTexture2.clear(); //clear
  dynamicTexture2.drawText(arr[1], 0, 7, 'white')
  dynamicTexture3.clear(); //clear
  dynamicTexture3.drawText(arr[2], 0, 7, 'white')
  dynamicTexture4.clear(); //clear
  dynamicTexture4.drawText(arr[3], 0, 7, 'white')
  dynamicTexture5.clear(); //clear
  dynamicTexture5.drawText(arr[4], 0, 7, 'white')
  dynamicTexture6.clear(); //clear
  dynamicTexture6.drawText(arr[5], 0, 7, 'white')
  dynamicTexture1.texture.needsUpdate  = true; // update text
}
