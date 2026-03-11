/**
 * Alice Care Home Care Evaluation Form
 * Google Apps Script for Google Sheets Integration
 * 
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Open Google Sheets with ID: 1JAKJMXHRiAcjqPLYMNtc9QYGosHpbKctJe_wRD9w7U4
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code
 * 4. Click Deploy > New Deployment
 * 5. Select "Web app"
 * 6. Set "Execute as" to "Me"
 * 7. Set "Who has access" to "Anyone"
 * 8. Click Deploy and copy the URL
 * 9. Replace YOUR_DEPLOYMENT_ID in the HTML file with the deployment ID from the URL
 * 
 * IMPORTANT: After making changes, you must create a NEW deployment (not edit existing)
 * for changes to take effect.
 */

// Sheet configuration
const SHEET_NAME = 'Evaluations';

/**
 * Handle POST requests from the form
 * Supports both JSON body and form data
 */
function doPost(e) {
  try {
    let data;
    let action;
    let formData;
    
    // Check if data came as form parameters
    if (e.parameter && e.parameter.data) {
      formData = JSON.parse(e.parameter.data);
      action = e.parameter.action || 'save';
    } 
    // Check if data came as JSON body
    else if (e.postData && e.postData.contents) {
      const parsed = JSON.parse(e.postData.contents);
      action = parsed.action;
      formData = parsed.data;
    }
    
    if (action === 'save' && formData) {
      return saveFormData(formData);
    } else if (action === 'search') {
      return searchForms(e.parameter ? e.parameter.term : '');
    } else if (action === 'getAll') {
      return getAllForms();
    }
    
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Unknown action or missing data' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('doPost error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (supports JSONP for cross-origin)
 */
function doGet(e) {
  try {
    const action = e.parameter.action;
    const callback = e.parameter.callback; // JSONP callback
    let result;
    
    if (action === 'search') {
      result = searchFormsData(e.parameter.term);
    } else if (action === 'getAll') {
      result = getAllFormsData();
    } else if (action === 'get') {
      result = getFormByIdData(e.parameter.id);
    } else {
      result = { success: true, message: 'Alice Care Evaluation API' };
    }
    
    // If callback provided, return JSONP
    if (callback) {
      return ContentService.createTextOutput(callback + '(' + JSON.stringify(result) + ')')
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('doGet error: ' + error.toString());
    const errorResult = { success: false, error: error.toString() };
    const callback = e.parameter ? e.parameter.callback : null;
    
    if (callback) {
      return ContentService.createTextOutput(callback + '(' + JSON.stringify(errorResult) + ')')
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    return ContentService.createTextOutput(JSON.stringify(errorResult))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Get all forms data (internal function)
 */
function getAllFormsData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet || sheet.getLastRow() < 2) {
    return { success: true, results: [] };
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const results = [];
  
  for (let i = 1; i < data.length; i++) {
    const record = {};
    headers.forEach((header, index) => {
      record[header] = data[i][index];
    });
    if (record.recordId) { // Only include records with valid IDs
      results.push(record);
    }
  }
  
  return { success: true, results: results };
}

/**
 * Search forms data (internal function)
 */
function searchFormsData(searchTerm) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet || sheet.getLastRow() < 2) {
    return { success: true, results: [] };
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const results = [];
  
  const firstNameIndex = headers.indexOf('firstName');
  const lastNameIndex = headers.indexOf('lastName');
  
  const searchLower = (searchTerm || '').toLowerCase();
  
  for (let i = 1; i < data.length; i++) {
    const firstName = (data[i][firstNameIndex] || '').toString().toLowerCase();
    const lastName = (data[i][lastNameIndex] || '').toString().toLowerCase();
    const fullName = firstName + ' ' + lastName;
    
    if (fullName.includes(searchLower) || firstName.includes(searchLower) || lastName.includes(searchLower)) {
      const record = {};
      headers.forEach((header, index) => {
        record[header] = data[i][index];
      });
      results.push(record);
    }
  }
  
  return { success: true, results: results };
}

/**
 * Get form by ID (internal function)
 */
function getFormByIdData(recordId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    return { success: false, error: 'Sheet not found' };
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const recordIdIndex = headers.indexOf('recordId');
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][recordIdIndex] === recordId) {
      const record = {};
      headers.forEach((header, index) => {
        record[header] = data[i][index];
      });
      return { success: true, record: record };
    }
  }
  
  return { success: false, error: 'Record not found' };
}

/**
 * Save form data to the sheet
 */
function saveFormData(formData) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Add headers
      const headers = getHeaders();
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    
    const headers = getHeaders();
    const recordId = formData.recordId;
    
    // Check if record exists
    const data = sheet.getDataRange().getValues();
    const recordIdIndex = headers.indexOf('recordId');
    let rowToUpdate = -1;
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][recordIdIndex] === recordId) {
        rowToUpdate = i + 1;
        break;
      }
    }
    
    // Create row data
    const rowData = headers.map(header => {
      const value = formData[header];
      if (typeof value === 'boolean') return value ? 'Yes' : 'No';
      if (value === true || value === 'true') return 'Yes';
      if (value === false || value === 'false') return 'No';
      return value !== undefined && value !== null ? value : '';
    });
    
    if (rowToUpdate > 0) {
      // Update existing record
      sheet.getRange(rowToUpdate, 1, 1, rowData.length).setValues([rowData]);
      Logger.log('Updated record: ' + recordId);
    } else {
      // Append new record
      sheet.appendRow(rowData);
      Logger.log('Created new record: ' + recordId);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ 
      success: true, 
      recordId: recordId,
      message: rowToUpdate > 0 ? 'Record updated' : 'Record created'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('saveFormData error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Legacy function wrappers for backwards compatibility
 */
function searchForms(searchTerm) {
  const result = searchFormsData(searchTerm);
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function getAllForms() {
  const result = getAllFormsData();
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function getFormById(recordId) {
  const result = getFormByIdData(recordId);
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Get all form field headers
 */
function getHeaders() {
  return [
    'recordId',
    'submissionTimestamp',
    'evaluationDate',
    // Client Personal Information
    'firstName',
    'lastName',
    'gender',
    'dob',
    'age',
    'maritalStatus',
    'unitNumber',
    'streetAddress',
    'city',
    'state',
    'zipCode',
    'phone',
    'firstLanguage',
    'secondLanguage',
    'height',
    'weight',
    // Primary Contact
    'primaryFirstName',
    'primaryLastName',
    'primaryRelation',
    'primaryAddress',
    'primaryCellPhone',
    'primaryHomePhone',
    'primaryWorkPhone',
    'primaryEmail',
    // Secondary Contact
    'secondaryFirstName',
    'secondaryLastName',
    'secondaryRelation',
    'secondaryLocation',
    'secondaryPhone',
    'secondaryEmail',
    // Communication Details
    'commPhone',
    'commEmail',
    'commVideoChat',
    'hasLandline',
    'landlineNumber',
    'hasCellphone',
    'cellNumber',
    'ownsComputer',
    'canOperateComputer',
    'canAccessEmail',
    'clientEmail',
    'hasWifi',
    'wifiNetwork',
    'wifiPassword',
    // Living Situation
    'livingArrangement',
    'careLevel',
    // Personal Care
    'bathingAssist',
    'toiletingAssist',
    'dressingAssist',
    'hairAssist',
    'fingernailsAssist',
    'toenailsAssist',
    'shavingAssist',
    'creamAssist',
    'makeupAssist',
    'jewelryAssist',
    // Meals
    'cueEatAssist',
    'prepareMealsAssist',
    'prepareSnacksAssist',
    'drinkAssist',
    'hotDrinksAssist',
    'setTableAssist',
    'cleanMealAssist',
    'rotateFoodAssist',
    // Home Environment
    'walkingAssist',
    'stairsAssist',
    'chairsAssist',
    'bedAssist',
    'bathroomAccessAssist',
    'basementAssist',
    'doorAssist',
    'phoneAnswerAssist',
    'techAssist',
    // Activity/Movement
    'walkIndoorsAssist',
    'walkOutdoorsAssist',
    'exerciseAssist',
    // Housekeeping
    'surfaceCleanAssist',
    'bathroomCleanAssist',
    'laundryAssist',
    'sheetsAssist',
    'garbageAssist',
    'yardAssist',
    'organizingAssist',
    // Social Engagement
    'willingParticipateAssist',
    'physicalParticipateAssist',
    'mentalEngageAssist',
    // Hearing & Vision
    'hearingAidRight',
    'hearingAidLeft',
    'hearingAidBoth',
    'hearingAssistRight',
    'hearingAssistLeft',
    'hearingAssistBoth',
    'lensRight',
    'lensLeft',
    'lensBoth',
    'cataractRight',
    'cataractLeft',
    'cataractBoth',
    'visionAssistRight',
    'visionAssistLeft',
    'visionAssistBoth',
    // Reminders & Mobility
    'medicationReminders',
    'appointmentReminders',
    'mobilityNoAssist',
    'mobilityCane',
    'mobilityWalker',
    'mobilityWheelchair',
    'mobilityLift',
    // Home Environment Details
    'envConcerns',
    'envConcernsList',
    'hasPets',
    'petAssistance',
    'hasComfortPlace',
    'comfortPlaceDetails',
    'washroomAccess',
    'washroomAccessDetails',
    'bathAccess',
    'bathAccessDetails',
    'hasStairs',
    'floorLevels',
    'streetAccess',
    'streetAccessDetails',
    'homeEnvComments',
    // Fall Risk Assessment
    'hadFalls',
    'awareFallCause',
    'awareLimitations',
    'willingAskHelp',
    'recentFallInfo',
    'fallInterventions',
    'medsDizziness',
    'recentMedChanges',
    'depthPerception',
    'peripheralVision',
    'awareObjects',
    'observationLevel',
    'glassesReview',
    'hearConversations',
    'hasHearingAids',
    'seenAudiologist',
    'resistantHearingAids',
    'needsWalkAssist',
    'mobilityAidAppropriate',
    'mobilityAidWorking',
    'canOperateMobilityAid',
    'canStand10Sec',
    'needsExerciseEncouragement',
    'canDressUndress',
    'safeBedAccess',
    'stairsPresent',
    'stairsRailings',
    'hasRugs',
    'roomsWellLit',
    'easyBathroomAccess',
    'streetLevelAccessible',
    'entranceClear',
    'easilyAgitated',
    'paces',
    'nightNoShoes',
    'incontinence',
    'frequentBathroom',
    'safeToiletAccess',
    'properShoes',
    'easyShoes',
    'fallRiskLevel',
    'lowInterventions',
    'moderateInterventions',
    'highInterventions',
    // Verbal Communication
    'communicationAbility',
    'facialLikes',
    'facialDislikes',
    'activityLikes',
    'activityDislikes',
    'socialLikes',
    'socialDislikes',
    'otherLikes',
    'otherDislikes',
    // Chronic Physical Issues
    'pain1_desc',
    'pain1_onset',
    'pain1_expressed',
    'pain1_remedy',
    'pain2_desc',
    'pain2_onset',
    'pain2_expressed',
    'pain2_remedy',
    'pain3_desc',
    'pain3_onset',
    'pain3_expressed',
    'pain3_remedy',
    'pain4_desc',
    'pain4_onset',
    'pain4_expressed',
    'pain4_remedy',
    // Food & Drink
    'hasAllergies',
    'allergiesList',
    'hasRestrictions',
    'restrictionsList',
    'hasFoodLikes',
    'foodLikesList',
    'hasFoodDislikes',
    'foodDislikesList',
    'needsThickener',
    'thickenerType',
    'alcoholPermitted',
    'alcoholRestrictions',
    'hasDietitianRecs',
    'dietitianRecsList',
    'foodComments',
    // Emergency Information
    'medicalCard',
    'medicalInsurance',
    'medContactFirstName',
    'medContactFirstPhone',
    'medContactLastName',
    'medContactLastPhone',
    'gpName',
    'gpAddress',
    'neighborName',
    'neighborPhone',
    'allAllergies',
    'clientSmokes',
    'smokingFrequency',
    'hasDirectives',
    // Medical Status
    'diagDementia',
    'diagStroke',
    'diagDiabetes',
    'diagMacular',
    'diagCancer',
    'diagParkinsons',
    'diagMS',
    'diagHeart',
    'diagArthritis',
    'diagOther',
    'medicalDetails',
    // Medications
    'needsMedReminders',
    'med1_name',
    'med1_purpose',
    'med1_dose',
    'med1_route',
    'med1_admin',
    'med1_freq',
    'med2_name',
    'med2_purpose',
    'med2_dose',
    'med2_route',
    'med2_admin',
    'med2_freq',
    'med3_name',
    'med3_purpose',
    'med3_dose',
    'med3_route',
    'med3_admin',
    'med3_freq',
    'med4_name',
    'med4_purpose',
    'med4_dose',
    'med4_route',
    'med4_admin',
    'med4_freq',
    'med5_name',
    'med5_purpose',
    'med5_dose',
    'med5_route',
    'med5_admin',
    'med5_freq',
    // Vitamins
    'vit1_name',
    'vit1_purpose',
    'vit1_perday',
    'vit1_freq',
    'vit2_name',
    'vit2_purpose',
    'vit2_perday',
    'vit2_freq',
    'vit3_name',
    'vit3_purpose',
    'vit3_perday',
    'vit3_freq',
    // Activities
    'act1_type',
    'act1_days',
    'act1_times',
    'act1_location',
    'act2_type',
    'act2_days',
    'act2_times',
    'act2_location',
    'act3_type',
    'act3_days',
    'act3_times',
    'act3_location',
    // Transportation
    'needsCaregiverTransport',
    'useCompanyCar',
    'useOwnCar',
    'clientDrives',
    'hasDrivingRestrictions',
    'drivingRestrictions',
    'vehicleModel',
    'vehicleYear',
    'vehiclePlate',
    'insuranceCompany',
    'insuranceContact',
    'insurancePolicy',
    'insuranceExpiry',
    'caregiverCanDrive',
    'caregiverDriveDetails',
    'hasSpareKey',
    'spareKeyLocation',
    'caregiverParking',
    'parkingLocation',
    'parkingPermitDetails',
    'hasWheelchairPermit',
    'wheelchairPermitLocation',
    'hasRoadsideAssistance',
    'roadsideCompany',
    'transportNotes',
    // Services
    'serviceRespite',
    'serviceHourly',
    'serviceOnCall',
    'serviceOvernight',
    'serviceLiveOut24',
    'serviceLiveIn24',
    // Schedule
    'scheduleMon',
    'scheduleMonTime1',
    'scheduleMonTime2',
    'scheduleTue',
    'scheduleTueTime1',
    'scheduleTueTime2',
    'scheduleWed',
    'scheduleWedTime1',
    'scheduleWedTime2',
    'scheduleThu',
    'scheduleThuTime1',
    'scheduleThuTime2',
    'scheduleFri',
    'scheduleFriTime1',
    'scheduleFriTime2',
    'scheduleSat',
    'scheduleSatTime1',
    'scheduleSatTime2',
    'scheduleSun',
    'scheduleSunTime1',
    'scheduleSunTime2',
    // Care Plan Review
    'reviewFrequency',
    'nextReviewDate',
    'carePlanNotes'
  ];
}

/**
 * Test function to verify setup
 */
function testSetup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('Spreadsheet Name: ' + ss.getName());
  Logger.log('Spreadsheet ID: ' + ss.getId());
  Logger.log('Headers count: ' + getHeaders().length);
}