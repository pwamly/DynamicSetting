/** @jsx jsx */
import { MapWidgetSelector } from "jimu-ui/advanced/setting-components";
import { React, jsx, Immutable, FormattedMessage } from "jimu-core";
import { AllWidgetSettingProps } from "jimu-for-builder";
import { DataSourceTypes } from "jimu-arcgis";
import {
  SettingSection,
  SettingRow,
} from "jimu-ui/advanced/setting-components";
import { DataSourceSelector } from "jimu-ui/advanced/data-source-selector";
import { Dropdown, DropdownButton, DropdownMenu, DropdownItem } from "jimu-ui";
import { Select, Option } from "jimu-ui";

import { IMConfig } from "../../config";
import SelectState from "dist/widgets/arcgis/arcgis-map/src/runtime/tools/selectstate";

// import defaultI18nMessages from './translations/default'

export default class Setting extends React.PureComponent<
  AllWidgetSettingProps<IMConfig>,
  any
> {
  state = {
    selectedLayer: "SearchSubdiramazioni",
  };

  onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: useMapWidgetIds,
    });
  };

  onURLChange = (evt: React.FormEvent<HTMLInputElement>) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config[this.state.selectedLayer].set(
        "url",
        evt.currentTarget.value
      ),
    });
  };

  onlayerIdChange = (evt: React.FormEvent<HTMLInputElement>) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config[this.state.selectedLayer].set(
        "layerId",
        evt.currentTarget.value
      ),
    });
  };

  onqueryWhereChange = (evt: React.FormEvent<HTMLInputElement>) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config[this.state.selectedLayer].set(
        "queryWhere",
        evt.currentTarget.value
      ),
    });
  };

  onoutFieldsChange = (evt: React.FormEvent<HTMLInputElement>) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config[this.state.selectedLayer].set(
        "outFields",
        evt.currentTarget.value
      ),
    });
  };

  render() {
    return (
      <div className="widget-setting">
        <MapWidgetSelector
          useMapWidgetIds={this.props.useMapWidgetIds}
          onSelect={this.onMapWidgetSelected}
        />
        <Select
          onChange={(e) => {
            this.setState({ selectedLayer: e.target.value });
            console.log("", this.state.selectedLayer);
          }}
          toggle={(e) => {}}
          placeholder="Select a destination..."
        >
          <Option header>Domestic</Option>
          {Object.keys(this.props.config).map((el, i) => (
            <Option id={i} value={el}>
              <div className="text-truncate">{el}</div>
            </Option>
          ))}
        </Select>
        <SettingSection>
          <SettingRow label={"url"}>
            {this.state.selectedLayer && (
              <input
                defaultValue={this.props.config[this.state.selectedLayer].url}
                onChange={this.onURLChange}
              />
            )}
          </SettingRow>
          {this.state.selectedLayer && (
            <SettingRow label={"layerId"}>
              <input
                defaultValue={
                  this.state.selectedLayer &&
                  this.props.config[this.state.selectedLayer].layerId
                }
                onChange={this.onlayerIdChange}
              />
            </SettingRow>
          )}
          <SettingRow label={"queryWhere"}>
            {this.state.selectedLayer && (
              <input
                defaultValue={
                  this.props.config[this.state.selectedLayer].queryWhere
                }
                onChange={this.onqueryWhereChange}
              />
            )}
          </SettingRow>
          <SettingRow label={"outFields"}>
            {" "}
            {this.state.selectedLayer && (
              <input
                defaultValue={
                  this.props.config[this.state.selectedLayer].outFields[0]
                }
                onChange={this.onoutFieldsChange}
              />
            )}
          </SettingRow>
        </SettingSection>
      </div>
    );
  }
}
