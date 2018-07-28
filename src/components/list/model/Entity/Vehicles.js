class Vehicles {
    constructor(entity = {}) {
        this.name = entity.name || '';
        this.model = entity.model || '';
        this.manufacturer = entity.manufacturer || '';
        this.cost_in_credits = entity.cost_in_credits || '';
        this.length = entity.length || '';
        this.max_atmosphering_speed = entity.max_atmosphering_speed || '';
        this.crew = entity.crew || '';
        this.passengers = entity.passengers || '';
        this.cargo_capacity = entity.cargo_capacity || '';
        this.consumables = entity.consumables || '';
        this.vehicle_class = entity.vehicle_class || '';
        this.pilots = entity.pilots || [];
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
        if (!fields.pilots.length) delete fields.pilots;
        if (!fields.films.length) delete fields.films;
        return fields;
    }
}

export default Vehicles;