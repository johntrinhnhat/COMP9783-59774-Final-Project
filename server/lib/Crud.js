// Developer:
// Purpose:

import { generateUUID } from "./UUIDUtilsES6.js";

// Create any object you wish
let items = [
  {
    title: "go to the gym",
    emoji: "",
    time: "4/30/2026, 8:35:26 PM",
    completed: false,
    id: "1160509d-6c7a-47f6-84eb-be6bf95b71ea",
  },
  {
    title: "replace the bulb",
    emoji: "",
    time: "4/30/2026, 8:38:54 PM",
    completed: false,
    id: "c4cf6821-594b-4482-89dd-c1ae842a9663",
  },
  {
    title: "catch up on emails",
    emoji: "",
    time: "4/30/2026, 8:41:08 PM",
    completed: true,
    id: "5ccb1092-1c9c-4dc4-92d2-854473c0d22a",
  },
];

function createItem(item) {
  // Generate a unique id for the list
  item.id = generateUUID(4);
  items.push(item);

  return item;
}

function readItems(id = "") {
  // Default behavior is to return the whole list
  if (id === "") {
    return items;
  }

  // If there is an id, try to match it with the list
  const item = items.filter((item) => {
    return item.id === id;
  });

  // This is to not allow the following:
  // 0 items
  // More that one item
  if (item.length != 1) {
    return {};
  }

  // Only return 1 item
  return item[0];
}

function updateItem(id, itemParam) {
  // Look for a match using find
  let itemToUpdate = items.find((item) => {
    return item.id === id;
  });

  // Update if it exists and create if it does not
  if (itemToUpdate?.id) {
    const keys = Object.keys(itemParam);

    // This is to ensure that we only update when the values have changed
    keys.forEach((key) => {
      if (itemToUpdate[key] != itemParam[key]) {
        itemToUpdate[key] = itemParam[key];
      }
    });

    return itemToUpdate;
  } else {
    // This means that the item does not exist so we will create it as per PUT definition
    return createItem(itemParam);
  }
}

function deleteItem(id) {
  // Overwrite array to simulate deletion
  // No need to check for the id, if it does not exist nothing happens
  items = items.filter((item) => {
    return item.id !== id;
  });

  return {};
}

// ES6 export syntax
export { createItem, readItems, updateItem, deleteItem };
