const BUTTON_STATE = [
    { id: 0, style: "button_positive_state" },
    { id: 1, style: "button_negative_state" },
    { id: 2, style: "button_warning_state" }
]

let button_state_index = 0;

webix.protoUI({
    name:"threeStateButton",
    $init(config) {
        this.$ready.push(() => {
            this.define("label", config.states[config.state]);
            webix.html.addCss(this.getNode(), BUTTON_STATE[button_state_index].style);
        });
        this.attachEvent("onItemClick", () => {
            webix.html.removeCss(this.getNode(), BUTTON_STATE[button_state_index].style);
            button_state_index = (button_state_index + 1) % BUTTON_STATE.length;
            webix.html.addCss(this.getNode(), BUTTON_STATE[button_state_index].style);

            config.state = BUTTON_STATE[button_state_index].id;
            this.define("label", config.states[config.state]);
            this.refresh();

            this.callEvent("onStateChange", [config.state]);
        });
    } 
}, webix.ui.button);

const threeStateButton = {
    view:"threeStateButton",
    states:{ 
        [BUTTON_STATE[0].id]: "Off", 
        [BUTTON_STATE[1].id]: "SortAsc", 
        [BUTTON_STATE[2].id]: "Sort Desc" 
    }, 
    state: BUTTON_STATE[0].id, 
    on:{
        onStateChange(state) {
            switch(state) {
                case BUTTON_STATE[1].id:
                    $$("filmList").sort("#title#", "asc");
                    break;
                case BUTTON_STATE[2].id:
                    $$("filmList").sort("#title#", "desc");
                    break;
                default:
                    $$("filmList").sort("#id#", "asc", "int");
            }
        }
    },
    width: 150,
    css: "webix_transparent normal_weight_font"
}

const filmHeader = {
    cols: [
        { 
            view: "label",
            label: "Sort list:",
            autowidth: true,
            height: 45,
            css: "normal_weight_font"
        },
        threeStateButton
    ],
    paddingX: 10,
    margin: 40
}

const filmList = {
    view:"list",
    id: "filmList",
    url: "data/films.js",
    template:"<b>#rank#. #title#</b> <div>Year: #year#, rank: #rank#</div>",
    select:true,
    type: { height: 65 }
}

webix.ui({
    rows: [ filmHeader, filmList ]
})