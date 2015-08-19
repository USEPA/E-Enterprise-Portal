$.initFacilityManagementWidget({
    autoScroll : false,
    repositionFancyBoxes : true,
    widgetDisplayType : "Edit My Facilities",
    RetrieveWidgetData : 'https://dev.epacdx.net/FrsPhase2/FrsFacilitiesScripts/RetrieveWidgetData',
    frsGetManagedFacilities : 'https://dev.epacdx.net/FrsPhase2/FrsFacilitiesScripts/GetFacilitiesByUserRole',
    frsGetEditingFacility : 'https://dev.epacdx.net/FrsPhase2/FrsFacilitiesScripts/GetFrsFacility',
    frsSearchUrl: 'https://dev.epacdx.net/FrsPhase2/FrsFacilitiesScripts/SearchResults',
    frsGetCountiesByState : 'https://dev.epacdx.net/FrsPhase2/FrsFacilitiesScripts/GetCountiesByState',
    frsRemoveUserRoleFacility : 'https://dev.epacdx.net/FrsPhase2/FrsFacilitiesScripts/RemoveUserRoleFacility',
    frsQueueUrl: 'https://dev.epacdx.net/FrsPhase2/FrsFacilitiesScripts/QueuedFacilites',
    frsUpdateUrl: 'https://dev.epacdx.net/FrsPhase2/FrsFacilitiesScripts/SaveFrsFacility',
    frsPreProcessFacility: 'https://dev.epacdx.net/FrsPhase2/FrsFacilitiesScripts/PreProcessFacility',
    frsValidateCoordinatesForAddress: 'https://dev.epacdx.net/FrsPhase2/FrsFacilitiesScripts/ValidateCoordinatesForAddress',
    frsAddFacilities : 'https://dev.epacdx.net/FrsPhase2/FrsFacilitiesScripts/AddFacilityToRole',
    ImagesFolderPath: "https://dev.epacdx.net/FrsPhase2/content/v3/FRS%20Widget/images", //static
    userRoleId: 80172,
    isRegistration: false, //static
    loadFromSession: false, //static
    NASSToken : "Mary Cheat Token - FIX ASAP!!!!!!",
    NAASip : "65.248.159.78"
});