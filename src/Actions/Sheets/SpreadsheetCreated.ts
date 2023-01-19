import { Terse } from '@battis/google-apps-script-helpers';
import State from '../../State';
import OpenSpreadsheet from './OpenSpreadsheet';

export function spreadsheetCreatedCard() {
    return Terse.CardService.newCard({
        header: State.getSpreadsheet().getName(),
        widgets: [
            `The spreadsheet "${State.getSpreadsheet().getName()}" has been created in ${State.getFolder()
                ? `the folder "${State.getFolder().getName()}"`
                : 'your My Drive'
            } and populated with the data in "${State.getList().name
            }" from Blackbaud.`,
            Terse.CardService.newTextButton({
                text: 'Open Spreadsheet',
                functionName: OpenSpreadsheet,
            }),
        ],
    });
}

export function spreadsheetCreatedAction() {
    return Terse.CardService.replaceStack(spreadsheetCreatedCard());
}
global.action_sheets_spreadsheetCreated = spreadsheetCreatedAction;
export default 'action_sheets_spreadsheetCreated';