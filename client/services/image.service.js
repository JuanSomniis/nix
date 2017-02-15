'use strict'
const angular = require('angular')
/*@ngInject*/
export function imageService($bi,$q) {

  function save(imgArray, id_documentacion) {
    imgArray.forEach(img => {
      let reader = new FileReader(),
        binary,
        base64;
      reader.addEventListener('loadend', () => {
        binary = reader.result;
        base64 = btoa(binary);
        //img = 'data:image/jpeg;base64,'+base64;
        $bi.imagen().insert([base64, id_documentacion]).then(() => console.log('todo bien ._.'));
      }, false);
      reader.readAsBinaryString(img)
    });
    //return true;
  }

  function load(id_documentacion) {

    $bi.imagen().all({fk_id_documentacion: id_documentacion})
      .then(images => {
        console.log(images);
        if(images.data.length >= 1)
          images.data.forEach(img => img = `data:image/jpeg;base64,${img}`);
        return images;
      });
  }
  this.load = load;
  this.save = save;
}

export default angular.module('nixApp.image', []).service('$imagenix', imageService).name
