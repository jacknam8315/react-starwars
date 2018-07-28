import Films from './Films';
import People from './People';
import Planets from './Planets';
import Starships from './Starships';
import Species from './Species';
import Vehicles from './Vehicles';
import { EntityType } from '../../constant';

export const Entity = entity => {
    const { url = null } = entity;
    const type = url && url.substring(url.indexOf('/api/') + 5, ).replace(/\/?\d+\/?/, '');
    let EntityFactory = null;
    switch (type) {
        case EntityType.Films: EntityFactory = Films; break;
        case EntityType.People: EntityFactory = People; break;
        case EntityType.Planets: EntityFactory = Planets; break;
        case EntityType.Species: EntityFactory = Species; break;
        case EntityType.Starships: EntityFactory = Starships; break;
        case EntityType.Vehicles: EntityFactory = Vehicles; break;
    }
    return EntityFactory ? new EntityFactory(entity) : entity;
}

export const isEntity = entity => {
    let entityType = false;
    [Films, People, Planets, Starships, Species, Vehicles].forEach(constructor => {
        if(entity instanceof constructor) entityType = true;
    })
    return entityType;
}
 