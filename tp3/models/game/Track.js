class Track {
    constructor(name) {
        this.name = name;
        this.loadData();
    }

    loadData() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `./assets/tracks/${this.name}.json`, false);
        xhr.send();
        const data = JSON.parse(xhr.responseText);

        this.name = data.name;
        this.path = data.path;
        this.width = data.width;
        this.start = data.start;
        this.route = data.route;
        this.modifiers = data.modifiers;

        for (let i = 0; i < this.path.length; i++) {
            this.path[i][0] *= data.scale ?? 1;
            this.path[i][1] *= data.scale ?? 1;
            this.path[i][2] *= data.scale ?? 1;
        }

        this.route.values = []
        for (let i = 0; i < this.route.points.length; i++) {
            this.route.points[i][0] *= data.scale ?? 1;
            this.route.points[i][1] *= data.scale ?? 1;
            this.route.points[i][2] *= data.scale ?? 1;
            this.route.values.push(...this.route.points[i]);
        }
    }
}

export { Track };