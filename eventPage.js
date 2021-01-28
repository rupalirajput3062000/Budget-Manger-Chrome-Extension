let contextMenuItem = {
  id: "spendMoney",
  title: "SpendMoney",
  contexts: ["selection"],
};

chrome.contextMenus.create(contextMenuItem);

function isInt(value) {
  return (
    !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10))
  );
}

chrome.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId == "spendMoney" && clickData.selectionText) {
    if (isInt(clickData.selectionText)) {
      chrome.storage.sync.get(["total", "limits"], (budget) => {
        let newTotal = 0;
        if (budget.total) {
          newTotal += parseInt(budget.total);
        }

        newTotal += parseInt(clickData.selectionText);
        chrome.storage.sync.set({ total: newTotal }, () => {
          if (budget.limits >= newTotal) {
            var notifyObject = {
              type: "basic",
              iconUrl: "icon48.png",
              title: "Limit Reached",
              message: "Oh! seems like you've crossed the limit",
            };
            chrome.notifications.create("limitNotif", notifyObject);
          }
        });
        chrome.notifications.clear("limitNotif");
      });
    }
  }
});

// To show the badges use of chrome api

chrome.storage.onChanged.addListener((changes, storageName) => {
  chrome.browserAction.setBadgeText({
    text: changes.total.newValue.toString(),
  });
});
