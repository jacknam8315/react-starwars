class Planets {
    constructor(entity = {}){
       this.name = entity.name || '';
       this.rotation_period = entity.rotation_period || '';
       this.orbital_period = entity.orbital_period || '';
       this.diameter = entity.diameter || '';
       this.climate = entity.climate || '';
       this.gravity = entity.gravity || '';
       this.terrain = entity.terrain || '';
       this.surface_water = entity.surface_water || '';
       this.population = entity.population || '';
       this.residents = entity.residents || [];
       this.films = entity.films || [];
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
        if(!fields.residents.length) delete fields.residents;    
        return fields;
   }
}

export default Planets;