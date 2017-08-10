import React from "react";
import dva from "dva";
import route from "./route.js";
import {createLogger} from "redux-logger";
import todos from "./models/todos.js";

const app = dva({
  onAction: createLogger()
});


app.model(todos);
app.router(route);

app.start("#root");