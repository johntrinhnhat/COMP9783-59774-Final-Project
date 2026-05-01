// Developer:
// Purpose:

import { v1, v4 } from "uuid";

function generateUUID(version) {
  // Make sure that the parameter is a number
  if (!Number.isFinite(version)) {
    return "";
  }

  // Return the correct version based on the value
  if (version === 1) {
    return v1();
  }

  if (version === 4) {
    return v4();
  }
}

// ES6 export syntax
export { generateUUID };
