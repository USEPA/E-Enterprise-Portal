let parseXml = null;

if (window.DOMParser) {
  parseXml = function (xmlStr) {
    return (new window.DOMParser()).parseFromString(xmlStr, 'text/xml');
  };
} else if (typeof window.ActiveXObject !== 'undefined' && new window.ActiveXObject('Microsoft.XMLDOM')) {
  parseXml = function (xmlStr) {
    const xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
    xmlDoc.async = 'false';
    xmlDoc.loadXML(xmlStr);
    return xmlDoc;
  };
} else {
  parseXml = function () { return null; };
}

export default parseXml;
