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
    }
}

export { Track };