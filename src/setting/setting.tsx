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
import { IMConfig } from "../../config";
import conf from "../../config.json";
// import defaultI18nMessages from './translations/default'

export default class Setting extends React.PureComponent<
  AllWidgetSettingProps<IMConfig>,
  any
> {
  onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: useMapWidgetIds,
    });
  };
  onURLChange = (evt: React.FormEvent<HTMLInputElement>) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set("p1", evt.currentTarget.value),
    });
  };

  onlayerIdChange = (evt: React.FormEvent<HTMLInputElement>) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set("p2", evt.currentTarget.value),
    });
  };

  onqueryWhereChange = (evt: React.FormEvent<HTMLInputElement>) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set("p2", evt.currentTarget.value),
    });
  };

  onoutFieldsChange = (evt: React.FormEvent<HTMLInputElement>) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set("p2", evt.currentTarget.value),
    });
  };

  render() {
    return (
      <div className="widget-setting">
        <MapWidgetSelector
          useMapWidgetIds={this.props.useMapWidgetIds}
          onSelect={this.onMapWidgetSelected}
        />

        <SettingSection>
          <SettingRow label={"url"}>
            <input
              defaultValue={this.props.config.SearchSubdiramazioni.url}
              onChange={this.onURLChange}
            />
          </SettingRow>
          <SettingRow label={"layerId"}>
            {" "}
            <input
              defaultValue={this.props.config.SearchSubdiramazioni.layerId}
              onChange={this.onlayerIdChange}
            />
          </SettingRow>
          <SettingRow label={"queryWhere"}>
            <input
              defaultValue={this.props.config.SearchSubdiramazioni.queryWhere}
              onChange={this.onqueryWhereChange}
            />
          </SettingRow>
          <SettingRow label={"outFields"}>
            {" "}
            <input
              defaultValue={this.props.config.SearchSubdiramazioni.outFields[0]}
              onChange={this.onoutFieldsChange}
            />
          </SettingRow>
        </SettingSection>
      </div>
    );
  }
}
