/** @jsx jsx */
import { MapWidgetSelector } from "jimu-ui/advanced/setting-components";
import { React, jsx, Immutable, FormattedMessage } from "jimu-core";
import { AllWidgetSettingProps } from "jimu-for-builder";
import { DataSourceTypes } from "jimu-arcgis";
import {
  SettingSection,
  SettingRow,
} from "jimu-ui/advanced/setting-components";
import { Select, Option } from "jimu-ui";
import { IMConfig } from "../../config";

// import defaultI18nMessages from './translations/default'

export default class Setting extends React.PureComponent<
  AllWidgetSettingProps<IMConfig>,
  any
> {
  state = {
    selectedLayer: Object.keys(this.props.config)[0],
    serverName:null,
    show:true
  };

    onServerNameChange = (evt: React.FormEvent<HTMLInputElement>) => {
      this.setState({serverName:evt.currentTarget.value});
    };

  onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: useMapWidgetIds,
    });
  };

  onURLChange = (evt: React.FormEvent<HTMLInputElement>) => {
    let server = this.state.selectedLayer || this.state.serverName;
    let con=this.props.config.set(
      server,
      {...this.props.config[server],"url":evt.currentTarget.value}
    );
    this.props.onSettingChange({
      id: this.props.id,
      config: con,
    });
  };

  onlayerIdChange = (evt: React.FormEvent<HTMLInputElement>) => {
    let server = this.state.selectedLayer || this.state.serverName;
    let con=this.props.config.set(
      server,
      {...this.props.config[server],"layerId":Number(evt.currentTarget.value)}
    );
    this.props.onSettingChange({
      id: this.props.id,
      config: con,
    });
  };

  onqueryWhereChange = (evt: React.FormEvent<HTMLInputElement>) => {
    let server = this.state.selectedLayer || this.state.serverName;
    let con=this.props.config.set(
      server,
      {...this.props.config[server],"queryWhere":evt.currentTarget.value}
    );
    this.props.onSettingChange({
      id: this.props.id,
      config: con,
    });

  };

  onoutFieldsChange = (evt: React.FormEvent<HTMLInputElement>) => {
    let server = this.state.selectedLayer || this.state.serverName;
    let inputvalue = evt.currentTarget.value
    let arr =['*'];
    if (inputvalue.indexOf(',') > -1) {
      arr = inputvalue.split(',');
     }else{
      arr=[inputvalue];
     }
    let con=this.props.config.set(
      server,
      {...this.props.config[server],"outFields":arr}
    );
    this.props.onSettingChange({
      id: this.props.id,
      config: con,
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
            this.setState({show:true});
          }}
          placeholder="Select Server"
        >
          {/* <Option header>Domestic</Option> */}
          {Object.keys(this.props.config).map((el, i) => (
            <Option id={i} value={el} >
              <div className="text-truncate" onMouseOver={()=>this.setState({show:false})} onClick={()=>this.setState({show:true})}>{el}</div>
            </Option>
          ))}
          <Option ><div className="text-truncate"  onClick={()=>{this.setState({ selectedLayer: null });this.setState({show:true})}}>Add New Server</div> </Option>
        </Select>
        {this.state.show&&<SettingSection>
          {this.state.selectedLayer==null&&<SettingRow label={"Server Name"}>
            
              <input
                defaultValue={this.state.selectedLayer?this.state.selectedLayer:''}
                onChange={this.onServerNameChange}
              />
            
          </SettingRow>}
          <SettingRow label={"url"}>
            
              <input
                defaultValue={this.props.config[this.state.selectedLayer]?.url || ''}
                onChange={this.onURLChange}
              />
          </SettingRow>
            <SettingRow label={"layerId"}>
              <input
                defaultValue={
                  this.state.show &&
                  this.props.config[this.state.selectedLayer]?.layerId || ''
                }
                onChange={this.onlayerIdChange}
              />
            </SettingRow>
          
          <SettingRow label={"queryWhere"}>
            {this.state.show && (
              <input
                defaultValue={
                  this.props.config[this.state.selectedLayer]?.queryWhere || ''
                }
                onChange={this.onqueryWhereChange}
              />
            )}
          </SettingRow>
          <SettingRow label={"outFields"}>
            {this.state.show && (
              <input
                defaultValue={
                  this.props.config[this.state.selectedLayer]?.outFields?this.props.config[this.state.selectedLayer]?.outFields[0]  : ''
                }
                onChange={this.onoutFieldsChange}
              />
            )}
          </SettingRow>
        </SettingSection>}
      </div>
    );
  }
}
