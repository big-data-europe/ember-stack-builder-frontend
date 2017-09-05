import Ember from 'ember';

export default Ember.Service.extend({

    getHints(cursorPath, yamlObject) {
        const yaml = yamlObject;
        if (Object.keys(yaml).length === 0) {
            return [];
        }

        if (cursorPath) {
            // Cursor is on the first level, so hint with all the available services
            if (cursorPath.split('.').length === 3) {
                return Object.keys(yaml['services']);
            }

            // Cursor is on the image path, hint with all the present images
            if (cursorPath.indexOf("image") !== -1 && cursorPath !== undefined) {
                return this.getLinksOrImages(yamlObject, 'image').flatten().filter(el => el !== undefined);
            }
            // Cursor is on the links path, hint with all the present links
            else if (cursorPath.indexOf("links") !== -1 && cursorPath !== undefined) {
                return this.getLinksOrImages(yamlObject, 'links').flatten().filter(el => el !== undefined);
            }
            else {

            }
        }
    },
    getLinksOrImages(yaml, lookupKey) {
        return Object.keys(yaml).map(key => {
            if (typeof yaml[key] === "object" && yaml[key] !== null) {
                if (Array.isArray(yaml[key]) && key == lookupKey) {
                    return yaml[key];
                } 
                else {
                    return [].concat(this.getLinksOrImages(yaml[key], lookupKey));
                }
            }
            else {
                if (key === lookupKey) {
                    return yaml[key];
                }
            }
        });
    }
});
