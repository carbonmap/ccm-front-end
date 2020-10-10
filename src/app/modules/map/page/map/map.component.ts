import * as $ from "jquery";
import * as L from 'leaflet';

import { AfterViewInit, Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { DataModule } from 'src/app/data/data.module'
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
    this.dataRoot = 'http://localhost:8080/'
    this.initialLat = 52.205;
    this.initialLon = 0.1218;
    this.initialZoom = 12.5;
    this.mapDiv = 'map';

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
    this.startList = findData("index")
    // async () => {
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

      this.childList = ["uk.ac.cam.st-edmunds.white-cottage", "uk.ac.cam.st-edmunds.norfolk-building", "uk.ac.cam.st-edmunds.richard-laws", "uk.ac.cam.kings.kingsparade", "uk.ac.cam.kings.spalding", "uk.ac.cam.kings.kingsfield", "uk.ac.cam.kings.garden", "uk.ac.cam.kings.grasshopper", "uk.ac.cam.kings.cranmer", "uk.ac.cam.kings.st-edwards", "uk.ac.cam.kings.tcr", "uk.ac.cam.kings.market", "uk.ac.cam.kings.plodge", "uk.ac.cam.kings.bodleys", "uk.ac.cam.kings.old-site", "uk.ac.cam.kings.provosts-lodge", "uk.ac.cam.kings.webbs", "uk.ac.cam.kings.keynes", "uk.ac.cam.kings.a-staircase", "uk.ac.cam.kings.wilkins"]

      function putOnMap(objjson) {

        let addr = objjson.id
        var mapFeature = {
          id: addr,
          marker: null
        }
        
        $.ajaxSetup({
          'async': false,
        });
        $.getJSON(that.dataRoot + "/geojson/" + addr + ".geojson", function (geojson) {
          
          mapFeature.marker = L.geoJSON(geojson,

            {
              onEachFeature: function (feature, layer) {

                objjson.loadedSubentities = []

                layer._leaflet_id = mapFeature.id

                var popup = new L.Popup({
                  autoPan: false,
                  keepInView: true,
                }).setContent(feature.properties.name);
                layer.bindPopup(popup, { maxWidth: 800 });

                var startmode = 0

                if (that.startList.indexOf(objjson.id) < 0) { startmode = 4 }
                changeDisplay(layer, startmode)

                // Change to objects
                that.layerDict[objjson.id] = [layer, startmode];
                that.map.closePopup();

                layer.on('click', function (e) {

                  if (!("link" in objjson)) {
                    objjson.link = makeLink(objjson);

                    if (objjson.subentities.length > 0) {
                      objjson.subentities.forEach(j => {
                        objjson.loadedSubentities.push(findData(j))
                        //console.log(objjson.loadedSubentities)
                      })
                      objjson.loadedSubentities.forEach(j => {
                        putOnMap(j)
                      })
                      }
                    }

                  // Is a parent that has been selected, now that it is is selected again it will hide all children and go back to normal
                  else if (that.layerDict[addr][1] == 2) {
                    that.layerDict[addr][1] = 1;
                    changeDisplay(layer, that.layerDict[addr][1]);

                    if (objjson.subentities.length > 0) {
                      //for (var j in that.childDict[addr]) {
                      objjson.loadedSubentities.forEach(j => {
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
                    popup.setContent(objjson.link);
                    popup.setLatLng(e.latlng).openOn(that.map);
                    // Soft url change (does not reload page)
                    that.location.replaceState("/map?id=" + objjson.id);
                  }

                  else {
                    popup.setContent(
                      // Put into own submodule
                      // new DataModule
                      objjson.link
                    );
                    // popup.setContent(objjson.name);
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
                    popup.setContent(objjson.name);
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
              }
            })
            
          mapFeature.marker.addTo(that.map);
          
        });

        return mapFeature
      }


      Object.keys(that.startList).forEach(function (addr, index) {
        var mapFeature = putOnMap(findData(that.startList[index]))
        if (that.startEntity == mapFeature.id){
          that.startLayer = mapFeature.marker
        }
      });
      
      var feature = that.startLayer.getLayer(that.startEntity)
      var coords = feature.feature.geometry.coordinates[0][0]
      if (coords.length == 2){
        coords = coords.reverse()
      } else {
        coords = coords[0].reverse() // Get first right now, change to centroid, or just change to back end
      }
      that.map.setView(coords, 16)
      console.log(coords)


      function findData(id) {
        var obj = null
        $.ajax({
          'async': false,
          'global': false,
          'url': that.dataRoot + `reporting_entities/` + id + `.json`,
          'dataType': "json",
          'success': function (data) {
            obj = data;
          },
          "error": function (jqXHR, exception) {
            console.log(jqXHR.responseText, id)
          }
        });
        return obj
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
    // )
    //();
  // }
}
