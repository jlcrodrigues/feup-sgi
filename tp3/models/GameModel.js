import { Model } from "./Model.js";
import { Track } from "./game/Track.js";

class GameModel extends Model {
  constructor(settings) {
    super();

    this.track = new Track(settings.track ?? "monza");
  }
}

export { GameModel };
