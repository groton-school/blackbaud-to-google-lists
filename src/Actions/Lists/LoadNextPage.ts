import { Terse } from '@battis/google-apps-script-helpers';
import Lists from '../../Lists';
import School, { ResponseFormat } from '../../SKY/School';
import State from '../../State';
import { insertDataAction } from './InsertData';

export function loadNextPageCard() {
    return CardService.newCardBuilder()
        .setHeader(Terse.CardService.newCardHeader(State.getList().name))
        .addSection(
            CardService.newCardSection()
                .addWidget(
                    Terse.CardService.newTextParagraph(
                        'Due to limitations by Blackbaud (a rate-limited API) and by Google (time-limited execution of scripts'
                    )
                )
                .addWidget(
                    Terse.CardService.newTextParagraph(
                        `${State.getData().length - 1} records have been loaded from "${State.getList().name
                        }" so far.`
                    )
                )
                .addWidget(
                    Terse.CardService.newTextButton(
                        `Load Page ${State.getPage() + 1}`,
                        global.action_lists_loadNextPage
                    )
                )
        )
        .build();
}

export function loadNextPageAction() {
    State.setPage(State.getPage() + 1);
    const data = (
        School.lists(
            State.getList().id,
            ResponseFormat.Array,
            State.getPage()
        ) as []
    ).slice(1); // trim off unneeded column labels
    State.appendData(data);
    if (data.length == Lists.BLACKBAUD_PAGE_SIZE) {
        return Terse.CardService.replaceStack(loadNextPageCard());
    } else {
        return insertDataAction();
    }
}
global.action_lists_loadNextPage = loadNextPageAction;
export default 'action_lists_loadNextPage';
