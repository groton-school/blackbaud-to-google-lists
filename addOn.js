function launch(event) {
  State.reset()
  State.inferFolderFromLaunchEvent(event);
  if (State.sheet) {
    return cardSpreadsheetOption();
  } else {
    return cardLists();
  }
}
