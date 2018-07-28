class People {
    constructor(entity = {}) {
        this.name = entity.name || '';
        this.height = entity.height || '';
        this.mass = entity.mass || '';
        this.hair_color = entity.hair_color || '';
        this.skin_color = entity.skin_color || '';
        this.eye_color = entity.eye_color || '';
        this.birth_year = entity.birth_year || '';
        this.gender = entity.gender || '';
        this.homeworld = entity.homeworld || '';
        this.films = entity.films || [];
        this.species = entity.species || [];
        this.vehicles = entity.vehicles || [];
        this.starships = entity.starships || [];
        this.created = entity.created || '';
        this.edited = entity.edited || '';
        this.url = entity.url || '';
    }

    displayFields() {
         let fields = {...this};
         delete fields.created;
         delete fields.edited;
         delete fields.url;
         if(!fields.films.length) delete fields.films;
         if(!fields.species.length) delete fields.species;
         if(!fields.vehicles.length) delete fields.vehicles;
         if(!fields.starships.length) delete fields.starships;
         return fields;
    }
}

export default People;
