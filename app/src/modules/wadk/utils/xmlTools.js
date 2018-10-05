/**
 * Does some browser compatiblity issues and passes the correct parser
 *
 * @type {null}
 */
let parseXml = null;

if (window.DOMParser) {
  parseXml = xmlStr => (new window.DOMParser()).parseFromString(xmlStr, 'text/xml');
} else if (typeof window.ActiveXObject !== 'undefined' && new window.ActiveXObject('Microsoft.XMLDOM')) {
  parseXml = (xmlStr) => {
    const xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
    xmlDoc.async = 'false';
    xmlDoc.loadXML(xmlStr);
    return xmlDoc;
  };
} else {
  parseXml = () => null;
}

export default parseXml;
