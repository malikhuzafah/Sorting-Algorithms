var bars = [];
var speed = 200;
var sorted = false;

function generateBars() {
  sorted = false;
  var range = $("#range").val();
  speed = 200 - range;
  $("#noofbars").html(range);
  $("#content").empty();
  for (var i = 0; i < range; i++) {
    var width = Math.floor(Math.random() * 500 + 100);
    $("#content").append(
      '<div class="bar " data-width="' +
        width +
        '" style="height:' +
        width +
        'px"></div>'
    );
  }
  bars = $(".bar");
}

$(function () {
  var height =
    document.body.offsetHeight - document.getElementById("navbar").offsetHeight;
  $("#content").css("height", height);
  $(".btn").on("click", function () {
    $(document).scrollTop($(document).height());
  });
  $("#range").on("input", generateBars);
  generateBars();
  $("#selectionBtn").click(async function () {
    if (sorted) {
      $("status-heading").html("Already sorted! Shuffle or change bars.");
      return;
    }
    disable("Sorting...");
    await selectionSort(bars, bars.length);
    sorted = true;
    enable("Sorted!");
    bars.css("background-color", "yellow");
    await sleep(1000);
    bars.css("background-color", "#c3073f");
    $("#content").empty();
    $("#content").append(bars);
  });
  $("#bubbleBtn").click(async function () {
    if (sorted) {
      $("#status-heading").html("Already sorted! Shuffle or change bars.");
      return;
    }
    disable("Sorting...");
    await bubbleSort(bars, bars.length);
    sorted = true;
    enable("Sorted!");
    bars.css("background-color", "yellow");
    await sleep(500);
    bars.css("background-color", "#c3073f");
    $("#content").empty();
    $("#content").append(bars);
  });
  $("#mergeBtn").click(async function () {
    if (sorted) {
      $("#status-heading").html("Already sorted! Shuffle or change bars.");
      return;
    }
    disable("Sorting...");
    await mergeSort(bars, 0, bars.length - 1);
    sorted = true;
    enable("Sorted!");
    bars.css("background-color", "yellow");
    await sleep(500);
    bars.css("background-color", "#c3073f");
    $("#content").empty();
    $("#content").append(bars);
  });
  $("#quickBtn").click(async function () {
    if (sorted) {
      $("#status-heading").html("Already sorted! Shuffle or change bars.");
      return;
    }
    disable("Sorting...");
    await quickSort(bars, 0, bars.length - 1);
    sorted = true;
    enable("Sorted!");
    bars.css("background-color", "yellow");
    await sleep(500);
    bars.css("background-color", "#c3073f");
    $("#content").empty();
    $("#content").append(bars);
  });
  $("#shuffleBtn").click(async function () {
    disable("Shuffling...");
    bars.css("background-color", "#1a1a1d");
    await shuffle(bars);
    sorted = false;
    enable("Shuffled!");
    $("#content").empty();
    $("#content").append(bars);
  });
});

async function shuffle(arr) {
  for (var i = 0; i < arr.length; i++) {
    var j = Math.floor(Math.random() * arr.length);
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    $("#content").empty();
    $("#content").append(arr);
    await sleep(speed);
  }
}

function disable(status) {
  $("#status-heading").html(status);
  $(".btn").prop("disabled", true);
  $("#range").prop("disabled", true);
}

function enable(status) {
  $("#status-heading").html(status);
  $(".btn").prop("disabled", false);
  $("#range").prop("disabled", false);
}

async function swap(arr, xp, yp) {
  arr[xp].style.setProperty("background-color", "#c3073f");
  arr[yp].style.setProperty("background-color", "#c3073f");
  var temp = arr[xp];
  arr[xp] = arr[yp];
  arr[yp] = temp;
  $("#content").empty();
  $("#content").append(arr);
  await sleep(speed);
  arr[xp].style.setProperty("background-color", "#1a1a1d");
  arr[yp].style.setProperty("background-color", "#1a1a1d");
}

async function selectionSort(arr, n) {
  var i, j, min_idx;
  for (i = 0; i < n - 1; i++) {
    min_idx = i;
    for (j = i + 1; j < n; j++) {
      if (arr[j].offsetHeight < arr[min_idx].offsetHeight) {
        min_idx = j;
      }
    }
    await swap(arr, min_idx, i);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(arr, n) {
  var i, j;
  for (i = 0; i < n - 1; i++) {
    for (j = 0; j < n - i - 1; j++) {
      if (arr[j].offsetHeight > arr[j + 1].offsetHeight) {
        await swap(arr, j, j + 1);
      }
    }
  }
}

async function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    if (arr[j].offsetHeight < pivot.offsetHeight) {
      i++;
      await swap(arr, i, j);
    }
  }
  await swap(arr, i + 1, high);
  return i + 1;
}

async function quickSort(arr, low, high) {
  if (low < high) {
    let pi = await partition(arr, low, high);
    await quickSort(arr, low, pi - 1);
    await quickSort(arr, pi + 1, high);
  }
}

async function merge(arr, l, m, r) {
  var n1 = m - l + 1;
  var n2 = r - m;

  var L = new Array(n1);
  var R = new Array(n2);

  for (var i = 0; i < n1; i++) {
    L[i] = arr[l + i];
  }
  for (var j = 0; j < n2; j++) {
    R[j] = arr[m + 1 + j];
  }

  var i = 0;

  var j = 0;

  var k = l;

  while (i < n1 && j < n2) {
    if (L[i].offsetHeight <= R[j].offsetHeight) {
      arr[k] = L[i];
      await sleep(speed);
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }

    k++;
  }

  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
  $("#content").empty();
  $("#content").append(arr);
  await sleep(speed);
}

async function mergeSort(arr, l, r) {
  if (l >= r) {
    return;
  }
  var m = l + parseInt((r - l) / 2);
  await mergeSort(arr, l, m);
  await mergeSort(arr, m + 1, r);
  await merge(arr, l, m, r);
}
