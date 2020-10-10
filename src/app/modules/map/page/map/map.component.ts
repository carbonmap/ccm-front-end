import * as $ from "jquery";
import * as L from 'leaflet';

import { AfterViewInit, Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
<<<<<<< HEAD
=======
import { DataModule } from 'src/app/data/data.module'
>>>>>>> half merge
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [HttpClientModule]
})
export class MapComponent implements AfterViewInit {
  private dataRoot
  private initialLat
  private initialLon
  private initialZoom
  private mapDiv
  private map
  private lock
  private layerDict
  public startList
  public startLayer
  private configUrl
  private childList
  private startEntity
<<<<<<< HEAD
  private geojson
  private jsondata
=======
>>>>>>> half merge

  constructor(
    private location: Location,
    private http: HttpClient,
    private route: ActivatedRoute
  ){ }

  ngAfterViewInit(): void {
    this.initialize()
  }

  private initialize(): void {
    if (typeof (L) == 'undefined') {
      console.log('Please include Leaflet before initializing CarbonMap');
      return;
    }

    //this.dataRoot = 'https://data.cambridgecarbonmap.org';
    //this.dataRoot = 'http://localhost:8080/'
    this.dataRoot = "http://127.0.0.1:5000/json"
    this.initialLat = 52.205;
    this.initialLon = 0.1218;
    this.initialZoom = 12.5;
    this.mapDiv = 'map';
    this.jsondata = {}

    this.map = L.map(this.mapDiv).setView([this.initialLat, this.initialLon], this.initialZoom);
    const attribution = '&copy; <a href="https://www.openstreetmap/copyright">OpenStreeMap</a> contributors';

    const tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });


    tiles.addTo(this.map);
    this.lock = false;

    var that = this;

    function changeDisplay(layer, mode) {
      if (mode == 0) {
        // Main object, seen on surface, not hovered over
        layer.setStyle({ "fillColor": "#0000ff", "fillOpacity": 0.35, "opacity": 0 })
        layer.bringToFront();
      }
      if (mode == 1) {
        // Parent object, being hover over ///// next iteration: have children show if this mode is stayed on for long enough
        layer.setStyle({ "fillColor": "#ff0000", "fillOpacity": 0.3, "opacity": 0 })
      }
      if (mode == 2) {
        // Parent object, has been selected, so now faint to show children
        layer.setStyle({ "fillColor": "#0000ff", "color": "#cc0000", "fillOpacity": 0, "opacity": 0.3 })
      }
      if (mode == 3) {
        // Child object, parent not selected so is invisible
        layer.setStyle({ "fillColor": "#0000ff", "fillOpacity": 0, "opacity": 0 })
      }
      if (mode == 4) {
        // Child object, parent has been selected so is now visible, not hovered over
        layer.setStyle({ "fillColor": "#669900", "fillOpacity": 0.5, "opacity": 0 })
        layer.bringToFront();
      }
      if (mode == 5) {
        // Child object, being hovered over
        layer.setStyle({ "fillColor": "#ff0000", "fillOpacity": 0.3, "opacity": 0 })
      }
    }

    this.startEntity = this.route.snapshot.queryParamMap.get('id')
    console.log(this.startEntity)

    this.layerDict = {};

    this.map.on('click', function (e) {
      that.lock = !that.lock
    });

    // Remove if not needed
<<<<<<< HEAD
    this.startList = findData("index")
    //(async () => {
    //  this.http.post("http://127.0.0.1:5000/mapstart", null)
    //    .subscribe(result => {
    //      console.log(result)
    //      this.startList = result;
    //      console.log(this.startList)
    //    });
//
    //  await delay(200);
    //  console.log(this.startList)
//
    //  this.http.post("http://127.0.0.1:5000/mapchild", null)
    //    .subscribe(result => {
    //      console.log(result)
    //      this.childList = result;
    //      console.log(this.childList)
    //    });
//
    //  await delay(200);
    //  console.log(this.childList)
=======
    (async () => {
      this.http.post("http://127.0.0.1:5000/mapstart", null)
        .subscribe(result => {
          console.log(result)
          this.startList = result;
          console.log(this.startList)
        });

      await delay(200);
      console.log(this.startList)

      this.http.post("http://127.0.0.1:5000/mapchild", null)
        .subscribe(result => {
          console.log(result)
          this.childList = result;
          console.log(this.childList)
        });

      await delay(200);
      console.log(this.childList)
>>>>>>> half merge

      this.childList = ["uk.ac.cam.st-edmunds.white-cottage", "uk.ac.cam.st-edmunds.norfolk-building", "uk.ac.cam.st-edmunds.richard-laws", "uk.ac.cam.kings.kingsparade", "uk.ac.cam.kings.spalding", "uk.ac.cam.kings.kingsfield", "uk.ac.cam.kings.garden", "uk.ac.cam.kings.grasshopper", "uk.ac.cam.kings.cranmer", "uk.ac.cam.kings.st-edwards", "uk.ac.cam.kings.tcr", "uk.ac.cam.kings.market", "uk.ac.cam.kings.plodge", "uk.ac.cam.kings.bodleys", "uk.ac.cam.kings.old-site", "uk.ac.cam.kings.provosts-lodge", "uk.ac.cam.kings.webbs", "uk.ac.cam.kings.keynes", "uk.ac.cam.kings.a-staircase", "uk.ac.cam.kings.wilkins"]

      async function putOnMap(objjson) {
<<<<<<< HEAD
        await delay(1000);
        var geo
        console.log(objjson['__zone_symbol__value'])
        let addr = objjson['__zone_symbol__value'].id
        console.log(addr)
=======


        await delay(1000);
        var geo
        let addr = objjson['__zone_symbol__value'].id
        var mapFeature = {
          id: addr,
          marker: null
        }
>>>>>>> half merge

        $.ajaxSetup({
          'async': false,
        });
        //$.getJSON(that.dataRoot + "/geojson/" + addr + ".geojson", function (geojson) {
          that.http.post("http://127.0.0.1:5000/data", {id: addr})
<<<<<<< HEAD
            .subscribe(result => {
              console.log(result)
              geo = result;
              console.log(geo)
            });
          
          await delay(200);
          console.log(geo)

          L.geoJSON(geo,
=======
          .subscribe(result => {
            console.log(result)
            geo = result;
            console.log(geo)
          });
        
        await delay(200);
        console.log(geo)
          
          mapFeature.marker = L.geoJSON(geo,

>>>>>>> half merge
            {
              _onEachFeature: function (feature, layer) {

<<<<<<< HEAD
                console.log(feature)
                objjson['__zone_symbol__value'].loadedSubentities = []

                layer._leaflet_id = mapFeature.id
=======
                console.log(feature);
                objjson['__zone_symbol__value'].loadedSubentities = [];
>>>>>>> half merge

                var popup = new L.Popup({
                  autoPan: false,
                  keepInView: true,
                }).setContent(feature.properties.name);
                layer.bindPopup(popup, { maxWidth: 800 });

                var startmode = 0;

<<<<<<< HEAD
                if (that.startList.indexOf(objjson['__zone_symbol__value'].id) < 0) { startmode = 4 }
                changeDisplay(layer, startmode)

                // Change to objects
                that.layerDict[objjson['__zone_symbol__value'].id] = [layer, startmode];
                console.log(addr)
                
=======
                if (that.startList.indexOf(objjson.id) < 0) { startmode = 4; }
                changeDisplay(layer, startmode);

                // Change to objects
                that.layerDict[objjson.id] = [layer, startmode];
>>>>>>> half merge
                that.map.closePopup();

                layer.on('click', function (e) {


                  // Soft url change (does not reload page)
                  that.location.replaceState("/map/" + objjson['__zone_symbol__value'].id);

                  if (!("link" in objjson['__zone_symbol__value'])) {
                    objjson['__zone_symbol__value'].link = makeLink(objjson['__zone_symbol__value']);

                    if (objjson['__zone_symbol__value'].subentities.length > 0) {
                      objjson['__zone_symbol__value'].subentities.forEach(j => {
<<<<<<< HEAD
                        objjson['__zone_symbol__value'].loadedSubentities.push(findData(j))
                        //console.log(objjson.loadedSubentities)
                      })

                      objjson['__zone_symbol__value'].loadedSubentities.forEach(j => {
                        console.log("about to put on map:" + j.id)
                        putOnMap(j)
                      })

                  // Is a parent, not yet selected, so when it is clicked, it's popup stays the same, but we get it's children turn light green
                  if (that.layerDict[addr][1] == 1) {
                    that.layerDict[addr][1] = 2;
                    changeDisplay(that.layerDict[addr][0], that.layerDict[addr][1]);


                    if (objjson['__zone_symbol__value'].subentities.length > 0) {
                      objjson['__zone_symbol__value'].subentities.forEach(j => {
                        that.layerDict[j][1] = 4;
                        changeDisplay(that.layerDict[j][0], that.layerDict[j][1]);

                      })

                    }

                  // Is a parent that has been selected, now that it is is selected again it will hide all children and go back to normal
                  else if (that.layerDict[addr][1] == 2) {
                    that.layerDict[addr][1] = 1;
                    changeDisplay(layer, that.layerDict[addr][1]);

                    if (objjson['__zone_symbol__value'].subentities.length > 0) {
                      //for (var j in that.childDict[addr]) {
                      objjson['__zone_symbol__value'].loadedSubentities.forEach(j => {
                        console.log("About to hide: " + j.id)
                        console.log(that.layerDict)
                        that.layerDict[j.id][1] = 3;
                        changeDisplay(that.layerDict[j.id][0], that.layerDict[j.id][1]);

                      })
                    }
                  }

                  that.lock = !that.lock;

                  if (that.lock) {
                    that.map.closePopup();
                    popup.setContent(objjson['__zone_symbol__value'].link);
                    popup.setLatLng(e.latlng).openOn(that.map);
                    // Soft url change (does not reload page)
                    that.location.replaceState("/map?id=" + objjson.id);
                  }

                  else {
                    //popup.setContent(feature.properties.name);
                    popup.setContent(objjson['__zone_symbol__value'].name);
=======
                        objjson['__zone_symbol__value'].loadedSubentities.push(findData(j));
                        //console.log(objjson.loadedSubentities)
                      });
                      objjson['__zone_symbol__value'].loadedSubentities.forEach(j => {
                        console.log("about to put on map:" + j.id);
                        putOnMap(j);
                      });

                      // Is a parent, not yet selected, so when it is clicked, it's popup stays the same, but we get it's children turn light green
                      if (that.layerDict[addr][1] == 1) {
                        that.layerDict[addr][1] = 2;
                        changeDisplay(that.layerDict[addr][0], that.layerDict[addr][1]);

                        if (objjson['__zone_symbol__value'].subentities.length > 0) {
                          objjson['__zone_symbol__value'].subentities.forEach(j => {
                            that.layerDict[j][1] = 4;
                            changeDisplay(that.layerDict[j][0], that.layerDict[j][1]);

                          });
                        }



                        // Is a parent that has been selected, now that it is is selected again it will hide all children and go back to normal
                        else if (that.layerDict[addr][1] == 2) {
                          that.layerDict[addr][1] = 1;
                          changeDisplay(layer, that.layerDict[addr][1]);

                          if (objjson['__zone_symbol__value'].subentities.length > 0) {
                            //for (var j in that.childDict[addr]) {
                            objjson['__zone_symbol__value'].loadedSubentities.forEach(j => {
                              console.log("About to hide: " + j.id);
                              console.log(that.layerDict);
                              that.layerDict[j.id][1] = 3;
                              changeDisplay(that.layerDict[j.id][0], that.layerDict[j.id][1]);

                            });
                          }
                        }

                        that.lock = !that.lock;

                        if (that.lock) {
                          that.map.closePopup();
                          popup.setContent(objjson['__zone_symbol__value'].link);
                          popup.setLatLng(e.latlng).openOn(that.map);
                        }

                        else {
                          //popup.setContent(feature.properties.name);
                          popup.setContent(objjson['__zone_symbol__value'].name);
                        }
                      }
                    }
>>>>>>> half merge
                  }
                });

                layer.on('mouseover', function (e) {
                  // Is a parent object, just getting hovered over
                  if (that.layerDict[addr][1] == 0) {
                    that.layerDict[addr][1] = 1;
                    changeDisplay(layer, that.layerDict[addr][1]);
                  }

                  // Is a child, has just been revealed
                  else if (that.layerDict[addr][1] == 4 && !that.lock) {
                    that.layerDict[addr][1] = 5;
                    changeDisplay(layer, that.layerDict[addr][1]);
                  }

                  if (!that.lock && that.layerDict[addr][1] != 3 && that.layerDict[addr][1] != 2) {

                    popup.setLatLng(e.latlng).openOn(that.map);
                    //popup.setContent(feature.properties.name);
                    popup.setContent(objjson['__zone_symbol__value'].name);
                  };


                });

                layer.on('mouseout', function (e) {
                  // Is a parent object, was just hovered over but not clicked
                  if (that.layerDict[addr][1] == 1) {
                    that.layerDict[addr][1] = 0;
                    changeDisplay(that.layerDict[addr][0], that.layerDict[addr][1]);
                  }

                  // Is a child, has been revealed but not clicked, so is now going back to 
                  else if (that.layerDict[addr][1] == 5) {
                    that.layerDict[addr][1] = 4;
                    changeDisplay(layer, that.layerDict[addr][1]);
                  }

                  if (!that.lock) {
                    that.map.closePopup();
                  }
                });

                layer.on('mousemove', function (e) {

                  if (!that.lock && that.layerDict[addr][1] != 3 && that.layerDict[addr][1] != 2) {
                    that.map.closePopup();
                    popup.setLatLng(e.latlng).openOn(that.map);
                  }
                });

                popup.setLatLng([0, 0]).openOn(that.map);
                that.map.closePopup();
<<<<<<< HEAD
              }
=======
              },
              get onEachFeature() {
                return this._onEachFeature;
              },
              set onEachFeature(value) {
                this._onEachFeature = value;
              },
>>>>>>> half merge
            })
            
          mapFeature.marker.addTo(that.map);
          
<<<<<<< HEAD
        });

        return mapFeature

      }
=======
        

        return mapFeature
      };
>>>>>>> half merge


      Object.keys(that.startList).forEach(function (addr, index) {
        var mapFeature = putOnMap(findData(that.startList[index]))
<<<<<<< HEAD
        if (that.startEntity == mapFeature.id){
          that.startLayer = mapFeature.marker
        }
=======
        //  if (that.startEntity == mapFeature.id){
        //    that.startLayer = mapFeature.marker
        //  }
>>>>>>> half merge
      });
      
      var feature = that.startLayer.getLayer(that.startEntity)
      console.log(feature.getLatLng)

<<<<<<< HEAD
      async function findData(id) {
        /*
        var obj = null
        $.ajax({
          'async': false,
          'global': false,
          'url': that.dataRoot, //+ `reporting_entities/` + id + `.json`,
          'dataType': "json",
          'success': function (data) {
            obj = data;
          },
          "error": function (jqXHR, exception) {
            console.log(jqXHR.responseText, id)
          }
        });
        return obj
        */
       var jsondata
       that.http.post("http://127.0.0.1:5000/json", {ent_id: id})
       .subscribe(result => {
         console.log(result)
         //return result
         //this.jsondata = {}
         jsondata = result;
         //console.log(this.geojson)
         //return this.geojson
       });
       await delay(100)
       return jsondata
       //return this.geojson
=======

      var feature = that.startLayer.getLayer(that.startEntity)
      var coords = feature.feature.geometry.coordinates[0][0]
      if (coords.length == 2){
        coords = coords.reverse()
      } else {
        coords = coords[0].reverse() // Get first right now, change to centroid, or just change to back end
>>>>>>> half merge
      }
      that.map.setView(coords, 16)
      console.log(coords)


      async function findData(id) {
        var jsondata
        that.http.post("http://127.0.0.1:5000/json", {ent_id: id})
        .subscribe(result => {
          console.log(result)
          //return result
          //this.jsondata = {}
          jsondata = result;
          //console.log(this.geojson)
          //return this.geojson
        });
        await delay(100)
        return jsondata
        //return this.geojson
       }

      function resolveAfter2Seconds(x) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(x);
          }, 2000);
        });
      }

      function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      function makeLink(objjson) {
        //
        var div = document.createElement("div");

        that.http.post("http://127.0.0.1:5000/entity_data", {"id": objjson.id})
          .subscribe(result => {
            console.log(result)
            // data = result;
            div.innerHTML = "Will request data from " + objjson.id + " " + result
          },
          err=>{}
        );


        return div
      }
    }
<<<<<<< HEAD
    // )
    //();
  //}
}
=======
    )
    ();
  }
}
>>>>>>> half merge
