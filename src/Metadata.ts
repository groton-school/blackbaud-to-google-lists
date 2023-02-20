import * as g from '@battis/gas-lighter';
import prefix from './Prefix';
import * as SKY from './SKY';

type Range = {
    row: number;
    column: number;
    numRows: number;
    numColumns: number;
    sheet: string;
};

const LIST = prefix('list');
const RANGE = prefix('range');
const LAST_UPDATED = prefix('lastUpdated');

function rangeToJSON(range: GoogleAppsScript.Spreadsheet.Range): Range {
    return {
        row: range.getRow(),
        column: range.getColumn(),
        numRows: range.getNumRows(),
        numColumns: range.getNumColumns(),
        sheet: range.getSheet().getName(),
    };
}

function rangeFromJSON(json: Range): GoogleAppsScript.Spreadsheet.Range {
    const sheet = SpreadsheetApp.getActive().getSheetByName(json.sheet);
    return sheet.getRange(json.row, json.column, json.numRows, json.numColumns);
}

function get(key: string, sheet: GoogleAppsScript.Spreadsheet.Sheet = null) {
    sheet = sheet || SpreadsheetApp.getActive().getActiveSheet();
    if (sheet) {
        return g.SpreadsheetApp.DeveloperMetadata.get(sheet, key);
    }
    return null;
}

export const getList = (
    sheet: GoogleAppsScript.Spreadsheet.Sheet = null
): SKY.School.Lists.Metadata => get(LIST, sheet);
export const getRange = (sheet: GoogleAppsScript.Spreadsheet.Sheet = null) =>
    rangeFromJSON(get(RANGE, sheet));
export const getLastUpdated = (
    sheet: GoogleAppsScript.Spreadsheet.Sheet = null
) => get(LAST_UPDATED, sheet);

function set(
    key: string,
    sheet: GoogleAppsScript.Spreadsheet.Sheet = null,
    value: any
) {
    sheet = sheet || SpreadsheetApp.getActive().getActiveSheet();
    if (sheet) {
        return g.SpreadsheetApp.DeveloperMetadata.set(sheet, key, value);
    }
    return false;
}

export const setList = (
    list: SKY.School.Lists.Metadata,
    sheet: GoogleAppsScript.Spreadsheet.Sheet = null
) => set(LIST, sheet, list);
export const setRange = (
    range: GoogleAppsScript.Spreadsheet.Range,
    sheet: GoogleAppsScript.Spreadsheet.Sheet = null
) => set(RANGE, sheet, rangeToJSON(range));
export const setLastUpdated = (
    lastUpdated: Date,
    sheet: GoogleAppsScript.Spreadsheet.Sheet
) => set(LAST_UPDATED, sheet, lastUpdated.toLocaleString());

function remove(key: string, sheet: GoogleAppsScript.Spreadsheet.Sheet = null) {
    sheet = sheet || SpreadsheetApp.getActive().getActiveSheet();
    if (sheet) {
        return g.SpreadsheetApp.DeveloperMetadata.remove(sheet, key);
    }
    return null;
}

export const removeList = remove.bind(null, LIST);
export const removeRange = remove.bind(null, RANGE);
export const removeLastUpdated = remove.bind(null, LAST_UPDATED);