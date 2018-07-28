class Species {
    constructor(entity = {}) {
        this.name = entity.name || '';
        this.classification = entity.classification || '';
        this.designation = entity.designation || '';
        this.average_height = entity.average_height || '';
        this.skin_colors = entity.skin_colors || '';
        this.eye_colors = entity.eye_colors || '';
        this.hair_colors = entity.hair_colors || '';
        this.average_lifespan = entity.average_lifespan || '';
        this.gender = entity.gender || '';
        this.homeworld = entity.homeworld || '';
        this.language = entity.language || '';
        this.people = entity.people || [];
        this.films = entity.films || [];
        this.created = entity.created || '';
        this.edited = entity.edited || '';
        this.url = entity.url || '';
    }

    displayFields() {
        let fields = { ...this };
        delete fields.created;
        delete fields.edited;
        delete fields.url;
        if (!fields.people.length) delete fields.people;
        if (!fields.films.length) delete fields.films;
        return fields;
    }
}

export default Species;