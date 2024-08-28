const BUTTON_STYLE = [
    "button_positive_state",
    "button_negative_state",
    "button_warning_state"
]

const changeState = (thisView, config) => {
    buttonNode = thisView.getNode();

    webix.html.removeCss(buttonNode, BUTTON_STYLE[config.state]);
    statesCount = Object.keys(config.states).length;
    config.state = (config.state + 1) % statesCount;
    webix.html.addCss(buttonNode, BUTTON_STYLE[config.state]);

    thisView.define("label", config.states[config.state]);
    thisView.refresh();
}

webix.protoUI({
    name:"threeStateButton",
    defaults: {
        state: 0,
        width: 150,
        css: "webix_transparent normal_weight_font"
    },
    states_setter: (value) => {
        let invalidMessage = "";
        if (typeof value !== 'object') {
            invalidMessage = "States must be an object"
        } else {
            const valueSize = Object.keys(value).length;
            for (let i = 0; i < valueSize; ++i) {
                if (typeof value[i] !== 'string' || !value[i]) {
                    invalidMessage = "State names are defined incorrectly"
                    break;
                }
            }
        }
        if (invalidMessage) throw new Error(invalidMessage);
        else return value;
    },
    state_setter: (value) => {
        if (typeof value === 'number' && value >= 0 && value < 3) return value;
        else throw new Error("State is not a number type");
    },
    $init(config) {
        this.$ready.push(() => {
            config.state = this.config.state;
            const state = config.state;
            this.define("label", config.states[state]);
            webix.html.addCss(this.getNode(), BUTTON_STYLE[state]);
        });
        this.attachEvent("onItemClick", () => {
            changeState(this, config);
            this.callEvent("onStateChange", [config.state]);
        });
        this.attachEvent("onDestruct", () => {
            this.detachEvent("onItemClick");
        });   
    } 
}, webix.ui.button);