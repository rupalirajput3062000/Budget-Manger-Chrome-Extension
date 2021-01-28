// It will catch the value from chrome storage
chrome.storage.sync.get(["total", "limit"], (budget) => {
  $("#total").text(budget.total);
  $("#limit").text(budget.limit);
});

$(function () {
  $("#spendAmount").click(function () {
    chrome.storage.sync.get(["total", "limit"], (budget) => {
      let newTotal = 0;
      if (budget.total) {
        newTotal += parseInt(budget.total);
      }
      let amount = $("#amount").val();
      if (amount) {
        newTotal += parseInt(amount);
      }
      chrome.storage.sync.set({ total: newTotal }, function () {
        if (amount && newTotal >= budget.limit) {
          var notifyObject = {
            type: "basic",
            iconUrl: "icon48.png",
            title: "Limit Reached",
            message: "Oh! seems like you've crossed the limit",
          };
          chrome.notifications.create("limitNotif", notifyObject);
        }
      });
      $("#total").text(newTotal);
      $("#amount").val("");
      chrome.notifications.clear("limitNotif");
    });
  });
});
