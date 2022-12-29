import Query from "@arcgis/core/rest/support/Query";
import * as query from "@arcgis/core/rest/query";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
const axios = require('axios');

class Helper {

    isEmpty = (value) => {
        if (value == "" || value == null) {
            return true;
        }
        return false;
    }

    queryLayers = async (configobject) => {
        let querryObject = new Query();
        querryObject.outFields = configobject.outFields;
        querryObject.returnGeometry = true;
        querryObject.where = configobject.queryWhere;
        try {
            const queryresult = await query.executeQueryJSON(configobject.url + `/${configobject.layerId}`, querryObject);
            const layerInfo = await axios.get(`${configobject.url + '/' + configobject.layerId}?f=pjson`);
            return { ...layerInfo.data, queryresult };
        } catch (error) {
            return null;
        }

    }
}

export default new Helper();
