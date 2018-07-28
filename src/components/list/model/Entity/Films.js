class Films {
    constructor(entity = {}){
       this.title = entity.title || '';
       this.episode_id = entity.episode_id || '';
       this.opening_crawl = entity.opening_crawl || '';
       this.director = entity.director || '';
       this.producer = entity.producer || '';
       this.release_date = entity.release_date || '';
       this.characters = entity.characters || [];
       this.planets = entity.planets || [];
       this.starships = entity.starships || [];
       this.vehicles = entity.vehicles || [];
       this.species = entity.species || [];
       this.created = entity.created || '';
       this.edited = entity.edited || '';
       this.url = entity.url || '';
    }

    displayFields() {
        let fields = {...this};
        delete fields.created;
        delete fields.edited;
        delete fields.url;
        if(!fields.characters.length) delete fields.characters;
        if(!fields.planets.length) delete fields.planets;
        if(!fields.vehicles.length) delete fields.vehicles;
        if(!fields.starships.length) delete fields.starships;
        if(!fields.species.length) delete fields.species;        
        return fields;
   }
}

export default Films;