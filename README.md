The task is to create a button with three states: ”Off”, “Sort Asc”, “Sort Desc” in order to sort/unsort data. 

The mockup is ![three state button mockup](images/buttonMockup.png)

The hints are:
1) use webix.protoUI to inherit from UI button
2) use webix.html helpers to modify button css
3) define a different CSS class for each state and describe it in a stylesheet
4) make it possible to define states and the initial state in configuration
5) provide state ids and labels to separate logic and visual levels
6) use button onItemClick event to modify the state
7) the $init handler is the best place to attach built-in event handlers
8) when state is modified and reflected in button ui, call the state change event