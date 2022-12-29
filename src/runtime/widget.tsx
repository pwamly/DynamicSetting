/** @jsx jsx */
import { React, AllWidgetProps, jsx } from "jimu-core";
import { JimuMapViewComponent, JimuMapView } from "jimu-arcgis";
import { Card } from "jimu-ui";
import { InfoOutlined } from "jimu-icons/outlined/suggested/info";
import { Select, Option } from "jimu-ui";
import helper from "../setting/helper";
import "../../core.css";
import { isArray } from "lodash-es";

export default class Widget extends React.PureComponent<
  AllWidgetProps<any>,
  any
> {
  constructor(props) {
    super(props);

    Object.values(this.props.config).reduce(async (acc, cvalue) => {
      let Layerdata = await helper.queryLayers(cvalue);
      if (Layerdata) {
        acc.push({ [Layerdata.name]: Layerdata });
      }
      this.setState({ layerList: acc });
      return acc;
    }, []);
  }
  state = { layerList: [] };

  activeViewChangeHandler = (jmv: JimuMapView) => {};

  render() {
    return (
      <div
        className="widget-starter jimu-widget"
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
        <div style={{}}>
          <div style={{}}>
            <Select onChange={(e) => {}} placeholder="Seleziona un comune">
              {/* <Option header></Option> */}
              {isArray(this.state.layerList) &&
                this.state.layerList.map((el, i) => (
                  <Option id={i} value={el}>
                    <div className="text-truncate">
                      {Object.keys(el)[0] +
                        " - " +
                        Object.values(el)[0]["queryresult"].features.length}
                    </div>
                  </Option>
                ))}
            </Select>
          </div>
        </div>
      </div>
    );
  }
}
