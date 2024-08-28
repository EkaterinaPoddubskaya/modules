const threeStateButton = {
    view:"threeStateButton",
    states:{ 
        0: "Off", 
        1: "SortAsc", 
        2: "Sort Desc"
    }, 
    state: 0, 
    on:{
        onStateChange(state) {
            const filmList = $$("filmList");
            switch(state) {
                case 1:
                    filmList.sort("#title#", "asc");
                    break;
                case 2:
                    filmList.sort("#title#", "desc");
                    break;
                default:
                    filmList.sort("#id#", "asc", "int");
            }
        }
    }
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