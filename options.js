$(function () {
  chrome.storage.sync.get("limit", (budget) => {
    $("#limit").val(budget.limit);
  });

  $("#saveLimit").click(function () {
    let limit = $("#limit").val();
    if (limit) {
      chrome.storage.sync.set({ limit: limit }, () => {
        close();
      });
    }
  });
  $("#resetTotal").click(function () {
    chrome.storage.sync.set({ total: 0 }, function () {
      let notifyObj = {
        type: "basic",
        iconUrl: "icon48.png",
        title: "Total Reset",
        message: "Your Total Has been Reset to zero",
      };
      chrome.notifications.create("limitNotif", notifyObj);
    });
    chrome.notifications.clear("limitNotif");
  });
});
