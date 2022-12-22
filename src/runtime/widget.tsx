/** @jsx jsx */
import { React, AllWidgetProps, jsx } from "jimu-core";
import { JimuMapViewComponent, JimuMapView } from "jimu-arcgis";
import { Card, Button } from "jimu-ui";
import { ScreenOutlined } from "jimu-icons/outlined/brand/screen";
import Sketch from "esri/widgets/Sketch";
import GraphicsLayer from "esri/layers/GraphicsLayer";
import { TrashOutlined } from "jimu-icons/outlined/editor/trash";
import { InfoOutlined } from "jimu-icons/outlined/suggested/info";
import { Dropdown,DropdownButton,DropdownMenu,DropdownItem } from 'jimu-ui'
import "../../core.css";

export default class Widget extends React.PureComponent<
  AllWidgetProps<any>,
  any
> {
  // Initializing glaphic layer
  graphicsLayer = new GraphicsLayer({
    id: "export-map",
    listMode: "hide",
    visible: true,
  });

  // initial state values
  state = {
    jimuMapView: null,
    snap: null,
    saveImage: null,
    deleteL: null,
    btnfocus: false,
    exposeSketch: null,
  };

  activeViewChangeHandler = (jmv: JimuMapView) => {

  };

  render() {
    return (
      <div
        className="widget-starter jimu-widget"
        id="pwamly"
        style={{ display: "flex", flexDirection: "column", gap: "8%" }}
      >
        {this.props.hasOwnProperty("useMapWidgetIds") &&
          this.props.useMapWidgetIds &&
          this.props.useMapWidgetIds[0] && (
            <JimuMapViewComponent
              useMapWidgetId={this.props.useMapWidgetIds?.[0]}
              onActiveViewChange={this.activeViewChangeHandler}
            />
          )}
        <Card>
          <div style={{ display: "flex", flexDirection: "row", gap: "5%" }}>
            <div style={{ paddingTop: "7%", paddingLeft: "3%" }}>
              <InfoOutlined color="blue" size="s" />
            </div>
            <h5 style={{ width: "90%" }}>
              Selezionare lo Schema Gestore per avviare la ricerca
            </h5>
          </div>
        </Card>
       
        <div
  style={{
  }}
>
<div
  style={{
  }}
>
  <Dropdown autoWidth={true}>
    <DropdownButton>
      Seleziona un comune
    </DropdownButton>
    <DropdownMenu>
      <DropdownItem active>
        Action 1
      </DropdownItem>
      <DropdownItem>
        Action 2
      </DropdownItem>
      <DropdownItem>
        Action 3, this is a long long long long
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
</div>
</div>
      </div>
    );
  }
}
