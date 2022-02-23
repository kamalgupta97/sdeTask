function getItems(getItems2) {
  console.log("Get Items");
  getItems2();
}

function getItems2() {
  console.log("getItems2");
}

let arr = [1, 2, 3, 4, 5, 6];

arr = arr.map(addOne);

function addOne(item) {
  return item + 1;
}
console.log(arr);
