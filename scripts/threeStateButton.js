const BUTTON_STYLE = [
    "button_positive_state",
    "button_negative_state",
    "button_warning_state"
]

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
        return value;
    },
    state_setter: (value) => {
        if (typeof value !== 'number' || value < 0 || value > 2) 
            throw new Error("State is defined incorrectly");
        return value;
    },
    $init(config) {
        this.$ready.push(() => this.setButtonNameAndColor(config));
        this.attachEvent("onItemClick", () => {
            this.changeState(config);
            this.callEvent("onStateChange", [this.config.state]);
        });
    },
    setState(config) {
        statesCount = Object.keys(config.states).length;
        this.config.state = (this.config.state + 1) % statesCount;
    },
    setButtonNameAndColor(config) {
        webix.html.addCss(this.getNode(), BUTTON_STYLE[this.config.state]);
        this.define("label", config.states[this.config.state]);
    },
    changeState(config) {
        webix.html.removeCss(this.getNode(), BUTTON_STYLE[this.config.state]);
        this.setState(config);
        this.setButtonNameAndColor(config);
        this.refresh();
    }
}, webix.ui.button);